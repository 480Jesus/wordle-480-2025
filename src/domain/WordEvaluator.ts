import { CellState } from "./types";

export class WordEvaluator {

    evaluate(target: string, guess: string): CellState[] {
        const result: CellState[] = new Array(guess.length).fill("WrongLetter");
        const remaining = new Map<string, number>();

        for (let i = 0; i < target.length; i++) {
            if (guess[i] === target[i]) {
                result[i] = "RightLetter"
            } else {
                const ch = target[i];
                remaining.set(ch, (remaining.get(ch) ?? 0) + 1)
            }
        }

        for (let i = 0; i < guess.length; i++) {
            if (result[i] === "RightLetter")
                continue;

            const ch = guess[i];
            const count = remaining.get(ch) ?? 0;

            if (count > 0) {
                result[i] = "MisplacedLetter";
                remaining.set(ch, count - 1);
            }
        }
        return result;
    }
}
