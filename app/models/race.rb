# == Schema Information
#
# Table name: races
#
#  id         :integer          not null, primary key
#  passage    :text
#  created_at :datetime
#  updated_at :datetime
#

class Race < ActiveRecord::Base
  has_many :heats
  has_many :racer_stats, through: :heats

  def all_time_highs
    self.racer_stats.order("wpm")
  end

  def personal_highs(user_id)
    self.racer_stats.where(user_id: user_id).order("wpm")
  end

  def personal_last_10(user_id)
    self.racer_stats.where(user_id: user_id).order("created_at DESC")
  end
end

# RacerStat.select("user_id as id, sum(wpm)/ count(wpm) as wpm")
#          .group(:user_id)
#          .order("wpm DESC")
#          .limit(10)
#
#
# self.racer_stats.select("user_id as id, sum(wpm)/ count(wpm) as wpm")
#                 .group(:user_id)
#                 .order("wpm DESC")
#                 .limit(10)