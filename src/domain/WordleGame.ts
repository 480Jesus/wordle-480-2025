import { SubmitResult } from "./types";
import { WordEvaluator } from "./WordEvaluator";


/**
 * Representa la lógica central del juego Wordle.
 *
 * Esta clase mantiene el estado del juego (turno actual, intento actual)
 * y coordina:
 *  - La construcción del intento del usuario (añadir/borrar letras)
 *  - La validación del intento mediante `WordEvaluator`
 *  - La determinación del resultado del turno (continuar, ganar o perder)
 *
 * No tiene ninguna dependencia del DOM ni de la interfaz de usuario,
 * respetando la separación de capas en la arquitectura hexagonal.
 */


export class WordleGame{

    /** Intento actual del jugador (aún sin validar). */
    private currentGuess = "";

    /** Turno actual, iniciando en 1. */
    private currentTurn = 1;

    
    /**
     * Crea una instancia del juego Wordle.
     *
     * @param {string} targetWord - Palabra objetivo que el jugador debe adivinar.
     * @param {number} maxWordSize - Longitud máxima del intento (tamaño de la palabra).
     * @param {number} maxAttempts - Número máximo de intentos permitidos.
     * @param {WordEvaluator} evaluator - Servicio encargado de evaluar un intento.
     */

    constructor (
        private readonly targetWord: string,
        private readonly maxWordSize: number,
        private readonly maxAttempts: number,
        private readonly evaluator: WordEvaluator,
    ) {}

    /**
     * Devuelve el número de turno actual (1-indexado).
     *
     * @returns {number}
     */
    get turn(): number {
        return this.currentTurn;
    }

    
    /**
     * Devuelve la longitud actual del intento que el usuario está escribiendo.
     *
     * @returns {number}
     */
    get guessLength(): number {
        return this.currentGuess.length;
    }

    
    /**
     * Intenta añadir una letra al intento actual.
     *
     * @param {string} letter - Letra que el jugador ha introducido.
     * @returns {boolean} `true` si se añadió correctamente; `false` si el intento está lleno.
     */

    addLetter(letter: string): boolean {
        if (this.currentGuess.length >= this.maxWordSize) return false;
        this.currentGuess += letter;
        return true;
    }

    
    /**
     * Elimina la última letra del intento actual.
     *
     * @returns {boolean} `true` si se eliminó una letra; `false` si ya no había ninguna.
     */

    backspace(): boolean {
        if (this.currentGuess.length === 0) return false;
        this.currentGuess = this.currentGuess.slice(0, -1);
        return true;
    }


    
    /**
     * Envía el intento actual para su evaluación.
     *
     * Este método:
     *  1. Verifica que la longitud del intento sea válida.
     *  2. Evalúa el intento contra la palabra objetivo usando `WordEvaluator`.
     *  3. Determina el resultado del turno:
     *      - `"win"` si el intento coincide con la palabra objetivo.
     *      - `"lose"` si se agotaron los intentos.
     *      - `"continue"` si aún quedan intentos disponibles.
     *      - `"invalid-length"` si el intento no tiene la longitud requerida.
     *  4. Resetea el intento actual si el juego continúa.
     *
     * @returns {SubmitResult} Resultado de la evaluación del intento.
     */

    submitGuess(): SubmitResult {
        if (this.currentGuess.length !== this.maxWordSize)
            return {
                outcome: "invalid-length", states: null, submittedGuess: null
            };

        const submittedGuess = this.currentGuess;
        const states = this.evaluator.evaluate(this.targetWord, submittedGuess);

        if (submittedGuess === this.targetWord) {
            return {
                outcome: "win", states, submittedGuess
            };
        }

        if (this.currentTurn >= this.maxAttempts) {
            return {
                outcome: "lose", states, submittedGuess
            };
        }

        this.currentTurn += 1;

        this.currentGuess = "";

        return { outcome: "continue", states, submittedGuess };
    }
}
