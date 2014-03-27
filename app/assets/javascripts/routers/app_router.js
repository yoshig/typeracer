window.TypeRacer.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},

	routes: {
		"heats/new": "normalGame",
		"heats/gameover": "heatDone",
		"heats/practice": "practice",
		"heats/:id": "customGame",
		"users/:id": "userShow",
		"highscores": "highscores"
	},

	heatDone: function() {
		// Cannot navigate to page where you are already.
		// Used to navigate away and back to a new game.
		Backbone.history.navigate("#heats/new", { trigger: true } )
	},

	practice: function() {
		this._heatNew("practice")
	},

	customGame: function(id) {
		this._heatNew(id);
	},

	normalGame: function() {
		this._heatNew("normal")
	},

	highscores: function() {
		this.$rootEl.html("");
		this._bestScoresView();
	},

	userShow: function(id) {
		var that = this;
		var user = new TypeRacer.Models.User({ id: id });
		user.fetch({
			success: function() {
				var userView = new TypeRacer.Views.UserShow({
					model: user
				});
				that._swapView(userView);
			}
		})
	},

	_bestScoresView: function() {
		var that = this;
		var everyPageScores = new TypeRacer.Views.UsersIndex ({
			model: TypeRacer.RacerStats
		});
		that.$rootEl.append(everyPageScores.showSpeedRecords().$el);
	},

	_heatNew: function(gameType) {
		var that = this;
		var newHeat;
		$.ajax({
			url: "/heats/new",
			type: "GET",
			success: function(data) {
				newHeat = new TypeRacer.Models.Heat(data);
				var newHeatView = new TypeRacer.Views.NewHeat({
					model: newHeat,
					gameType: gameType
				})
				that._swapView(newHeatView);
			}
		})
	},

	_swapView: function(view) {
		this.currentView && this.currentView.remove();
		this.currentView = view;
		this.$rootEl.html(view.render().$el);
		this._bestScoresView();
	}
})