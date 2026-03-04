var WordleGame = /** @class */ (function () {
    function WordleGame(targetWord, maxWordSize, maxAttempts, evaluator) {
        this.targetWord = targetWord;
        this.maxWordSize = maxWordSize;
        this.maxAttempts = maxAttempts;
        this.evaluator = evaluator;
        this.currentGuess = "";
        this.currentTurn = 1;
    }
    Object.defineProperty(WordleGame.prototype, "turn", {
        get: function () {
            return this.currentTurn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WordleGame.prototype, "guessLength", {
        get: function () {
            return this.currentGuess.length;
        },
        enumerable: false,
        configurable: true
    });
    WordleGame.prototype.addLetter = function (letter) {
        if (this.currentGuess.length >= this.maxWordSize)
            return false;
        this.currentGuess += letter;
        return true;
    };
    WordleGame.prototype.backspace = function () {
        if (this.currentGuess.length === 0)
            return false;
        this.currentGuess = this.currentGuess.slice(0, -1);
        return true;
    };
    WordleGame.prototype.submitGuess = function () {
        if (this.currentGuess.length !== this.maxWordSize) {
            return { outcome: "invalid-lenghth", states: null, submittedGuess: null };
        }
        var submittedGuess = this.currentGuess;
        var states = this.evaluator.evaluate(this.targetWord, submittedGuess);
        if (submittedGuess === this.targetWord) {
            return { outcome: "win", states: states, submittedGuess: submittedGuess };
        }
        if (this.currentTurn >= this.maxAttempts) {
            return { outcome: "lose", states: states, submittedGuess: submittedGuess };
        }
        this.currentTurn += 1;
        this.currentGuess = "";
        return { outcome: "continue", states: states, submittedGuess: submittedGuess };
    };
    return WordleGame;
}());
export { WordleGame };
