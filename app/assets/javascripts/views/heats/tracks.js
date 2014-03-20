window.TypeRacer.Views.Track = Backbone.View.extend({
	template: JST["heats/tracks"],

	initialize: function() {
		this.listenTo(this.model, "")
	},

	render: function() {
		var content = this.template({ racers: this.collection })
		this.$el.html(content)
		return this;
	},
})