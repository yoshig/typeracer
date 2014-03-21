window.TypeRacer.Views.UsersIndex = Backbone.View.extend({
	template: JST["users/index"],

	render: function(content) {
		var content = this.template({ list: content })
		this.$el.html(content)
		debugger
		return this;
	},

	events: {
		"click .user-all-time-wpm": "showSpeedRecords",
		"click .user-recent-wpm": "showRecentRecords",
		"click .user-total-races": "showMostRaces"
	},

	showSpeedRecords: function() {
		var content = _.sortBy(this.racer_stats, function(stat) {
			return stat.wpm;
		}).reverse().slice(0,10);
		this.render(content);
		return this;
	},

	showRecentRecords: function() {

	},

	showMostRaces: function() {

	},

	sortScores: function(scores) {
		return _.sortBy(scores, function(stat) {
					return stat.wpm
				}).reverse().slice(0,10);
	}
});

