window.TypeRacer.Views.NewHeat = Backbone.View.extend({
	initialize: function() {
		this.counter = 0;
		this.words = this.model.get("text").split(" ");
		this.startTimer()
		// Wait until all players are in the room before starting the timer and allowing typing in box
	},

	template: JST["heats/new"],

	className: "race-board",

	render: function() {
		var content = this.template({ words: this.words, heat: this.model })
		this.$el.html(content)
		return this;
	},

	events: {
		"keyup.val .user-input": "handleInput"
	},

	endGame: function() {
		var totalTime = (new Data().getTime() - this.startTime) / 1000;
		var wordCount = (this.model.get("text").length / 5);
		var wpm = totalTime / wordCount;
		console.log(wpm + " WPM");
	},

	handleInput: function(event) {
		var input = $(event.target)
		var userWord = input.val()
		var currentWord = this.words[this.counter] + " "
		if (currentWord === input.val()) {
			this.handleWordEnd(input);
		} else if ( currentWord.match("^" + input.val()) ) {
			input.css("background", "white")
		} else {
			input.css("background", "red")
		}
	},

	handleWordEnd: function(input) {
		this.counter++;
		input.val("");
		if (this.counter + 1 == this.words.length) {
			this.endGame();
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

	runTimer: function() {
		// timer is based on typing 30 wpm, if a word is average 5 letters, using deciseconds
		var that = this;
		var timer = this.words.join().length * (2 / 5) * 10
		var gameCountDown = setInterval(function() {
			timer--
			var mins = Math.floor(timer / 600);
			var secs = Math.floor((timer - (mins * 600)) / 10)
			var decs = Math.ceil(timer - (mins * 600) - (secs * 10))
			var timeDisplay
			mins < 1 ? timeDisplay = secs + ":" + decs : timeDisplay = mins + ":" + secs
			$("div#game-timer").html(timeDisplay)

			if (timer <= 0) {
				clearInterval(gameCountDown);
				that.outOfTime();
			}
		}, 100);
	},

	outOfTime: function() {
		console.log("YOU LOSE")
	},

	startTimer: function() {
		var that = this;
		var countStart = 1;
		var startCountDown = setInterval(function() {
			countStart--;
			$("div#count-down").html(countStart)
			if (countStart === 0) {
				clearInterval(startCountDown);
				that.runTimer();
				$("div#count-down").remove();
			}
		}, 1000);
	}
		// this.startTime = new Date().getTime();
})