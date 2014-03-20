window.TypeRacer.Views.BoardNew = Backbone.View.extend({
	template: JST["racer_stats/user_input"],

	className: "race-board",

	initialize: function(options) {
		this.counter = 0;
		this.words = this.model.collection.heat.get("text").split(" ");
		// Wait until all players are in the room before starting the timer and allowing typing in box
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
	}
})