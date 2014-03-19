# == Schema Information
#
# Table name: heats
#
#  id         :integer          not null, primary key
#  race_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

class Heat < ActiveRecord::Base
  belongs_to :race
  has_many :racer_stats
end
