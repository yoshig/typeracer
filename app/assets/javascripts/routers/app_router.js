window.TypeRacer.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(options) {
		this.$rootEl = options.$rootEl;
		this.heats = options.heats
	},

	routes: {

	},

	heatNew: function() {
		var newHeatView = new TypeRacer.Views.NewHeat({
			model: new TypeRacer.Models.Heat()
		})
		this._swapView(newHeatView)
	},

	_swapView: function(view) {
		this.currentView && this.currentView.remove();
		this.currentView = view;
		$rootEl.append(view.render().$el);
	}
})