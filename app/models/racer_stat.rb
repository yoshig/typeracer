class RacerStat < ActiveRecord::Base
  belongs_to :heat
  belongs_to :user
end
