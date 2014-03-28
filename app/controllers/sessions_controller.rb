class SessionsController < ApplicationController
  before_action :require_signed_out!, :only => [:new, :create]
  before_action :require_signed_in!, :only => [:destroy]

  def new
    @user = User.new
  end

  def create
    if @user = User.find_by_credentials(params[:user][:username],
                                        params[:user][:password])
      login!
      redirect_to "/#heats/normal"
    else
      @user = User.new(username: params[:user][:username])
      flash.now[:errors] = ["Invalid credentials"]
      render "new"
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end
end
