window.TypeRacer.Views.HeatHighScores = Backbone.CompositeView.extend({
	template: JST["heats/highscores"],

	className: "alltime-highscores col-md-12",

	initialize: function(options) {
		this.race = options.race;
		this.racerStats = this.race.get("racerStats");
	},

	events: {
		"click .race-all-time-scores": "showAllTimeHighs",
		"click .race-personal-scores": "showPersonalHighs",
		"click .top-user": "modalUser"
	},

	test: function() {
		debugger
		$("[data-target='#Robot2']").modal('show')
	},

	render: function(list) {
		var content = this.template({
			list: list,
			heat_stat: this.model
		})
		this.$el.html(content)
		return this;
	},

	modalUser: function(target) {
		debugger
		$("#Robot2").modal('show')
	}

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