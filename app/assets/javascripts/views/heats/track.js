window.TypeRacer.Views.Track = Backbone.View.extend({
	template: JST["heats/track"],

	tagName: "table",

	initialize: function() {
		this.listenTo(this.model, "change", this.moveCar)
	},

	moveCar: function() {
		var $playerPiece = this.$el.find(".racer")
		$playerPiece.css("position", "absolute");
		var movement = this.model.get("progress") * 100
		$playerPiece.css("left", movement + "px");
	},

	render: function() {
		var content = this.template({ racer: this.model })
		this.$el.html(content);
				// move when doing css
				//
		return this;
	}
})