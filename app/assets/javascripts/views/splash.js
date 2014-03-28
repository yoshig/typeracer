window.TypeRacer.Views.Splash = Backbone.View.extend({
	template: JST["static/splash"],

	render: function() {
		$('.navbar').addClass("hidden")
		$('body').addClass("splash-background")
		this.animateIn();
		this.$el.html(this.template);
		return this;
	},

	remove: function(){
		$('body').removeClass("splash-background");
		$('.navbar').removeClass("hidden");
		Backbone.View.prototype.remove.apply(this);
	},

	animateIn: function() {
		console.log("waht")
		setTimeout(function() {
			setTimeout(function() {
				$(".splash-option").fadeIn()
			}, 1000)
			$(".splash-heading").fadeIn()
		}, 1000)
	}
})