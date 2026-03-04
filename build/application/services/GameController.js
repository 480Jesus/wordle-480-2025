import { codeToLetter, isBackspaceCode, isLetterCode, isEnterCode } from "../../infrastructure/input/Keyboard";
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
                this.ui.setLetter(this.game.turn, this.game.guessLenght - 1, letter);
                this.ui.paintKey(code);
            }
            return;
        }
        if (isBackspaceCode(code)) {
            var previousLenght = this.game.guessLenght;
            var removed = this.game.backSpace();
            if (removed) {
                this.ui.deleteLetter(this.game.turn, previousLenght - 1);
            }
            return;
        }
        if (isEnterCode(code)) {
            var result = this.game.submitGuess();
            if (!result.states || !result.submittedGuess)
                return;
            for (var i = 0; i < result.states.length; i++) {
                this.ui.paintCell(this.game.turn - (result.outcome === "continue" ? 1 : 0), i, result.states[i]);
            }
            if (result.outcome === "win") {
                this.navigation.goToWin;
            }
            if (result.outcome === "lose") {
                this.navigation.goToLose;
            }
        }
    };
    return GameController;
}());
export { GameController };
