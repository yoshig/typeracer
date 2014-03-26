window.TypeRacer.Views.UsersIndex = Backbone.View.extend({
	template: JST["users/index"],
	modalTemplate: JST["users/modal"],
	className: "race-board col-md-12",

	render: function(category) {
		var stat = category == "most_races" ? "races" : "wpm_avg"
		var content = this.template({
			list: this.model.get(category).slice(0,10),
			category: stat
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

	showMostRaces: function() {
		return this.render("most_races");
	},

	showRecentRecords: function() {
    return this.render("recent_leaders");
	},

	showSpeedRecords: function() {
		return this.render("top_racers");
	}
});

