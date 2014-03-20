window.TypeRacer.Views.NewHeat = Backbone.CompositeView.extend({
	template: JST["heats/new"],

	initialize: function() {
		this.words = this.model.get("text").split(" ");
		this.addBoard();
		this.gameSetup();
		// this.raceTrack;

		// this.listenTo(this.model.racerStats(), "add", this.raceTrack.render)
	},

	className: "race-board",

	render: function() {
		debugger
		var content = this.template()
		this.$el.html(content)

		this.renderSubviews();

		return this;
	},

	addBoard: function() {
		var newRacerStat = this.model.racerStats().add(
			new TypeRacer.Models.RacerStat({
						user_id: $("#current_user").data("id"),
						user_name: $("#current_user").data("name"),
					})
		)
		debugger
		var newBoardView = new TypeRacer.Views.BoardNew({
			model: newRacerStat
		});

		this.addSubview("#game-board", newBoardView);
		newBoardView.render();
	},

	addTrackView: function() {
		this.raceTrack = new TypeRacer.Views.Track({
			collection: this.model.racerStats()
		});
		this.addSubview("#race-track", this.raceTrack);
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
			secs = secs < 10 ? "0" + secs : secs
			var decs = Math.ceil(timer - (mins * 600) - (secs * 10))
			var timeDisplay
			timeDisplay = mins < 1 ? secs + ":" + decs : mins + ":" + secs
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

	gameSetup: function() {
				// Wait until all players are in the room before starting the timer and allowing typing in box
		var that = this;
		var countStart = 10;
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