json.top_racers do
  json.array! RacerStat.top_racers do |racer|
		json.user_id racer.user_id
		json.wpm_avg racer.wpm_avg
	end
end

json.recent_leaders do
  json.array! RacerStat.recent_leaders do |racer|
		json.user_id racer.user_id
		json.wpm_avg racer.wpm_avg
	end
end

json.most_races do
  json.array! RacerStat.most_races do |racer|
		json.user_id racer.user_id
		json.races racer.races
	end
end