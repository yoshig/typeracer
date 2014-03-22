window.TypeRacer.Views.Track = Backbone.View.extend({
	template: JST["heats/track"],

	tagName: "table",

	initialize: function() {
		var that = this
		// this.listenTo(this.model, "change", this.moveCar)
		var pusher = new Pusher('3ee21fe7259f11d2384c');
    var channel = pusher.subscribe('test_channel');
    channel.bind('updateBoard', function(data) {
			return that.moveCar(data).bind(that)
		});
		// channel.bind('addCar', this.addCar().bind(this));
	},

	addCar: function(data) {

	},

	moveCar: function(data) {
		debugger
		$("[data-racer-id='"+ data.racer_id + "']")
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