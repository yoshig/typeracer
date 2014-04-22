window.TypeRacer.Views.Track = Backbone.View.extend({
	template: JST["heats/track"],
	modalTemplate: JST["heats/share_modal"],
	className: "raceTracks .col-md-6",

	GIFS: [
    "https://s3-us-west-1.amazonaws.com/typedasher/crash.gif",
	  "https://s3-us-west-1.amazonaws.com/typedasher/kirby.gif",
		"https://s3-us-west-1.amazonaws.com/typedasher/megaman.gif",
		"https://s3-us-west-1.amazonaws.com/typedasher/samus.gif",
		"https://s3-us-west-1.amazonaws.com/typedasher/sonic.gif",
		"https://s3-us-west-1.amazonaws.com/typedasher/yoshi.gif"
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
		this.gameType = options.gameType;
		this.addImage();
		this.racer_id = $("#current_user").data("id");

		this.model.set("progress", 0);
		this.setupGameTypes(options);
	},

	addCar: function(data) {
		if (data.channel) { this.setupGameChannel(data) }
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
		if (!data.channel) { this.checkTotalPlayers(); }
	},

	addImage: function() {
		this.raceImg = this.model.img
		  ||  this.GIFS[Math.floor(Math.random() * this.GIFS.length)];
	},

	checkTotalPlayers: function() {
		var currentTotalRacers = this.$el.find(".racer").length;
		if (currentTotalRacers >= 2 || this.gameType == "practice") {
			if (this.gameChannel) {
				var gameChannel = this.gameChannel.name
			} else {
				var gameChannel = (Date.now() + 15000).toString();
			}
			console.log("starting")
			$.ajax({
				url: "/heats/start_game",
				type: "POST",
				data: {
					channel: gameChannel,
					timer: parseInt(gameChannel) - Date.now(),
					sendTo: this.gameType == "normal" ? "game_lobby" : this.gameType,
					text: this.model.collection.heat.get("text"),
					race_id: this.model.collection.heat.get("race_id")
				}
			})
		}
	},

	endTrack: function($car) {
		var place = this.PLACES[this.$el.find(".finished").length]
		$car.find(".racer_car")
		    .html("<span class='finished btn btn-success'>" + place + "!</span>")
	},

	findCar: function(id) {
		return $("[data-racer-id='"+ id + "']")
	},

	moveCar: function(data) {
		var $car = this.findCar(data.racer_id);
		var trackSize = $car.parent().width()
		var movement = data.progress * .9;
		$car.animate({ "margin-left": movement * trackSize + "px" }, 100);

		var wpm = data.wpm || 0;
		$car.parent().parent().find(".race_wpm").html(wpm + " WPM")
		if (data.progress == 1) { this.endTrack($car) }
	},

	sendCarData: function(returnTo) {
		var that = this;
		var racer_name = this.model.get("user_name") || "Guest"
		var racer = {
					racer_id: this.racer_id,
					racer_name: racer_name,
					sendTo: this.gameType == "normal" ? "game_lobby" : this.gameType,
					return_to: returnTo,
					racer_img: this.raceImg,
					progress: this.model.get("progress")
			  }
    if (this.gameChannel) {
    	racer["channel"] = this.gameChannel.name;
    }
		$.ajax({
			url: "/heats/add_car",
			type: "POST",
			data: racer,
			success: function() {
				console.log("IN SUCCESS")
				that.addCar(racer);
			}
		})
	},

	setupGameTypes: function(options) {
		if (options.gameType == "practice") {
			this.sendCarData(false);
			var carId = $("#current_user").data("id")
			this.setupGameChannel({
				channel: carId.toString().replace(/[^a-zA-Z0-9]+/g, "")
			})
		} else {
			var that = this;
			var channel = options.channel;
			channel.bind('initiateCountDown', function(data) {
				return that.setupGameChannel(data)
			});
			channel.bind('addCar', function(data) {
				return that.addCar(data)
			});
			this.sendCarData(false);
			if (this.gameType !== "normal") {this.showModal(); }
		}
	},

	setupGameChannel: function(data) {
		var that = this;
		if (!this.gameChannel) {
			this.gameChannel = TypeRacer.pusher.subscribe(data.channel);
	    this.gameChannel.bind('updateBoard', function(data) {
				if (data && data.racer_id) { return that.moveCar(data) }
			});
		}
		TypeRacer.pusher.unsubscribe("game_lobby")
	},

	showModal: function() {
		var content = this.modalTemplate({ path: this.gameType })
		$('body').append(content);
		$("#share-link").modal("show");
	},
});