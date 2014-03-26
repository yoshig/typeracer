# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#Users
# User.create(username: "yoshi", password: "123456")


50.times do
  user_name = Faker::Internet.user_name
  unless User.find_by(username: user_name)
    User.create(username: user_name,
                password: Faker::Internet.password)
  end
end

Race.all.each do |race|
  2.times do
    new_heat = Heat.create(race_id: race.id)
    (3 + Random.rand(2)).times do
      RacerStat.create(heat_id: new_heat.id,
                       user_id: User.all.sample.id,
                       wpm: 30 + Random.rand(80),
                       wpm_percentile: 60 + Random.rand(20))

    end
  end
end