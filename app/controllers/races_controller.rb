class RacesController < ApplicationController
  def show
    @race = Race.find(params[:id])
    debugger
    render "show"
  end
end
