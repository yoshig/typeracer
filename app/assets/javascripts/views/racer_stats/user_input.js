window.TypeRacer.Views.BoardNew = Backbone.View.extend({
	template: JST["racer_stats/user_input"],

	className: "race-board .col-md-12",

	initialize: function(options) {
		var that = this;
		this.gameChannel = options.channel;
		// Wait until all players are in the room before starting the timer and allowing typing in box
		this.gameSetup();

		this.parent = options.parent;
		this.counter = 0;
		this.totalKeys = 0;
		// timer is based on typing 30 wpm, if a word is average 5 letters, using deciseconds
		this.words = this.model.collection.heat.get("text").split(" ");
		this.totalTime = Math.floor(this.words.join().length * (2 / 5) * 10);
	},

	render: function() {
		var content = this.template({ words: this.words })
		this.$el.html(content)
		return this;
	},

	events: {
		"keyup.val .user-input": "handleInput"
	},

	lettersTyped: function() {
		return this.words.slice(0, this.counter).join("").length
	},

	calculateWPM: function() {
		var timeTaken = this.totalTime - this.timer;
		var minutes = (timeTaken) / 600;
		var letters = this.lettersTyped();
		return ((letters / 5) / minutes);
	},

	changeWordColor: function() {
		var wordsBeg = this.words.slice(0, this.counter).join(" ");
		var greenWord = ' <span id="current-word">' + this.words[this.counter] + "</span> "
		var wordsEnd = this.words.slice(this.counter + 1, this.words.length).join(" ")
		var newContent = wordsBeg + greenWord + wordsEnd;
		$("div#game-text").html(newContent);
	},

	endGame: function(time) {
		clearInterval(this.gameCountDown);
		var attrs = {
			wpm: Math.round(this.calculateWPM() * 100) / 100,
			wpm_percentile: Math.round((this.lettersTyped() / this.totalKeys) * 10000) / 100,
			heat_time: this.model.collection.heat.get("start_time"),
			race_id: this.model.collection.heat.get("race_id"),
			time: this.showTime(this.totalTime - this.timer),
			slowpoke: !time
		};

		time
		  ? this.model.save(attrs, { silent: true })
		  : this.model.set(attrs, { silent: true })

		this.parent.showScores(attrs);
	},

	gameSetup: function() {
		var that = this;
		var countStart = 10;
		var startCountDown = setInterval(function() {
			countStart--;
			$("div#count-down").html(countStart)
			if (countStart === 5) {
				TypeRacer.pusher.unsubscribe("game_lobby")
			} else if (countStart === 0) {
				clearInterval(startCountDown);
				that.setBoard();
				that.runTimer();
				$("div#count-down").remove();
			}
		}, 1000);
	},

	handleInput: function(event) {
		var $input = $(event.target);
		var key = String.fromCharCode(event.keyCode);
		if (/[a-zA-Z0-9-_]/.test(key)) {
			this.totalKeys++
		}
		var userWord = $input.val();
		var currentWord = this.words[this.counter] + " ";
		if (currentWord === $input.val()) {
			this.handleWordEnd($input);
		} else if ( currentWord.match("^" + $input.val()) ) {
			$input.css("background", "white").css("color", "black")
		} else {
			$input.css("background", "red").css("color", "white")
		}
	},

	handleWordEnd: function(input) {
		this.counter++;
		this.model.progress = this.counter / this.words.length;
		this.model.set("progress", this.model.progress)
		input.val("");
		this.updateBoards();
		if (this.counter == this.words.length) {
			this.endGame(this.timer);
		} else {
			this.changeWordColor();
		}
	},

	inputField: function() { return this.$el.find(".user-input") },

	runTimer: function() {
		var that = this;
		this.timer = this.totalTime;
		this.gameCountDown = setInterval(function() {
			that.timer--
			$("div#game-timer").html(that.showTime(that.timer))

			if (that.timer <= 0) {
				clearInterval(that.gameCountDown);
				$("div#game-timer").html("00:0")
				that.endGame(NaN);
			}
		}, 100);
	},

	setBoard: function() {
 		$("div#count-down").remove();
  	this.inputField().removeAttr("placeholder disabled").focus();
 	},

	showTime: function(time) {
		var mins = Math.floor(time / 600);
		var secs = Math.floor((time - (mins * 600)) / 10)
		secs = secs < 10 ? "0" + secs : secs
		var decs = Math.ceil(time - (mins * 600) - (secs * 10)) + "0"
		return mins < 1 ? secs + ":" + decs : mins + ":" + secs
	},

	updateBoards: function() {
		var progress = this.model.get("progress");
		var wpm = this.model.get("wpm");
		$.ajax({
			url: "/heats/update_board",
			type: "POST",
			data: {
				channel: this.gameChannel,
				racer_id: this.model.get("user_id"),
				progress: progress,
				wpm: Math.round(this.calculateWPM())
			}
		})
	}
});