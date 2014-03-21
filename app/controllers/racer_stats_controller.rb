class RacerStatsController < ApplicationController
  def create
    heat = create_or_find_heat
    stat = heat.racer_stats.build(racerstat_params)
    if heat.save
      render json: stat
    else
      puts "SOMETHING WENT WRONG"
      render json: stat.errors.full_messages
    end
  end

  def index
    @all_time_leaders = RacerStat.order('wpm DESC').limit(10)
    @recent_leaders = RacerStat.where("created_at > ?", 1.day.ago).order('wpm DESC').limit(10)
  end

  private

  def racerstat_params
    params.require(:racer_stat).permit(:user_id,
                                        :wpm,
                                        :wpm_percentile)
  end

  def create_or_find_heat
    @heat = Heat.find_by(created_at: params[:racer_stat][:heat_time]) ||
    Heat.create(race_id: params[:race_id],
                created_at: params[:heat_time])
  end
end