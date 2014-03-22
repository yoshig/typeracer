window.TypeRacer.Views.HeatHighScores = Backbone.CompositeView.extend({
	template: JST["heats/highscores"],

	initialize: function(options) {
		this.racerStats = options.racerStats;
	},

	events: {
		"click .race-all-time-scores": "showAllTimeHighs",
		"click .race-personal-scores": "showPersonalHighs"
	},

	render: function(list) {
		var content = this.template({ list: list })
		this.$el.html(content)
		return this;
	},

	showAllTimeHighs: function() {
		var content = this.sortScores(this.racerStats)
		this.render(content);
		return this;
	},

	showPersonalHighs: function() {
		userId = $("#current_user").data("id")
		var userScores = _.filter(this.racerStats, function(stat) {
			return stat.userId == userId
		});
		debugger

		var content = this.sortScores(userScores)
		this.render(content);
		return this;
	},

	sortScores: function(scores) {
		return _.sortBy(scores, function(stat) {
					return stat.wpm
				}).reverse().slice(0,10);
	}
});
