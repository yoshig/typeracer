class StaticPagesController < ApplicationController
  def home
    render "home"
  end

  def about
    render "about"
  end
end