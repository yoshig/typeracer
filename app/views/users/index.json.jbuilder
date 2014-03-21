json.array! @users do |user|
  stats = user.racer_stats

	wpm_avg = stats.inject(0) do |sum, stat|
	            sum + stat.wpm
	          end / stats.length

	last_ten = stats.sort do |x, y|
	             x.created_at <=> y.created_at
						 end[0, 10]

	last_ten_wpm = last_ten.inject(0) do |sum, stat|
	                 sum + stat.wpm
								 end / 10

  json.username user.username
	json.id user.id
	json.wpm_avg wpm_avg.round(0)
	json.races stats.length
	json.last_ten_wpm last_ten_wpm.round(0)
end