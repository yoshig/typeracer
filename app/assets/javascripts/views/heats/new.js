window.TypeRacer.Views.NewHeat = Backbone.View.extend({
	template: JST["heats/new"],

	render: function() {
		var content = this.template({ heat: this.model })
		this.$el.html(content)
		return this;
	}
})