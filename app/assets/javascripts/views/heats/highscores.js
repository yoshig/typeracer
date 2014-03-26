window.TypeRacer.Views.HeatHighScores = Backbone.CompositeView.extend({
	template: JST["heats/highscores"],
	modalTemplate: JST["users/modal"],

	className: "alltime-highscores col-md-12",

	initialize: function(options) {
		this.race = options.race;
		this.racerStats = this.race.get("racer_stats");
	},

	events: {
		"click .race-all-time-scores": "showAllTimeHighs",
		"click .race-personal-scores": "showPersonalHighs",
		"click .top-user": "modalUser"
	},

	modalUser: function(target) {
		var that = this;
		var racer_id = $(event.target).parent().data("racer");
		var user = new TypeRacer.Models.User({ id: racer_id });
		user.fetch({
			success: function() {
				var content = that.modalTemplate({ user: user });
				that.$el.find(".user-modal").html(content);
				$("#user-modal").modal('show');
			}
		});
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
			return stat.wpm_avg
		}).reverse().slice(0,10);
	}
});