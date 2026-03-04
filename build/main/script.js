import { MAX_ATTEMPTS, MAX_WORD_SIZE } from "../env.js";
import { GameController } from "../application/services/GameController.js";
import { WordEvaluator } from "../domain/WordEvaluator.js";
import { WordleGame } from "../domain/WordleGame.js";
import { DomGameUIAdapter } from "../infrastructure/ui/DomGameUIAdapter.js";
import { BrowserNavigationAdapter } from "../infrastructure/navigation/BrowserNavigationAdapter.js";
import { InMemoryWordProvider } from "../infrastructure/words/InMemoryWordProvider.js";
import { DomKeyboardInputAdapter } from "../infrastructure/input/DomKeyboardInputAdapter.js";
var provider = new InMemoryWordProvider([
    "JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE", "PLAYA", "PLATA", "ARBOL", "QUESO"
]);
var targetWord = provider.getRandomWord();
var evaluator = new WordEvaluator();
var game = new WordleGame(targetWord, MAX_WORD_SIZE, MAX_ATTEMPTS, evaluator);
var ui = new DomGameUIAdapter();
var navigation = new BrowserNavigationAdapter();
var controller = new GameController(game, ui, navigation);
var input = new DomKeyboardInputAdapter();
input.subscribe(function (code) { return controller.handleInput(code); });
