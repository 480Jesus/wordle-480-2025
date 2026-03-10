import { WordleGame } from "../domain/WordleGame.js";
import { WordEvaluator } from "../domain/WordEvaluator.js";
import { GameController } from "../application/services/GameController.js";
import { DomGameUIAdapter } from "../infrastructure/ui/DomGameUIAdapter.js";
import { DomKeyboardInputAdapter } from "../infrastructure/input/DomKeyboardInputAdapter.js";
import { BrowserNavigationAdapter } from "../infrastructure/navigation/BrowserNavigationAdapter.js";
import { SupabaseWordProvider } from "../infrastructure/words/SupabaseWordProvider.js";
import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "../env.js";

async function init() {
  const wordProvider = new SupabaseWordProvider();
  const targetWord = await wordProvider.getRandomWord();

  const evaluator = new WordEvaluator();
  const game = new WordleGame(targetWord, MAX_WORD_SIZE, MAX_ATTEMPTS, evaluator);

  const ui = new DomGameUIAdapter();
  const navigation = new BrowserNavigationAdapter();

  const controller = new GameController(game, ui, navigation, wordProvider);

  const input = new DomKeyboardInputAdapter();
  input.subscribe((code: string) => controller.handleInput(code));
}

init();
