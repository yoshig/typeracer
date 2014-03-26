window.TypeRacer.Models.RacerStat = Backbone.Model.extend({
	url: "/racer_stats",

	initialize: function() {
		this.progress = 0;
	}
})