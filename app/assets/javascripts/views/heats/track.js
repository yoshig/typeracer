window.TypeRacer.Views.Track = Backbone.View.extend({
	template: JST["heats/track"],
	className: "raceTracks .col-md-6",

	GIFS: [
    "crash.gif",
	  "megaman.gif",
		"samus.gif",
		"sonic.gif",
		"yoshi.gif",
		"kirby.gif"
	],

	PLACES: [
	"First",
	"Second",
	"Third",
	"Fourth",
	"Fifth",
	"Sixth",
	"Seventh",
	"Eighth"
	],

	initialize: function(options) {
		this.addImage();
		var channel = options.channel;
		var that = this;
		this.racer_id = $("#current_user").data("id");

		channel.bind('initiateCountDown', function(data) {
			return that.setupGameChannel(data)
		});
		channel.bind('addCar', function(data) {
			return that.addCar(data)
		});
		this.model.set("progress", 0);
		this.sendCarData(false);
	},

	addCar: function(data) {
		var content = this.template({
			racer: data
		});
		if (this.findCar(data.racer_id).length == 0) {
			this.sendCarData(data.racer_id);
			(this.racer_id == data.racer_id)
				?  this.$el.prepend(content)
				: this.$el.append(content);
		}
		this.moveCar(data);
		this.checkTotalPlayers();
	},

	addImage: function() {
		this.raceImg = this.model.img
		  ||  this.GIFS[Math.floor(Math.random() * this.GIFS.length)];
	},

	checkTotalPlayers: function() {
		var currentTotalRacers = this.$el.find(".racer").length;
		if (currentTotalRacers >= 2) {
			var gameChannel = this.gameChannel || Date.now().toString();
			$.ajax({
				url: "/heats/start_game",
				type: "POST",
				data: {
					channel: gameChannel
				}
			})
		}
	},

	endTrack: function($car) {
		var place = this.PLACES[this.$el.find(".finished").length]
		$car.find(".racer_car")
		    .html("<span class='finished'>" + place + "!</span>")
	},

	findCar: function(id) {
		return $("[data-racer-id='"+ id + "']")
	},

	moveCar: function(data) {
		var $car = this.findCar(data.racer_id);
		var trackSize = this.$el.width()
		var movement = data.progress * .9;
		$car.animate({ "margin-left": movement * trackSize + "px" }, 100);

		var wpm = data.wpm || 0;
		$car.next().html(wpm + " WPM")
		if (data.progress == 1) { this.endTrack($car) }
	},

	sendCarData: function(returnTo) {
		var that = this;
		var racer_name = this.model.get("user_name") || "Guest"
		var racer = {
					racer_id: this.racer_id,
					racer_name: racer_name,
					return_to: returnTo,
					racer_img: this.raceImg,
					progress: this.model.get("progress")
			  }
		$.ajax({
			url: "/heats/add_car",
			type: "POST",
			data: racer,
			success: function() {
				that.addCar(racer);
			}
		})
	},

	setupGameChannel: function(data) {
		var that = this;
		if (!this.gameChannel) {
			this.gameChannel = TypeRacer.pusher.subscribe(data.channel);
	    this.gameChannel.bind('updateBoard', function(data) {
				if (data && data.racer_id) { return that.moveCar(data) }
			});
		}
	}
})