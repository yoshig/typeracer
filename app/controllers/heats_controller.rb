class HeatsController < ApplicationController

  def new
    race = Race.all.sample
    numRacers = params[:num_racers] || 1
    # Normally, use race.passage for the text
    render json: { num_racers: numRacers, race_id: race.id, text: "This is a test" }
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