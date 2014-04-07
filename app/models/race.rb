# == Schema Information
#
# Table name: races
#
#  id         :integer          not null, primary key
#  passage    :text
#  created_at :datetime
#  updated_at :datetime
#  source     :string(255)      not null
#

class Race < ActiveRecord::Base
  has_many :heats
  has_many :racer_stats, through: :heats

  def get_racer_stats
    self.racer_stats.order("wpm DESC")
                    .includes(:user)
  end
end
