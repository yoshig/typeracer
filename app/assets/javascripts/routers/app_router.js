window.TypeRacer.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(options) {
		this.$rootEl = options.$rootEl;
		this.heats = options.heats
	},

	routes: {
		"heats/new": "heatNew",
		"heats/gameover": "heatDone",
		"users/:id": "userShow"
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

	userShow: function(id) {
		var userView = new TypeRacer.Views.UserShow({
			model: TypeRacer.Users.get(id)
		});
		this._swapView(userView);
	},

	_bestScoresView: function() {
		var that = this;
		var everyPageScores = new TypeRacer.Views.UsersIndex ({
			collection: TypeRacer.Users
		});
		that.$rootEl.append(everyPageScores.showSpeedRecords().$el);
	},

	_swapView: function(view) {
		this.currentView && this.currentView.remove();
		this.currentView = view;
		this.$rootEl.html(view.render().$el);
		this._bestScoresView();
	}
})