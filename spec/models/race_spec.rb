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

require 'spec_helper'

describe Race do
  before do
    @race = Race.new(passage: "This is a test.", source: "from Yoshi, a test by Yoshi")
  end

  subject { @race }
  it { should respond_to(:passage) }
  it { should respond_to(:source) }
end
