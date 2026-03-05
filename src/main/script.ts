
/**
 * Punto de entrada de la aplicación Wordle (arquitectura hexagonal).
 *
 * Este módulo compone y conecta las dependencias de la aplicación:
 *  - Carga de parámetros desde el entorno.
 *  - Creación del proveedor de palabras.
 *  - Inicialización de la lógica de dominio (WordleGame) y el evaluador.
 *  - Configuración de los adaptadores de infraestructura (UI, navegación, teclado).
 *  - Suscripción de las entradas de usuario al controlador de aplicación.
 *
 * No contiene lógica de negocio; su responsabilidad es estrictamente el wiring
 * (ensamblado) de la aplicación.
 */

import { MAX_ATTEMPTS, MAX_WORD_SIZE } from "../env.js";
import { GameController } from "../application/services/GameController.js";
import { WordEvaluator } from "../domain/WordEvaluator.js";
import { WordleGame } from "../domain/WordleGame.js";
import { DomGameUIAdapter } from "../infrastructure/ui/DomGameUIAdapter.js";
import { BrowserNavigationAdapter } from "../infrastructure/navigation/BrowserNavigationAdapter.js";
import { InMemoryWordProvider } from "../infrastructure/words/InMemoryWordProvider.js";
import { DomKeyboardInputAdapter } from "../infrastructure/input/DomKeyboardInputAdapter.js";


/**
 * Proveedor de palabras en memoria. En producción podría reemplazarse
 * por un adaptador que consuma una API o una base de datos.
 */
const provider = new InMemoryWordProvider([
 "JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE", "PLAYA", "PLATA", "ARBOL", "QUESO"
]);

/** Palabra objetivo seleccionada aleatoriamente. */
const targetWord = provider.getRandomWord();

/** Servicio de evaluación de intentos (compara guess vs target). */
const evaluator = new WordEvaluator();

/**
 * Núcleo del dominio: estado de la partida y reglas del juego.
 * Se inicializa con:
 *  - targetWord: palabra a adivinar
 *  - MAX_WORD_SIZE: longitud requerida del intento
 *  - MAX_ATTEMPTS: número máximo de intentos
 *  - evaluator: estrategia de evaluación de letras
 */
const game = new WordleGame(targetWord, MAX_WORD_SIZE, MAX_ATTEMPTS, evaluator);

/** Adaptador de UI basado en DOM: escribe letras, pinta celdas y teclas. */
const ui = new DomGameUIAdapter();

/** Adaptador de navegación: redirige a pantallas de win/lose. */
const navigation = new BrowserNavigationAdapter();

/**
 * Controlador de aplicación: interpreta las entradas y coordina
 * dominio + UI + navegación.
 */
const controller = new GameController(game, ui, navigation);


/**
 * Adaptador de entrada: escucha teclado físico y teclado en pantalla,
 * emite códigos de tecla y delega en el controlador.
 */
const input = new DomKeyboardInputAdapter();


/**
 * Suscripción de la fuente de entrada al controlador.
 * Cada código de tecla recibido invoca `controller.handleInput(...)`.
 *
 * @param {string} code - Código de tecla (KeyboardEvent.code o value del botón virtual).
 */
input.subscribe((code: string) => controller.handleInput(code));
