window.TypeRacer.Views.BoardNew = Backbone.View.extend({
	template: JST["racer_stats/user_input"],

	className: "race-board .col-md-12",

	remove: function(){
		clearInterval(this.gameTimer);
		clearInterval(this.gameCountDown);
		Backbone.View.prototype.remove.apply(this);
	},

	initialize: function(options) {
		var that = this;
		this.gameChannel = options.channel;
		console.log(options.timer)
		this.countStart = Math.round(options.timer / 1000);
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
		var content = this.template({ words: this.words });
		this.$el.html(content);
		return this;
	},

	events: {
		"keypress.val .user-input": "handleInput",
		"keyup.val .user-input": "handleBackspace"
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

	changePassageColor: function() {
		var wordsBeg = this.words.slice(0, this.counter).join(" ");
		var greenWord = ' <span id="current-word">' + this.words[this.counter] + "</span> "
		var wordsEnd = this.words.slice(this.counter + 1, this.words.length).join(" ")
		var newContent = wordsBeg + greenWord + wordsEnd;
		$("div#game-text").html(newContent);
	},

	endGame: function(time) {
		clearInterval(this.gameTimer);
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
		this.gameCountDown = setInterval(function() {
			that.countStart--;
			$("#waiting").remove();
			$("#count-down").html(that.countStart);
			if (that.countStart <= 0) {
				clearInterval(that.gameCountDown);
				that.setBoard();
				that.runTimer();
			}
		}, 1000);
	},

	handleBackspace: function(e) {
		if (e.which == 8) { this.handleInput(e) }
	},

	handleInput: function(e) {
		if (e.which == 13) { e.preventDefault(); }
		var $input = $(e.target);
		var key = String.fromCharCode(e.which);
		if (/[a-zA-Z0-9-_]/.test(key)) {
			this.totalKeys++
		}
		var userWord = e.which == 8
			? $input.val().slice(0, $input.val().length - 1)
			: $input.val() + key;
		var currentWord = this.counter + 1 == this.words.length
		    ? this.words[this.counter]
		    : this.words[this.counter] + " ";
		console.log(currentWord)
		console.log(userWord)
		if (currentWord === userWord) {
			e.preventDefault();
			this.handleWordEnd($input);
		} else {
	  		if ( currentWord.match("^" + userWord) ) {
				$('#current-word').css("color", "green")
				$input.css("background", "white").css("color", "black")
			} else {
				$('#current-word').css("color", "red")
				$input.css("background", "red").css("color", "white")
			}
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
			this.changePassageColor();
		}
	},

	inputField: function() { return this.$el.find(".user-input") },

	runTimer: function() {
		var that = this;
		this.timer = this.totalTime;
		this.gameTimer = setInterval(function() {
			that.timer--
			$("div#count-down").html(that.showTime(that.timer))

			if (that.timer <= 0) {
				clearInterval(that.gameTimer);
				$("div#count-down").html("00:0")
				that.endGame(NaN);
			}
		}, 100);
	},

	setBoard: function() {
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