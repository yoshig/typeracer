window.TypeRacer.Views.UsersIndex = Backbone.View.extend({
	template: JST["users/index"],
	modalTemplate: JST["users/modal"],
	className: "race-board col-md-12",

	render: function(category) {
		debugger
		var content = this.template({
			list: this.model.get(category).slice(0,10),
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
		var user = TypeRacer.RacerStats.where({
			username: $(event.target).parent().data("racer")
		})[0];
		var content = this.modalTemplate({ user: user })
		this.$el.find(".user-modal").html(content);
		$("#user-modal").modal('show')
	},

	showMostRaces: function() {
		return this.render("most_races");
	},

	showRecentRecords: function() {
    return this.render("recent_wpm_avg");
	},

	showSpeedRecords: function() {
		return this.render("wpm_avg");
	}
});

