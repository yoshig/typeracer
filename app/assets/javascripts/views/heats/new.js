window.TypeRacer.Views.NewHeat = Backbone.CompositeView.extend({
	template: JST["heats/new"],

	scoresTemplate: JST["heats/scores"],

	className: "race-board col-md-12",

	initialize: function(options) {
		this.type = options.gameType;
		var that = this;

		this.words = this.model.get("text").split(" ");

		this.track = this.model.racerStats().add(
			new TypeRacer.Models.RacerStat({
						user_id: $("#current_user").data("id"),
						user_name: $("#current_user").data("name")
			})
		);
		this.setupDifferentGames(options.gameType);
	},

	render: function() {
		var content = this.template()
		this.$el.html(content)
		this.renderSubviews();
		return this;
	},

	events: {
		"click .start-new-game": "startNewGame",
	},

	setupDifferentGames: function(type) {
		if (type == "practice") {
			var carId = $("#current_user").data("id")
			this.gameChannel = carId.toString().replace(/[^a-zA-Z0-9]+/g, "")
			this.channel = TypeRacer.pusher.subscribe(this.gameChannel);
			this.addBoard(4000);
			this.addTrackView("practice");
		} else {
			var subscription = type == "normal" ? "game_lobby" : type
			var that = this;
			this.channel = TypeRacer.pusher.subscribe(subscription);
	    	this.channel.bind('initiateCountDown', function(data) {
				return that.initiateCountDown(data)
			});
			this.addTrackView(type);
		}
	},

	addBoard: function(timer) {
		this.boardView = new TypeRacer.Views.BoardNew({
			model: this.track,
			parent: this,
			channel: this.gameChannel,
			timer: timer
		});
		this.addSubview("#game-board", this.boardView);
		this.boardView.render();
	},

	addTrackView: function(gameType) {
		this.raceTrack = new TypeRacer.Views.Track({
			model: this.track,
			channel: this.channel,
			gameType: gameType
		});
		this.addSubview("#race-track", this.raceTrack);
	},

	initiateCountDown: function(data) {
		console.log(data.timer)
		var that = this;
		if (!this.gameChannel) {
			this.gameChannel = data.channel;
			this.model.set({
				text: data.text,
				race_id: data.race_id
			})
			this.addBoard(data.timer);
		}
	},

	showScores: function(model) {
		this.boardView.remove()
		var that = this;
		var race = new TypeRacer.Models.Race({
			id: model.race_id
		})

		race.fetch({
			success: function() {
				var highScoresView = new TypeRacer.Views.HeatHighScores({
					race: race,
					model: model
				})
				that.addSubview("#score-board", highScoresView);
				highScoresView.showAllTimeHighs();
			}
		})
	},

	startNewGame: function() {
		if (this.type == "normal" || this.type == "practice") {
			Backbone.history.navigate("#heats/new_" + this.type, { trigger: true } )
		} else {
			Backbone.history.navigate("#heats/new_friend", { trigger: true } )
		}
	},
})

