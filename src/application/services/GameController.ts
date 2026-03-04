import { WordleGame } from "../../domain/WordleGame";
import { codeToLetter, isBackspaceCode, isLetterCode, isEnterCode } from "../../infrastructure/input/Keyboard";
import { GameUIPort } from "../ports/GameUIPort";
import { NavigationPort } from "../ports/NavigationPort";

export class GameController {
    constructor(
        private readonly game: WordleGame,
        private readonly ui: GameUIPort,
        private readonly navigation: NavigationPort,
    ) { }

    handleInput(code: string): void {
        if (isLetterCode(code)) {
            const letter = codeToLetter(code);
            const added = this.game.addLetter(letter);
            if (added) {
                this.ui.setLetter(this.game.turn, this.game.guessLenght - 1, letter);
                this.ui.paintKey(code);
            }
            return;
        }

        if (isBackspaceCode(code)) {
            const previousLenght = this.game.guessLenght;
            const removed = this.game.backSpace();
            if (removed) {
                this.ui.deleteLetter(this.game.turn, previousLenght - 1);
            }
            return;
        }

        if (isEnterCode(code)) {
            const result = this.game.submitGuess();
            if (!result.states || !result.submittedGuess)
                return;

            for (let i = 0; i < result.states.length; i++) {
                this.ui.paintCell(this.game.turn - (result.outcome === "continue" ? 1 : 0), i, result.states[i])
            }

            if (result.outcome === "win") {
                this.navigation.goToWin;
            }

            if (result.outcome === "lose") {
                this.navigation.goToLose;
            }

        }
    }
}