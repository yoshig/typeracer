# == Schema Information
#
# Table name: racer_stats
#
#  id             :integer          not null, primary key
#  heat_id        :integer
#  user_id        :integer
#  wpm            :float
#  wpm_percentile :float
#  created_at     :datetime
#  updated_at     :datetime
#

class RacerStat < ActiveRecord::Base
  validates :heat_id, :user_id, :wpm, :wpm_percentile, presence: true
  validates_numericality_of :wpm, :wpm_percentile, greater_than_or_equal_to: 0
  validates_numericality_of :wpm_percentile, less_than_or_equal_to: 100

  belongs_to :heat
  belongs_to :user
  has_one :race, through: :heat


  def self.recent_leaders
    RacerStat.select("user_id AS user_id, sum(wpm)/ count(wpm) AS wpm_avg")
             .where("created_at > ?", 1.day.ago)
             .group(:user_id)
             .order("sum(wpm)/ count(wpm) DESC")
             .includes(:user)
  end

  def self.top_racers
    RacerStat.select("user_id AS user_id, (sum(wpm)/ count(wpm)) AS wpm_avg" )
             .group(:user_id)
             .order("sum(racer_stats.wpm)/ count(racer_stats.wpm) DESC")
             .includes(:user)
  end

  def self.most_races
    RacerStat.select("user_id AS user_id, count(user_id) AS most_races")
             .group(:user_id)
             .order("count(user_id) DESC")
             .includes(:user)
  end
end
