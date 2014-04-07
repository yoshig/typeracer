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
  before do
    @stat = RacerStat.new(heat_id: 1,
                          user_id: 1,
                          wpm: 234.0,
                          wpm_percentile: 99.0)
  end

  subject { @stat }
  it { should respond_to(:heat_id) }
  it { should respond_to(:user_id) }
  it { should respond_to(:wpm) }
  it { should respond_to(:wpm_percentile) }

  describe "testing validations" do
    describe "heat_id nil" do
      before { @stat.heat_id = nil }
      it { should_not be_valid }
    end

    describe "user_id nil" do
      before { @stat.user_id = nil }
      it { should_not be_valid }
    end

    describe "wpm nil" do
      before { @stat.wpm = nil }
      it { should_not be_valid }
    end

    describe "wpm below 0" do
      before { @stat.wpm = -1 }
      it { should_not be_valid }
    end

    describe "wpm_percentile nil" do
      before { @stat.wpm_percentile = nil }
      it { should_not be_valid }
    end

    describe "wpm_percentile above 100" do
      before { @stat.wpm_percentile = 101 }
      it { should_not be_valid }
    end
  end
end
