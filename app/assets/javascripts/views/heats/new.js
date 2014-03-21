window.TypeRacer.Views.NewHeat = Backbone.CompositeView.extend({
	template: JST["heats/new"],

	initialize: function() {
		this.words = this.model.get("text").split(" ");
		this.addBoard();
		this.listenTo(this.model.racerStats(),
		              "add",
									this.addTrackView(this.model.racerStats().last()))
	},

	className: "race-board",

	render: function() {
		var content = this.template()
		this.$el.html(content)
		this.renderSubviews();
		return this;
	},

	addBoard: function() {
		var newRacerStat = this.model.racerStats().add(
			new TypeRacer.Models.RacerStat({
						user_id: $("#current_user").data("id"),
						user_name: $("#current_user").data("name")
					})
		)
		var newBoardView = new TypeRacer.Views.BoardNew({
			model: newRacerStat
		});

		this.addSubview("#game-board", newBoardView);
		newBoardView.render();
	},

	addTrackView: function(track) {
		this.raceTrack = new TypeRacer.Views.Track({
			model: track
		});
		this.addSubview("#race-track", this.raceTrack);
	}
})