import { codeToLetter, isBackspace, isLetterCode, isEnterCode } from "../../infrastructure/input/Keyboard.js";
export class GameController {
    constructor(game, ui, navigation, randomWordProvider) {
        this.game = game;
        this.ui = ui;
        this.navigation = navigation;
        this.randomWordProvider = randomWordProvider;
    }
    handleInput(code) {
        if (isLetterCode(code)) {
            const letter = codeToLetter(code);
            const added = this.game.addLetter(letter);
            if (added) {
                this.ui.setLetter(this.game.turn, this.game.guessLength - 1, letter);
            }
            return;
        }
        if (isBackspace(code)) {
            const previousLength = this.game.guessLength;
            const removed = this.game.backspace();
            if (removed) {
                this.ui.deleteLetter(this.game.turn, previousLength - 1);
            }
            return;
        }
        if (isEnterCode(code)) {
            const result = this.game.submitGuess();
            if (result.outcome === "invalid-length") {
                this.ui.shakeRow(this.game.turn);
                return;
            }
            if (!result.states || !result.submittedGuess)
                return;
            const turn = this.game.turn - (result.outcome === "continue" ? 1 : 0);
            this.paintCells(turn, result.states);
            this.paintKeys(result.submittedGuess, result.states);
            if (result.outcome === "win") {
                this.randomWordProvider.resetWord();
                this.navigation.goToWin();
            }
            if (result.outcome === "lose") {
                this.randomWordProvider.resetWord();
                this.navigation.goToLose();
            }
        }
    }
    paintCells(turn, states) {
        for (let i = 0; i < states.length; i++) {
            this.ui.paintCell(turn, i, states[i]);
        }
    }
    paintKeys(submittedGuess, states) {
        for (let i = 0; i < states.length; i++) {
            const letter = submittedGuess[i];
            const letterCode = letter === "Ñ" ? "Semicolon" : `Key${letter}`;
            this.ui.paintKey(letterCode, states[i]);
        }
    }
}
