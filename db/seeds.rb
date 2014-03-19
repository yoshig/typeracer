# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#Users
User.create(username: "Yoshi", password: "123456")
User.create(username: "Robot1", password: "123456")
User.create(username: "Robot2", password: "123456")

Race.create(passage: "IPhone bespoke tofu aute, wayfarers ex voluptate minim master cleanse anim fingerstache direct trade ad sed id. Banksy Shoreditch aesthetic, Cosby sweater Pinterest quinoa Blue Bottle deserunt ethical vegan distillery. Yr commodo post-ironic, synth pariatur cred farm-to-table nisi sustainable. Cliche dolore sustainable est nulla 3 wolf moon. Biodiesel Wes Anderson est, odio enim flannel qui incididunt master cleanse deserunt scenester nihil consectetur slow-carb jean shorts. Kale chips street art fashion axe et, Williamsburg do leggings accusamus Thundercats cornhole consectetur laboris artisan Shoreditch elit. Semiotics in sint street art, chia food truck normcore elit vinyl gastropub ugh McSweeney's.")

Heat.create(race_id: 1)
Heat.create(race_id: 2)

RacerStat.create(heat_id: 1, user_id: 1, wpm: 60.0, wpm_percentile: 98.0)
RacerStat.create(heat_id: 1, user_id: 2, wpm: 70.0, wpm_percentile: 91.5)
RacerStat.create(heat_id: 1, user_id: 3, wpm: 80.0, wpm_percentile: 94.6)

RacerStat.create(heat_id: 1, user_id: 1, wpm: 70.0, wpm_percentile: 100.0)