window.TypeRacer.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(options) {
		this.$rootEl = options.$rootEl;
		this.heats = options.heats
	},

	routes: {
		"highscores": "highScoresView",
		"heats/new": "heatNew",
		"heats/gameover": "heatDone"
	},

	heatDone: function() {
		// Cannot navigate to page where you are already.
		// Used to navigate away and back to a new game.
		Backbone.history.navigate("#heats/new", { trigger: true } )
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

	highScoresView: function() {
		debugger
		this.currentView && this.currentView.remove();
		this.currentView
		this._bestScoresView();
	},

	_bestScoresView: function() {
		var that = this;
		var userScores = new TypeRacer.Collections.Users()
		userScores.fetch({
			success: function() {
				var everyPageScores = new TypeRacer.Views.UsersIndex ({
					collection: userScores
				});
				that.$rootEl.append(everyPageScores.showSpeedRecords().$el)
			}
		});
	},

	_swapView: function(view) {
		this.currentView && this.currentView.remove();
		this.currentView = view;
		this.$rootEl.html(view.render().$el);
		this._bestScoresView();
	}
});
