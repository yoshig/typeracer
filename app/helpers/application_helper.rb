module ApplicationHelper
  SKILL_LEVEL = {
    0  => "Beginner",
    25  => "Intermediate",
    31  => "Average",
    42  => "Pro",
    55  => "Typemaster",
    80 => "Megaracer"
  }

  def session_skill
    user_level = "Beginner"
    SKILL_LEVEL.each do |k, v|
      user_level = v if session_wpm > k
    end
    user_level
  end

  def session_wpm
    session[:races] ||= {}
    session[:races][:wpm] ||= 0
  end

  def session_races
    session[:races] ||= {}
    session[:races][:total] ||= 0
  end
end
