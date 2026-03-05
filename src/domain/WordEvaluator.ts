import { CellState } from "./types";

/**
 * Servicio encargado de evaluar un intento del jugador comparándolo
 * con la palabra objetivo.
 *
 * Implementa la lógica de validación típica de Wordle:
 *  - Marca letras correctas y en la posición correcta (`"RightLetter"`).
 *  - Marca letras correctas pero en posición incorrecta (`"MisplacedLetter"`).
 *  - Marca letras que no aparecen en la palabra (`"WrongLetter"`).
 *
 * Este evaluador no modifica estado alguno; únicamente recibe una palabra
 * objetivo y un intento, devolviendo un arreglo de estados por letra.
 */

export class WordEvaluator{

    
    /**
     * Evalúa un intento (`guess`) frente a la palabra objetivo (`target`),
     * devolviendo un arreglo que indica el estado de cada letra.
     *
     * El algoritmo funciona en dos fases:
     *  1. Marca todas las letras perfectamente correctas (verde).
     *     A la vez, lleva un conteo de las letras restantes en `target`
     *     que no han sido emparejadas.
     *
     *  2. Para cada letra no marcada como correcta, verifica si aparece
     *     en las letras restantes. Si es así, se marca como `"MisplacedLetter"`
     *     y se reduce su conteo.
     *
     * @param {string} target - La palabra objetivo que debe adivinarse.
     * @param {string} guess - El intento que debe evaluarse.
     * @returns {CellState[]} Un arreglo indicando el estado de cada letra del intento.
     */


    evaluate(target: string, guess:string): CellState[] {
        const result: CellState[] = new Array(guess.length).fill("wrongLetter");
        const remaining = new Map<string, number>();

        
        
        for (let i= 0; i < target.length; i++) {
            if (guess[i] === target[i]) {
                result[i] = "RightLetter"
            } else {
                const ch = target[i];
                remaining.set(ch, (remaining.get(ch) ?? 0)+ 1)
            }
        }
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
