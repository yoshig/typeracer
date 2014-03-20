window.TypeRacer.Models.Heat = Backbone.Model.extend({
	racerStats: function() {
		if (!this._racerStats) {
			this._racerStats = new TypeRacer.Collections.RacerStats([], {
				heat: this
			})
		}

		return this._racerStats;
	}
})