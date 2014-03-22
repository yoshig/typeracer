window.TypeRacer.Collections.RacerStats = Backbone.Collection.extend({
	model: TypeRacer.Models.RacerStat,

	url: "heats/racerstats",

	initialize: function(models, options) {
		this.heat = options.heat;
	}
})
;
