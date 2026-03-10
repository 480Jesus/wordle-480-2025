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
        const supabaseProvider = new SupabaseWordProvider();
        const timeoutMs = 3000;
        const timeoutPromise = new Promise<string>((_, reject) =>
            setTimeout(() => reject(new Error(`Supabase timeout after ${timeoutMs}ms`)), timeoutMs)
        );

        targetWord = await Promise.race([
            supabaseProvider.getRandomWord(),
            timeoutPromise,
        ]);
        wordProvider = supabaseProvider;
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

function bootstrap(): void {
    void init().catch((error) => {
        console.error("Fatal initialization error", error);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
} else {
    bootstrap();
}
