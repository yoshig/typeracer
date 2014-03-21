window.TypeRacer.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(options) {
		this.$rootEl = options.$rootEl;
		this.heats = options.heats
	},

	routes: {
		"heats/new": "heatNew"
	},

	heatNew: function() {
		var that = this;
		var newHeat;
		$.ajax({
			url: "/heats/new",
			type: "GET",
			success: function(data) {
				newHeat = new TypeRacer.Models.Heat(data);
				var newHeatView = new TypeRacer.Views.NewHeat({
					model: newHeat
				})
				that._swapView(newHeatView);
			}
		})
	},

	_bestScoresView: function() {
		var userScores = new TypeRacer.Collections.Users()
		userScores.fetch()

		var everyPageScores = new TypeRacer.Views.UsersIndex ({
			collection: userScores
		});
		return everyPageScores;
	},

	_swapView: function(view) {
		this.currentView && this.currentView.remove();
		this.currentView = view;
		this.$rootEl.html(view.render().$el);
		debugger
		this.$rootEl.append(this._bestScoresView().showRecentRecords().$el)
	}
})