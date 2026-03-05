export class WordleGame {
    constructor(targetWord, maxWordSize, maxAttempts, evaluator) {
        this.targetWord = targetWord;
        this.maxWordSize = maxWordSize;
        this.maxAttempts = maxAttempts;
        this.evaluator = evaluator;
        this.currentGuess = "";
        this.currentTurn = 1;
    }
    get turn() {
        return this.currentTurn;
    }
    get guessLength() {
        return this.currentGuess.length;
    }
    addLetter(letter) {
        if (this.currentGuess.length >= this.maxWordSize)
            return false;
        this.currentGuess += letter;
        return true;
    }
    backspace() {
        if (this.currentGuess.length === 0)
            return false;
        this.currentGuess = this.currentGuess.slice(0, -1);
        return true;
    }
    submitGuess() {
        if (this.currentGuess.length !== this.maxWordSize)
            return {
                outcome: "invalid-length", states: null, submittedGuess: null
            };
        const submittedGuess = this.currentGuess;
        const states = this.evaluator.evaluate(this.targetWord, submittedGuess);
        if (submittedGuess === this.targetWord) {
            return {
                outcome: "win", states, submittedGuess
            };
        }
        if (this.currentTurn >= this.maxAttempts) {
            return {
                outcome: "lose", states, submittedGuess
            };
        }
        this.currentTurn += 1;
        this.currentGuess = "";
        return { outcome: "continue", states, submittedGuess };
    }
}
