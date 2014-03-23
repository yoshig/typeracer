window.TypeRacer.Views.UserShow = Backbone.View.extend({
	template: JST["users/show"],

	render: function() {
		var content = this.template({ user: this.model });
		this.$el.html(content);
		return this;
	}
})