class HeatsController < ApplicationController
  def add_car
    Pusher["game_lobby"].trigger('addCar', car_params)
    head :ok
  end

  def index
    @heats = Heat.all
    render json: @heats
  end

  def new
    # This will never actually be saved to the database
    # Saves of heats are dependent on the racer_stats controller
    race = Race.all.sample
    # Normally, use race.passage for the text
    render json: { start_time: Time.now.to_s,
                   race_id: race.id,
                   text: race.passage }
  end

  def show
    @heat = Heat.find(params[:id])
  end

  def start_game
    Pusher["game_lobby"].trigger('initiateCountDown', {
      channel: params[:channel]
    })
    head :ok
  end

  def update_board
    Pusher[params[:channel]].trigger('updateBoard', car_params)
    head :ok
  end

  private
  def heat_params
    params.require(:heat).permit(:race_id)
  end

  def car_params
    params.permit(:racer_id,
                  :racer_name,
                  :return_to,
                  :progress,
                  :racer_img,
                  :wpm,
                  :channel)
  end
end