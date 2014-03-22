window.TypeRacer.Views.NewHeat = Backbone.CompositeView.extend({
	template: JST["heats/new"],

	scoresTemplate: JST["heats/scores"],

	className: "race-board",

	initialize: function() {
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
		"click .start-new-game": "startNewGame"
	},

	addBoard: function() {
		var newRacerStat = this.model.racerStats().add(
			new TypeRacer.Models.RacerStat({
						user_id: $("#current_user").data("id"),
						user_name: $("#current_user").data("name")
					})
		)
		var newBoardView = new TypeRacer.Views.BoardNew({
			model: newRacerStat,
			parent: this
		});
		this.addSubview("#game-board", newBoardView);
		newBoardView.render();
	},

	addTrackView: function(track) {
		this.raceTrack = new TypeRacer.Views.Track({
			model: track
		});
		this.addSubview("#race-track", this.raceTrack);
	},

	showScores: function(model, race_id) {
		var that = this;
		var race = new TypeRacer.Models.Race({ id: race_id })

		race.fetch({
			success: function() {
				var highScoresView = new TypeRacer.Views.HeatHighScores({
					racerStats: race.get("racerStats"),
					model: race
				})
				that.$el.append(highScoresView.showAllTimeHighs().$el)
			}
		})
	},

	startNewGame: function() {
		console.log("startNew")
		Backbone.history.navigate("#heats/gameover", { trigger: true } )
	}
})










;
