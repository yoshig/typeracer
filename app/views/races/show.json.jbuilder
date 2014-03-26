json.content @race.passage
json.source @race.source

json.racer_stats @race.get_racer_stats do |racer|
	json.user_id racer.user_id
	json.wpm_avg racer.wpm
	json.username racer.user.username
end