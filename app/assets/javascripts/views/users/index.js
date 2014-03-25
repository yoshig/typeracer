window.TypeRacer.Views.UsersIndex = Backbone.View.extend({
	template: JST["users/index"],
	className: "race-board col-md-12",

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
		"click .user-total-races": "showMostRaces",
		"click .hof-user": "modalUser"
	},

	modalUser: function(target) {
		var user = TypeRacer.Users.where({
			username: $(event.target).html()
		})[0];
		var content = this.modalTemplate({ user: user })
		this.$el.find(".user-modal").html(content);
		$("#user-modal").modal('show')
	},

	showMostRaces: function() {
		return this.sortScores("races");
	},

	showRecentRecords: function() {
    return this.sortScores("recent_wpm_avg");
	},

	showSpeedRecords: function() {
		return this.sortScores("wpm_avg");
	},

	sortScores: function(stat) {
		var content = this.collection.sortBy(function(user) {
			return user.get(stat)
		}).reverse()
		this.render(content, stat)
		return this;
	}
});

