import { MAX_ATTEMPTS, MAX_WORD_SIZE } from "../env.js";
import { GameController } from "../application/services/GameController.js";
import { WordEvaluator } from "../domain/WordEvaluator.js";
import { WordleGame } from "../domain/WordleGame.js";
import { DomGameUIAdapter } from "../infrastructure/ui/DomGameUIAdapter.js";
import { BrowserNavigationAdapter } from "../infrastructure/navigation/BrowserNavigationAdapter.js";
import { InMemoryWordProvider } from "../infrastructure/words/InMemoryWordProvider.js";
import { DomKeyboardInputAdapter } from "../infrastructure/input/DomKeyboardInputAdapter.js";
const provider = new InMemoryWordProvider([
 "JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE", "PLAYA", "PLATA", "ARBOL", "QUESO"
]);
const targetWord = provider.getRandomWord();
const evaluator = new WordEvaluator();
const game = new WordleGame(targetWord, MAX_WORD_SIZE, MAX_ATTEMPTS, evaluator);
const ui = new DomGameUIAdapter();
const navigation = new BrowserNavigationAdapter();
const controller = new GameController(game, ui, navigation);
const input = new DomKeyboardInputAdapter();
input.subscribe((code: string) => controller.handleInput(code));
