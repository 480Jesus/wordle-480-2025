import { CellState } from "./types";

export class WorldEvaluator{

    evaluate(target: string, guess:string): CellState[] {
        const result: CellState[] = new Array(guess.length).fill("wrongLetter");
        const remaining = new Map<string, number>();

        
        // Marcar aciertos exactos y cuenta las letras sobrantes de target
        
        for (let i= 0; i < target.length; i++) {
            if (guess[i] === target[i]) {
                result[i] = "RightLetter"
            } else {
                const ch = target[i];
                remaining.set(ch, (remaining.get(ch) ?? 0)+ 1)
            }
        }

        //Marcar cuando estan descolocadas si esa letra esta en target

        
        for (let i = 0; i< guess.length; i++) {
            if (result[i] === "RightLetter")
                continue;

            const ch = guess[i];
            const count = remaining.get(ch) ?? 0;

            if (count > 0) {
                result[i] = "MisplacedLetter";
                remaining.set(ch, count -1);
            }
        }
        return result;
    }
}
