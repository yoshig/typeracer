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

require 'spec_helper'

describe RacerStat do
  pending "add some examples to (or delete) #{__FILE__}"
end
