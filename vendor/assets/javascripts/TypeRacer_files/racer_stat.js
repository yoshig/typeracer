window.TypeRacer.Models.RacerStat = Backbone.Model.extend({
	urlRoot: "/racer_stats",

	initialize: function() {
		this.progress = 0;
	}
})
;
