json.array! @users do |user|
  json.username user.username
	json.id user.id
	json.wpm_avg user.wpm_avg
	json.races user.racer_stats.length
	json.recent_wpm_avg user.recent_wpm_avg
end