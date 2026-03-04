import { SubmitResult } from "./types";
import { WordEvaluator } from "./WordEvaluator";


export class WordleGame {
    private currentGuess = "";
    private currentTurn = 1;

    constructor(
        private readonly targetWord: string,
        private readonly maxWordSize: number,
        private readonly maxAttempts: number,
        private readonly evaluator: WordEvaluator) { }


    get turn(): number {
        return this.currentTurn;
    }

    get guessLenght(): number {
        return this.currentGuess.length;
    }

    addLetter(letter: string): boolean {
        if (this.currentGuess.length >= this.maxWordSize)
            return false;
        this.currentGuess += letter;
        return true;
    }

    backSpace(): boolean {
        if (this.currentGuess.length === 0)
            return false;
        this.currentGuess.slice(0, -1);
        return true;
    }

    submitGuess(): SubmitResult {
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