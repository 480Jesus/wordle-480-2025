import {WordEvaluator} from "./WordEvaluator";
import {SubmitResult} from "./types";

export class WordleGame {
    private currentGuess = "";
    private currentTurn = 1;

    constructor(
                private readonly targetWord: string, 
                private readonly maxWordSize: number, 
                private readonly maxAttempts: number, 
                private readonly wordEvaluator: WordEvaluator) {}
    
    
    get Turn(): number{
        return this.currentTurn;
    }

    get guessLenght(): number{
        return this.currentGuess.length;
    }

    addLetter(letter : string): boolean{
        if(this.currentGuess.length >= this.maxWordSize)
            return false;
        this.currentGuess += letter;
            return true;
    }

    backSpace(): boolean{
        if(this.currentGuess.length === 0)
            return false;
        this.currentGuess.slice (0, -1);
            return true;
    }

    submitGuess(): SubmitResult{
        if(this.currentGuess.length !== this.maxWordSize)
            return {
                SubmitOutcome: "The word length is too long", states: null, submittedGuess: null};
        
        const submittedGuess = this.currentGuess;
        const states = this.evaluator.evaluate(this.targetWord, submittedGuess);

        if(submittedGuess === this.targetWord){
            return {
                SubmitOutcome: "win", states, submittedGuess
            };
        }

        if(this.currentTurn >= this.maxAttempts){
            return {
                SubmitOutcome: "lose", states, submittedGuess
            };
        }

        this.currentTurn += 1;

        this.currentGuess = "";

        return {SubmitOutcome: "continue", states, submittedGuess};
    }
}