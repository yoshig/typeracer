class RacerStatsController < ApplicationController
  def index
    @all_time_leaders = RacerStat.order('wpm DESC').limit(10)
    @recent_leaders = RacerStat.where("created_at > ?", 1.day.ago).order('wpm DESC').limit(10)
  end

  def show
  end
end
