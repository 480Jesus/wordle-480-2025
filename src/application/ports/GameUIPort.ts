import { CellState } from "../../domain/types";

/**
 * Define las operaciones que la interfaz de usuario del juego debe implementar.
 * 
 * Este puerto forma parte de la arquitectura hexagonal y expone las acciones
 * necesarias para que la lógica del juego pueda interactuar con la UI sin conocer
 * detalles del DOM ni de la implementación concreta.
 */


export interface GameUIPort {

    /**
     * Establece una letra en una celda específica del tablero.
     * 
     * @param{number} turn - Número de intento o fila del tablero donde escribir.
     * @param{number} position - Posicion de la letra dentro de la palabra (columna).
     * @param{string} letter - Letra a mostrar en la celda inficada por turn y position.
     */
    setLetter (turn: number, position: number, letter: string): void;
    
    
    /**
     * Elimina el contenido de una celda concreta del tablero.
     *
     * @param {number} turn - Número de intento o fila del tablero de la celda a limpiar.
     * @param {number} position - Posición de la letra dentro de la palabra (columna) de la celda a limpiar.
     */
    deleteLetter(turn: number, position: number): void;

    
    /**
     * pinta una celda del tablero según el estado de validación de la letra que puede ser correcta,
     * incorrecta o en la palabra pero en posición incorrecta.
     * 
     * @param {number} turn - Número de intento o fila del tablero de la celda a pintar.
     * @param {number} position - Posición de la letra dentro de la palabra (columna) de la celda a pintar.
     * @param {CellState} state - Estado de validación de la letra.
     */
    paintCell(turn:number, position: number, state:CellState): void;

    
    /**
     * Marca una tecla del teclado en pantalla como utilizada o resaltada según si se ha usado o no.
     *
     * @param {string} code - Código de tecla (por ejemplo, "KeyA" para la letra A) a marcar en el teclado en pantalla.
     */
    paintKey(code: string): void;
} 
