class RacerStatsController < ApplicationController
  def create
    if params[:user_id].is_a?(String)
      session_stats;
    else
      heat = create_or_find_heat
      stat = heat.racer_stats.build(racerstat_params)
      heat.save
    end

    render json: stat
  end

  def index
    stats = RacerStat.all
    # @all_time_leaders = RacerStat.order('wpm DESC').limit(10)
    # @recent_leaders = RacerStat.where("created_at > ?", 1.day.ago)
    #                            .order('wpm DESC').limit(10)
    render "index"
  end

  private

  def racerstat_params
    params.require(:racer_stat).permit(:user_id,
                                        :wpm,
                                        :wpm_percentile)
  end

  def create_or_find_heat
    @heat = Heat.find_by(created_at: params[:racer_stat][:heat_time]) ||
    Heat.create(race_id: params[:race_id], created_at: params[:heat_time])
  end

  def session_stats
    num_races = session[:races][:total] += 1
    wpm = session[:races][:wpm].to_i
    session[:races][:wpm] =
      ((num_races * wpm) + params[:wpm].to_i)/ num_races
  end
end