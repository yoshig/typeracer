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

  def password=(plain_text)
    @password = plain_text
    self.password_digest = BCrypt::Password.create(plain_text)
  end

  def is_password?(plain_text)
    BCrypt::Password.new(self.password_digest).is_password?(plain_text)
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user.try(:is_password?, password) ? user : nil
  end

  def wpm_avg
    return 0 if self.racer_stats.length == 0
    (self.racer_stats.inject(0) do |sum, stat|
      sum + stat.wpm
    end / racer_stats.length).round(0)
  end

  def recent_wpm_avg
    all_races = self.racer_stats
    recents = all_races.select { |stat| stat.created_at > 1.day.ago }
    return 0 if recents.length == 0
    recents.inject(0) { |sum, stat| sum + stat.wpm } / recents.length
  end

  def best_race
    # self.racer_stats.
  end
end
