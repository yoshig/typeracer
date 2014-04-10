# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#

require 'spec_helper'

describe User do
  before do
    @user = User.new(username: "testuser", password: "123456")
  end
  subject { @user }

  it { should respond_to(:username) }
  it { should respond_to(:password_digest) }
  it { should respond_to(:password) }
  it { should respond_to(:session_token) }

  it { should be_valid }

  describe "when name is absent" do
    before { @user.username = " " }
    it { should_not be_valid }
  end

  describe "when password is absent" do
    before { @user.password = " "}
    it { should_not be_valid }
  end

  describe "session token" do
     before { @user.save }
     its(:session_token) { should_not be_blank }
  end

  describe "association" do
      it { should respond_to(:racer_stats) }
  end
end
