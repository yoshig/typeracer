class RacesController < ApplicationController
  def show
    @race = Race.find(params[:id])
    render "show"
  end
end