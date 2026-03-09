"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const Keyboard_js_1 = require("../../infrastructure/input/Keyboard.js");
class GameController {
    constructor(game, ui, navigation) {
        this.game = game;
        this.ui = ui;
        this.navigation = navigation;
    }
    handleInput(code) {
        if ((0, Keyboard_js_1.isLetterCode)(code)) {
            const letter = (0, Keyboard_js_1.codeToLetter)(code);
            const added = this.game.addLetter(letter);
            if (added) {
                this.ui.setLetter(this.game.turn, this.game.guessLength - 1, letter);
            }
            return;
        }
        if ((0, Keyboard_js_1.isBackspace)(code)) {
            const previousLength = this.game.guessLength;
            const removed = this.game.backspace();
            if (removed) {
                this.ui.deleteLetter(this.game.turn, previousLength - 1);
            }
            return;
        }
        if ((0, Keyboard_js_1.isEnterCode)(code)) {
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
                this.navigation.goToWin();
            }
            if (result.outcome === "lose") {
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
exports.GameController = GameController;
