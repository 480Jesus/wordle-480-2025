import { WordleGame } from "../domain/WordleGame.js";
import { WordEvaluator } from "../domain/WordEvaluator.js";
import { GameController } from "../application/services/GameController.js";
import { DomGameUIAdapter } from "../infrastructure/ui/DomGameUIAdapter.js";
import { DomKeyboardInputAdapter } from "../infrastructure/input/DomKeyboardInputAdapter.js";
import { BrowserNavigationAdapter } from "../infrastructure/navigation/BrowserNavigationAdapter.js";
import { InMemoryWordProvider } from "../infrastructure/words/InMemoryWordProvider.js";
import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "../env.js";

const words = [
    "GATOS", "PERRO", "CASAS", "LIBRO", "PLAYA",
    "MONTE", "VERDE", "NEGRO", "PIANO", "FRESA",
    "DULCE", "SALSA", "LIMON", "PAPEL", "MESA",
    "SILLA", "COCHE", "TREN", "AVION", "BARCO",
    "HOTEL", "PLATO", "ARROZ", "PERAS", "MANGO",
    "MELON", "TIGRE", "ZORRO", "PALMA", "CAMPO"
];

const wordProvider = new InMemoryWordProvider(words);
const targetWord = wordProvider.getRandomWord();

const evaluator = new WordEvaluator();
const game = new WordleGame(targetWord, MAX_WORD_SIZE, MAX_ATTEMPTS, evaluator);

const ui = new DomGameUIAdapter();
const navigation = new BrowserNavigationAdapter();
const controller = new GameController(game, ui, navigation);

const input = new DomKeyboardInputAdapter();
input.subscribe((code) => controller.handleInput(code));
