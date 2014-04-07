#A clone of TypeRacer (www.typeracer.com), a fun multiplayer typing game.

##Setup
* rake db:reset
* rake get\_racer\_texts # this will seed the database with actual typeracer passages with their author and source, scraped from another website using Nokogiri.
* rake db:seed (Only do this if you want to see made up high scores from random people).

##Program basics:
* Most of the site was built with Backbone.js. The database is Postgres, where I stored high scores and all of the race passages. The backend was built with RoR.
* A race has the attributes of text and source
* A heat belongs to a race and has the attribute of race time
* A racer_stat belongs to a heat and belongs to a user
* When a heat is completed, the racer stats will be saved to the database, so that high scores (such as overall WPM and last 10 games WPM) will be saved.

##Some of the more interesting parts of my program:

* I used Pusher to allow players to get realtime feedback from other players. This involved setting up a channel in the Backbone view when starting a new game, which other players could subscribe to. The tricky part was, there are many different types of games, and the channels that people subscribe to will change. For example, once a game starts, you don't want other users to be able to join that channel. You also don't want someone just joining a game to have a different count down timer than people who are about to start the game. To cure this problem, I sent users in the game lobby (the original channel all users join when waiting for a game) a channel named after the current time. Then, new users could look at the time stamp, and set their countdown clocks accordingly. If no users were in the game_lobby, the first person in the chat would create a new channel, which would be sent to all new users who enter the game lobby. Once the game begins, users unsubscribe to the game lobby so no new users will be let into the current game, and all users in teh game game will recieve updates on other users' movements based on the game channel (the time stamp created channel).

* I didn't want to save any races that were not completed by any users. Therefore, I didn't actually create a new heat via the backbone model, I instead made a custom ajax request to get all of the data from the race (such as the text and who wrote/said/sang that particular passage). The most important part of the data that was sent through is the heat start time. When the race is completed, the controller will search for any heat that began at that particular time. If no heat is found, the heat will be created, and the racer\_stat will be creatd along with it. Otherwise, the racer\_stat will be saved to the pre-existing heat.

* Because I seeded the database with so much data, some of the SQL queries for high scores are a little more involved than I originally expected them to be. However, it also makes the querying time is cut down exponentially. I am still hoping to improve the efficiency of these queries. :)
