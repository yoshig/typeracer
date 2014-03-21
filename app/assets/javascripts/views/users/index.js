window.TypeRacer.Views.UsersIndex = Backbone.View.extend({
	template: JST["users/index"],
	allTimeTemplate: JST["users/all_time"],
	recentLeaderTemplate: JST["users/recent_leaders"],
	mostRacesTemplate: JST["users/most_races"],

	render: function(list, category) {
		var content = this.template({
			list: list,
			category: category
		})
		this.$el.html(content);
		return this;
	},

	showList: function(content) {
		this.$el.find(".all-pages-show-scores")
		        .html(content);
		return this;
	},

	events: {
		"click .user-all-time-wpm": "showSpeedRecords",
		"click .user-recent-wpm": "showRecentRecords",
		"click .user-total-races": "showMostRaces"
	},

	showSpeedRecords: function() {
		return this.sortScores("wpm_avg");
	},

	showRecentRecords: function() {
    return this.sortScores("recent_wpm_avg");
	},

	showMostRaces: function() {
		return this.sortScores("races");
	},

	sortScores: function(stat) {
		var content = this.collection.sortBy(function(user) {
			return user.get(stat)
		}).reverse()
		this.render(content, stat)
		return this;
	}
});

