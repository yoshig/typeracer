class HeatsController < ApplicationController

  def new
    @race = Race.all.sample
    @heat = Heat.new(race_id: @race.id)
    @racers = params[:num_racers]
  end

  def create
  end

  def index
    @heats = Heat.all
    render json: @heats
  end

  def show
    @heat = Heat.find(params[:id])
  end

  private

  def heat_params
    params.require(:heat).permit(:race_id)
  end
end