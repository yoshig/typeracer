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
  belongs_to :heat
  belongs_to :user
  has_one :race, through: :heat
end
