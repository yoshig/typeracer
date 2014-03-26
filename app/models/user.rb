# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  attr_reader :password

  has_many :racer_stats

  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true}
  validates :password, presence: true, on: :create

  before_validation :ensure_session_token

  SKILL_LEVEL = {
    0  => "Beginner",
    25  => "Intermediate",
    31  => "Average",
    42  => "Pro",
    55  => "Typemaster",
    80 => "Megaracer"
  }

  def best_race
    self.no_races? || self.racer_stats.max_by(&:wpm).wpm
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def is_password?(plain_text)
    BCrypt::Password.new(self.password_digest).is_password?(plain_text)
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

  def last_ten
    self.racer_stats.sort_by(&:created_at).reverse[0,10]
  end

  def last_ten_wpm_avg
    return 0 if last_ten.length == 0
    self.last_ten.inject(0) do |sum, stat|
      sum + stat.wpm
    end / self.last_ten.length
  end

  def password=(plain_text)
    @password = plain_text
    self.password_digest = BCrypt::Password.create(plain_text)
  end

  def recent_races
  end

  def recent_wpm_avg
    recents = self.racer_stats.select do |stat|
                stat.created_at > 1.day.ago
              end
    return 0 if recents.length == 0

    recents.inject(0) do |sum, stat|
      sum + stat.wpm
    end / recents.length
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  def skill_level
    user_level = "Beginner"
    SKILL_LEVEL.each do |k, v|
      user_level = v if self.last_ten_wpm_avg > k
    end
    user_level
  end

  def start_date
    self.created_at.to_date
  end

  def total_races
    self.racer_stats.length
  end

  def wpm_avg
    self.no_races? ||
    (self.racer_stats.inject(0) do |sum, stat|
      sum + stat.wpm
    end / racer_stats.length).round(0)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user.try(:is_password?, password) ? user : nil
  end

  def no_races?
    self.racer_stats.length == 0 ? 0 : false
  end
end



