window.TypeRacer.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},

	routes: {
		"": "index",
		//"home": "home",
		"heats/normal": "normalGame",
		"heats/new_normal": "newNormal",
		"heats/new_practice": "newPractice",
		"heats/new_friend": "newFriend",
		"heats/practice": "practice",
		"heats/:id": "customGame",
		"users/:id": "userShow",
		"highscores": "highscores"
	},

	index: function() {
		var indexView = new TypeRacer.Views.Splash();
		this._swapView(indexView).remove();
	},

	newNormal: function() {
		// Cannot navigate to page where you are already.
		// Used to navigate away and back to a new game.
		Backbone.history.navigate("#heats/normal", { trigger: true } )
	},

	newFriend: function() {
		Backbone.history.navigate("#heats/" + Math.random().toString(36).slice(2), { trigger: true } )
	},

	newPractice: function() {
		Backbone.history.navigate("#heats/practice", { trigger: true } )
	},

	practice: function() {
		this._heatNew("practice")
	},

	customGame: function(id) {
		TypeRacer.pusher.disconnect()
		TypeRacer.pusher.connection.bind('disconnected', function() {
			TypeRacer.pusher = new Pusher('3ee21fe7259f11d2384c');
			this._heatNew(id);
		})
	},

	normalGame: function() {
		var that = this
		TypeRacer.pusher = new Pusher('3ee21fe7259f11d2384c');
		TypeRacer.pusher.connection.bind('connected', function() {
			that._heatNew("normal")
		})
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
		return everyPageScores;
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
		return this._bestScoresView();
	}
})