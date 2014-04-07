# == Schema Information
#
# Table name: heats
#
#  id         :integer          not null, primary key
#  race_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

require 'spec_helper'

describe Heat do
  before do 
    @heat = Heat.new(race_id: 1)
  end

  subject { @heat }

  it { should be_valid }
  it { should respond_to(:race) }
  it { should respond_to(:racer_stats) }
end
