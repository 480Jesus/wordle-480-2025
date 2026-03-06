import { codeToLetter, isBackspace, isLetterCode, isEnterCode } from "../../infrastructure/input/Keyboard";
var GameController = /** @class */ (function () {
    function GameController(game, ui, navigation) {
        this.game = game;
        this.ui = ui;
        this.navigation = navigation;
    }
    GameController.prototype.handleInput = function (code) {
        if (isLetterCode(code)) {
            var letter = codeToLetter(code);
            var added = this.game.addLetter(letter);
            if (added) {
                this.ui.setLetter(this.game.turn, this.game.guessLength - 1, letter);
            }
            return;
        }
        if (isBackspace(code)) {
            var previousLength = this.game.guessLength;
            var removed = this.game.backspace();
            if (removed) {
                this.ui.deleteLetter(this.game.turn, previousLength - 1);
            }
            return;
        }
        if (isEnterCode(code)) {
            var result = this.game.submitGuess();
            if (result.outcome === "invalid-length") {
                this.ui.shakeRow(this.game.turn);
                return;
            }
            if (!result.states || !result.submittedGuess)
                return;
            var turn = this.game.turn - (result.outcome === "continue" ? 1 : 0);
            this.paintCells(turn, result.states);
            this.paintKeys(result.submittedGuess, result.states);
            if (result.outcome === "win") {
                this.navigation.goToWin();
            }
            if (result.outcome === "lose") {
                this.navigation.goToLose();
            }
        }
    };
    GameController.prototype.paintCells = function (turn, states) {
        for (var i = 0; i < states.length; i++) {
            this.ui.paintCell(turn, i, states[i]);
        }
    };
    GameController.prototype.paintKeys = function (submittedGuess, states) {
        for (var i = 0; i < states.length; i++) {
            var letter = submittedGuess[i];
            var letterCode = letter === "Ñ" ? "Semicolon" : "Key".concat(letter);
            this.ui.paintKey(letterCode, states[i]);
        }
    };
    return GameController;
}());
export { GameController };
