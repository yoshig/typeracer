class HeatsController < ApplicationController

  def new
    # This will never actually be saved to the database
    # Saves of heats are dependent on the racer_stats controller
    race = Race.all.sample
    numRacers = params[:num_racers] || 1
    # Normally, use race.passage for the text
    render json: { start_time: Time.now.to_s, num_racers: numRacers, race_id: race.id, text: "This is a test" }
  end

  def update_board
    Pusher["test_channel"].trigger('updateBoard', {
      cid: params[:user_id],
      progress: params[:progress]
    })
    render json: ""
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