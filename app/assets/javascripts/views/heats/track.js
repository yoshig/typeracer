window.TypeRacer.Views.Track = Backbone.View.extend({
	template: JST["heats/track"],

	initialize: function() {
		this.listenTo(this.model, "all", this.render)
	},

	render: function() {
		var content = this.template({ racer: this.model })
		this.$el.html(content)
		return this;
	},
})