window.TypeRacer.Views.Track = Backbone.View.extend({
	template: JST["heats/track"],

	tagName: "table",

	initialize: function() {
		var that = this
		// this.listenTo(this.model, "change", this.moveCar)
		var pusher = new Pusher('3ee21fe7259f11d2384c');
    var channel = pusher.subscribe('test_channel');

    channel.bind('updateBoard', function(data) {
			return that.moveCar(data)
		});
		channel.bind('addCar', function(data) {
			return that.addCar(data)
		});
		this.enterGame();
	},

	// render: function() {
	// 	var content = this.template({ racer: this.model })
	// 	this.$el.html(content);
	// 			// move when doing css
	// 			//
	// 	return this;
	// },

	addCar: function(data) {
		debugger
		var new_racer = {
			racer_name: data.racer_name,
			racer_id: data.racer_id,
			progress: 0
		};
		var content = this.template({
			racer: new_racer
		})
		(this.model.cid == data.racer_id)
			?  this.$el.prepend(content)
			: this.$el.append(content);
	},

	moveCar: function(data) {
		var $car = $("[data-racer-id='"+ data.racer_id + "']");
		$car.css("position", "absolute");
		var movement = data.progress;
		$car.css("left", movement * 100 + "px");
	},

	enterGame: function() {
		var that = this;
		var progress = this.model.get("progress");
		$.ajax({
			url: "/heats/add_car",
			type: "POST",
			data: {
				racer_id: this.model.cid,
				racer_name: this.model.get("user_name"),
				progress: 0
			},
			success:
				function(data) {
					that.addCar(data);
				}
		})
	}
})
;
