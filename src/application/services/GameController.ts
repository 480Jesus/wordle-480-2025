import { WordleGame } from "../../domain/WordleGame.js";
import { codeToLetter, isBackspace, isLetterCode, isEnterCode } from "../../infrastructure/input/Keyboard.js";
import type { CellState } from "../../domain/types.js";
import type { GameUIPort } from "../ports/GameUIPort.js";
import type { NavigationPort } from "../ports/NavigationPort.js";
import type { RandomWordPort } from "../ports/RandomWordPort.js";

export class GameController {
    constructor(
        private readonly game: WordleGame,
        private readonly ui: GameUIPort,
        private readonly navigation: NavigationPort,
        private readonly randomWord: RandomWordPort,
    ) {}

    handleInput(code: string): void {
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

            if (!result.states || !result.submittedGuess) return;

            const turn = this.game.turn - (result.outcome === "continue" ? 1 : 0);

            this.paintCells(turn, result.states);
            this.paintKeys(result.submittedGuess, result.states);

            if (result.outcome === "win") {
                this.randomWord.resetWord();
                this.navigation.goToWin();
            }

            if (result.outcome === "lose") {
                const correctWord = this.game.target;
                try {
                    sessionStorage.setItem("wordle:lastWord", correctWord);
                    localStorage.setItem("wordle:lastWord", correctWord);
                } catch {
                    // Ignore storage errors (privacy mode, quota, etc.)
                }
                this.randomWord.resetWord();
                this.navigation.goToLose(correctWord);
            }
        }
    }

    private paintCells(turn: number, states: CellState[]): void {
        for (let i = 0; i < states.length; i++) {
            this.ui.paintCell(turn, i, states[i]);
        }
    }

    private paintKeys(submittedGuess: string, states: CellState[]): void {
        for (let i = 0; i < states.length; i++) {
            const letter = submittedGuess[i];
            const letterCode = letter === "\u00D1" ? "Semicolon" : `Key${letter}`;
            this.ui.paintKey(letterCode, states[i]);
        }
    }
}
