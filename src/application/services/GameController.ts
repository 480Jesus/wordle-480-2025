import { WordleGame } from "../../domain/WordleGame";
import { codeToLetter, isBackspaceCode, isLetterCode, isEnterCode } from "../../infrastructure/input/Keyboard";
import { GameUIPort } from "../ports/GameUIPort";
import { NavigationPort } from "../ports/NavigationPort";

/**
 * Controlador principal del Wordle.
 *
 * Esta clase actúa como intermediaria entre:
 *  - La lógica de dominio (`WordleGame`)
 *  - La interfaz de usuario (implementación de `GameUIPort`)
 *  - La navegación o transición de pantallas (`NavigationPort`)
 *
 * Su responsabilidad es interpretar los códigos de entrada del usuario
 * (teclado físico o virtual) y delegar en la lógica del juego las
 * acciones correspondientes, actualizando posteriormente la UI.

 */

export class GameController {

    
    /**
     * Crea una instancia del controlador del juego.
     *
     * @constructor
     * @param {WordleGame} game - Instancia de la lógica del juego que el controlador gestionará.
     * @param {GameUIPort} ui - Implementación de la interfaz de usuario que el controlador actualizará en respuesta a las acciones del juego.
     * @param {NavigationPort} navigation - Implementación del puerto de navegación que el controlador utilizará para transicionar entre pantallas.
     */
    constructor(
        private readonly game: WordleGame,
        private readonly ui: GameUIPort,
        private readonly navigation: NavigationPort,
    ) { }

    
    /**
     * Procesa un código de entrada proveniente del teclado físico o virtual.
     * 
     *  Según el tipo de código:
     *  - Añade una letra al intento actual.
     *  - Borra la última letra escrita.
     *  - Envía el intento y procesa el resultado.
     * 
     * La UI se actualiza en consecuencia y, si el juego ha terminado,
     * se invoca la navegación hacia la pantalla de victoria o derrota.
     *
     * @param {string} code - Código de entrada del teclado.
     * @return {void} No devuelve ningún valor.
     */
    handleInput(code: string): void {
        if (isLetterCode(code)) {
            const letter = codeToLetter(code);
            const added = this.game.addLetter(letter);
            if (added) {
                this.ui.setLetter(this.game.turn, this.game.guessLength - 1, letter);
                this.ui.paintKey(code);
            }
            return;
        }

        if (isBackspaceCode(code)) {
            const previousLenght = this.game.guessLength;
            const removed = this.game.backspace();
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