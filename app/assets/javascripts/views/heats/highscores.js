window.TypeRacer.Views.HeatHighScores = Backbone.CompositeView.extend({
	template: JST["heats/highscores"],
	modalTemplate: JST["users/modal"],

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

	modalUser: function(target) {
		var user = TypeRacer.Users.where({
			username: $(event.target).parent().data("racer")
		})[0];
		var content = this.modalTemplate({ user: user })
		this.$el.find(".user-modal").html(content);
		$("#user-modal").modal('show')
	},

	render: function(list) {
		var content = this.template({
			list: list,
			heat_stat: this.model,
			race: this.race
		})
		this.$el.html(content)
		return this;
	},

	showAllTimeHighs: function() {
		debugger
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