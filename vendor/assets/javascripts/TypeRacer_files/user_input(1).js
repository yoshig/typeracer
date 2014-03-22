window.TypeRacer.Views.BoardNew = Backbone.View.extend({
	template: JST["racer_stats/user_input"],

	className: "race-board",

	initialize: function(options) {
		this.parent = options.parent;
		this.counter = 0;
		this.totalKeys = 0;
		// timer is based on typing 30 wpm, if a word is average 5 letters, using deciseconds
		this.words = this.model.collection.heat.get("text").split(" ");
		this.totalTime = Math.floor(this.words.join().length * (2 / 5) * 10);
		// Wait until all players are in the room before starting the timer and allowing typing in box
		this.gameSetup();
	},

	render: function() {
		var content = this.template({ words: this.words })
		this.$el.html(content)
		return this;
	},

	events: {
		"keyup.val .user-input": "handleInput"
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
			$input.css("background", "white")
		} else {
			$input.css("background", "red")
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

	changeWordColor: function() {
		var wordsBeg = this.words.slice(0, this.counter).join(" ");
		var greenWord = '<span id="current-word"> ' + this.words[this.counter] + "</span> "
		var wordsEnd = this.words.slice(this.counter + 1, this.words.length).join(" ")
		var newContent = wordsBeg + greenWord + wordsEnd
		$("div#game-text").html(newContent)
	},

	endGame: function(time) {
		clearInterval(this.gameCountDown);
		var minutes = (this.totalTime - this.timer) / 600
		var letters = this.words.join("").length;
		var wpm = ((letters / 5) / minutes).toFixed(2);
		var correctness = ((letters/this.totalKeys) * 100).toFixed(2);
		var attrs = {
			wpm: wpm,
			wpm_percentile: correctness,
			heat_time: this.model.collection.heat.get("start_time"),
			race_id: this.model.collection.heat.get("race_id")
		};

		if (time) {
			this.model.save(attrs, { silent: true })
			console.log(wpm + " WPM");
			console.log(correctness + "% correct")
		} else {
			console.log("You didn't finish in time")
			this.model.set(attrs, { silent: true })
		}
		this.parent.showScores(attrs, this.model.get("race_id"));
	},

	runTimer: function() {
		var that = this;
		this.timer = this.totalTime;
		this.gameCountDown = setInterval(function() {
			that.timer--
			var mins = Math.floor(that.timer / 600);
			var secs = Math.floor((that.timer - (mins * 600)) / 10)
			secs = secs < 10 ? "0" + secs : secs
			var decs = Math.ceil(that.timer - (mins * 600) - (secs * 10))
			var timeDisplay
			timeDisplay = mins < 1 ? secs + ":" + decs : mins + ":" + secs
			$("div#game-timer").html(timeDisplay)

			if (that.timer <= 0) {
				clearInterval(that.gameCountDown);
				$("div#game-timer").html("00:0")
				that.outOfTime();
				that.endGame(NaN);
			}
		}, 100);
	},

	outOfTime: function() {
		console.log("YOU LOSE")
	},

	gameSetup: function() {
				// Wait until all players are in the room before starting the timer and allowing typing in box
		var that = this;
		var countStart = 500;
		var startCountDown = setInterval(function() {
			countStart--;
			$("div#count-down").html(countStart)
			if (countStart === 0) {
				clearInterval(startCountDown);
				that.runTimer();
				$("div#count-down").remove();
			}
		}, 1000);
	},

	updateBoards: function() {
		var progress = this.model.get("progress");
		$.ajax({
			url: "/heats/update_board",
			type: "POST",
			data: {
				racer_id: this.model.cid,
				progress: progress
			}
		})
	}
})










;
