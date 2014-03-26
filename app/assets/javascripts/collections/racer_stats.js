window.TypeRacer.Collections.RacerStats = Backbone.Collection.extend({
	model: TypeRacer.Models.RacerStat,

	url: "/racer_stats",

	initialize: function(models, options) {
		this.heat = options.heat;
	}
})