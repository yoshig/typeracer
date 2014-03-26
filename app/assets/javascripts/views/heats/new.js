window.TypeRacer.Views.NewHeat = Backbone.CompositeView.extend({
	template: JST["heats/new"],

	scoresTemplate: JST["heats/scores"],

	className: "race-board col-md-12",

	initialize: function() {
		var that = this
		this.channel = TypeRacer.pusher.subscribe('game_lobby');
    this.channel.bind('initiateCountDown', function(data) {
			return that.initiateCountDown(data)
		});

		this.words = this.model.get("text").split(" ");

		this.track = this.model.racerStats().add(
			new TypeRacer.Models.RacerStat({
						user_id: $("#current_user").data("id"),
						user_name: $("#current_user").data("name")
			})
		);
		this.addTrackView(this.track);
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

	addBoard: function() {
		this.boardView = new TypeRacer.Views.BoardNew({
			model: this.track,
			parent: this,
			channel: this.gameChannel
		});
		this.addSubview("#game-board", this.boardView);
		this.boardView.render();
	},

	addTrackView: function(track) {
		this.raceTrack = new TypeRacer.Views.Track({
			model: this.track,
			channel: this.channel
		});
		this.addSubview("#race-track", this.raceTrack);
	},

	initiateCountDown: function(data) {
		var that = this;
		if (!this.gameChannel) {
			this.gameChannel = data.channel;
			this.model.set({
				text: data.text,
				race_id: data.race_id
			})
			this.addBoard();
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
		console.log("startNew")
		Backbone.history.navigate("#heats/gameover", { trigger: true } )
	}
})

