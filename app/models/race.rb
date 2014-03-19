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
end
