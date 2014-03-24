module ApplicationHelper
  SKILL_LEVEL = {
    0  => "Beginner",
    25  => "Intermediate",
    31  => "Average",
    42  => "Pro",
    55  => "Typemaster",
    80 => "Megaracer"
  }

  def session_wpm
    session[:races].inject(0) { |sum, x| sum += x["wpm"].to_i }
  end

  def session_races
    session[:races].length
  end

  def session_skill
    user_level = "Beginner"
    SKILL_LEVEL.each do |k, v|
      user_level = v if session_wpm > k
    end
    user_level
  end
end
