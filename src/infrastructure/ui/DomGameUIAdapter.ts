import { GameUIPort } from "../../application/ports/GameUIPort";
import { CellState } from "../../domain/types";


/**
 * Adaptador de interfaz de usuario basado en el DOM.
 *
 * Implementa el puerto `GameUIPort`, proporcionando las operaciones necesarias
 * para actualizar visualmente el tablero y el teclado del juego Wordle.
 *
 * Este adaptador es parte de la capa de infraestructura dentro de la arquitectura
 * hexagonal, permitiendo que la lógica del juego interactúe con el entorno del
 * navegador sin depender directamente del DOM.
 */
export class DomGameUIAdapter implements GameUIPort {

    
    /**
     * Mapa entre los estados lógicos de cada celda y las clases CSS usadas para
     * representarlos visualmente en el tablero.
     *
     * - `"RightLetter"`      → verde
     * - `"MisplacedLetter"`  → amarillo/naranja
     * - `"WrongLetter"`      → gris
     */

    private readonly cssByState: Record<CellState, string> = {
        RightLetter: "cell-green",
        MisplacedLetter: "cell-orange",
        WrongLetter: "cell-grey",
    };

    
    /**
     * Obtiene una celda del tablero en función del turno (fila) y la posición (columna).
     *
     * @private
     * @param {number} turn - Número de fila del tablero.
     * @param {number} position - Índice de columna dentro de la fila.
     * @returns {HTMLElement} La celda deseada.
     * @throws {Error} Si la fila o la celda no existen en el DOM.
     */
    private getCell(turn: number, position: number): HTMLElement {
        const row = document.getElementById(`row_${turn}`);
        if (!row) throw new Error(`Row not found: row_${turn}`);
        const cell = (Array.from(row.children) as HTMLElement[])[position];
        if (!cell) throw new Error(`Cell not found at row ${turn}, position ${position}`);
        return cell;
    }

    
    /**
     * Escribe una letra en la celda especificada del tablero.
     *
     * @param {number} turn - Fila en la que escribir.
     * @param {number} position - Columna dentro de la fila.
     * @param {string} letter - Letra que debe mostrarse en la celda.
     * @returns {void}
     */
    setLetter(turn: number, position: number, letter: string): void {
        this.getCell(turn, position).textContent = letter;
    }

    
    /**
     * Borra la letra que se encuentra en una celda concreta del tablero.
     *
     * @param {number} turn - Fila donde se encuentra la celda.
     * @param {number} position - Columna dentro de la fila.
     * @returns {void}
     */
    deleteLetter(turn: number, position: number): void {
        this.getCell(turn, position).textContent = "";
    }

    
    /**
     * Pinta una celda según el estado de la letra evaluada.
     *
     * No elimina clases previas; simplemente añade la clase correspondiente.
     * En caso de necesitar repintado limpio, se debe extender este método.
     *
     * @param {number} turn - Fila donde se encuentra la celda.
     * @param {number} position - Columna dentro de la fila.
     * @param {CellState} state - Estado de validación de la letra.
     * @returns {void}
     */
    paintCell(turn: number, position: number, state: CellState): void {
        this.getCell(turn, position).classList.add(this.cssByState[state])
    }

    
    /**
     * Marca una tecla del teclado virtual como utilizada.
     *
     * No se pintan las teclas Enter ni Backspace.
     *
     * @param {string} code - Código de la tecla (`KeyboardEvent.code`).
     * @returns {void}
     */
    paintKey(code: string): void {
        if (code === "Enter" || code === "Backspace") return;
        const button = Array.from(document.getElementsByClassName("key"))
            .find((el) => (el as HTMLButtonElement).value === code) as HTMLButtonElement | undefined;
        if (button) button.classList.add("keyPressed");
    }
}


