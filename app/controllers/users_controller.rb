class UsersController < ApplicationController
  before_action :require_signed_out!, :only => [:create, :new]

  def create
    @user = User.new(user_params)
    if @user.save
      login!
      redirect_to "/#heats/normal"
    else
      flash.now[:errors] = @user.errors.full_messages
      render "new"
    end
  end

  def edit

  end

  def index
    @users = User.all
    render json: @users
  end

  def new
    @user = User.new
    render "new"
  end

  def show
    @user = User.find(params[:id])
    render "show"
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end