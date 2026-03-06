/**
 * representa el estado de validación de una letra en el juego, indicando si es correcta, incorrecta o está en la palabra pero en posición incorrecta.
 * 
 * "RightLetter": La letra es correcta y está en la posición correcta.
 * "MisplacedLetter": La letra está en la palabra pero en una posición diferente.
 * "WrongLetter": La letra no está en la palabra.
 * 
 */

export type CellState = "RightLetter" | "MisplacedLetter" | "WrongLetter";

/**
 * Define los posibles resultados al enviar un intento en el juego, incluyendo el estado de cada letra del intento y la palabra enviada.
 * 
 * "continue": El intento es válido pero el juego continúa.
 * "win": El intento es correcto y el jugador ha ganado.
 * "lose": El intento es incorrecto y el jugador ha perdido.
 * "invalid-length": El intento no tiene la longitud requerida para ser válido.
 */

export type SubmitOutcome =
    | "continue"
    | "win"
    | "lose"
    | "invalid-length";

/**
 * Resultado devuelto al procesar la validación de un intento.
 *
 * Contiene:
 * - El resultado global (`outcome`)
 * - El estado de cada letra (`states`)
 * - La palabra enviada (`submittedGuess`)
 *
 * Cuando el resultado es `"invalid-length"`, los campos `states`
 * y `submittedGuess` pueden ser `null`.
 */

export interface SubmitResult {
    
    /**
     * Resultado del intento realizado.
     */

    outcome: SubmitOutcome;
    /**
     * Lista de estados para cada letra del intento, o `null` si el intento
     * no fue válido.
     */

    states: CellState[] | null;
    /**
     * La palabra enviada en el intento, o `null` si el intento no fue válido.
     */
    submittedGuess: string | null;
}
