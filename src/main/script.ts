import { WordleGame } from "../domain/WordleGame.js";
import { WordEvaluator } from "../domain/WordEvaluator.js";
import { GameController } from "../application/services/GameController.js";
import { DomGameUIAdapter } from "../infrastructure/ui/DomGameUIAdapter.js";
import { DomKeyboardInputAdapter } from "../infrastructure/input/DomKeyboardInputAdapter.js";
import { BrowserNavigationAdapter } from "../infrastructure/navigation/BrowserNavigationAdapter.js";
import type { RandomWordPort } from "../application/ports/RandomWordPort.js";
import { SupabaseWordProvider } from "../infrastructure/words/SupabaseWordProvider.js";
import { InMemoryWordProvider } from "../infrastructure/words/InMemoryWordProvider.js";
import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "../env.js";

const fallbackWords = [
    "GATOS", "PERRO", "CASAS", "LIBRO", "PLAYA",
    "MONTE", "VERDE", "NEGRO", "PIANO", "FRESA",
    "DULCE", "SALSA", "LIMON", "PAPEL", "MESA",
    "SILLA", "COCHE", "TREN", "AVION", "BARCO",
    "HOTEL", "PLATO", "ARROZ", "PERAS", "MANGO",
    "MELON", "TIGRE", "ZORRO", "PALMA"
];

async function init(): Promise<void> {
    let wordProvider: RandomWordPort;
    let targetWord: string;

    try {
        wordProvider = new SupabaseWordProvider();
        targetWord = await wordProvider.getRandomWord();
    } catch (error) {
        console.error("Supabase unavailable. Falling back to in-memory words.", error);
        wordProvider = new InMemoryWordProvider(fallbackWords);
        targetWord = await wordProvider.getRandomWord();
    }

    const evaluator = new WordEvaluator();
    const game = new WordleGame(targetWord, MAX_WORD_SIZE, MAX_ATTEMPTS, evaluator);

    const ui = new DomGameUIAdapter();
    const navigation = new BrowserNavigationAdapter();
    const controller = new GameController(game, ui, navigation, wordProvider);

    const input = new DomKeyboardInputAdapter();
    input.subscribe((code: string) => controller.handleInput(code));
}

void init();
