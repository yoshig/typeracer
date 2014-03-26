window.TypeRacer.Views.NewHeat = Backbone.CompositeView.extend({
	template: JST["heats/new"],

	scoresTemplate: JST["heats/scores"],

	className: "race-board col-md-12",

	initialize: function() {
		this.channel = TypeRacer.pusher.subscribe('game_lobby');

		this.words = this.model.get("text").split(" ");
		this.addBoard();
		this.listenTo(this.model.racerStats(),
		              "add",
									this.addTrackView(this.model.racerStats().last()))
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
		var newRacerStat = this.model.racerStats().add(
			new TypeRacer.Models.RacerStat({
						user_id: $("#current_user").data("id"),
						user_name: $("#current_user").data("name")
					})
		)
		this.boardView = new TypeRacer.Views.BoardNew({
			model: newRacerStat,
			parent: this,
			channel: this.channel
		});
		this.addSubview("#game-board", this.boardView);
		this.boardView.render();
	},

	addTrackView: function(track) {
		this.raceTrack = new TypeRacer.Views.Track({
			model: track,
			channel: this.channel
		});
		this.addSubview("#race-track", this.raceTrack);
	},

	showScores: function(model) {
		this.boardView.remove()
		var that = this;
		var race = new TypeRacer.Models.Race({
			id: model.race_id
		})

		race.fetch({
			success: function() {
				debugger
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

