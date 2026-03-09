"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WordleGame_js_1 = require("../domain/WordleGame.js");
const WordEvaluator_js_1 = require("../domain/WordEvaluator.js");
const GameController_js_1 = require("../application/services/GameController.js");
const DomGameUIAdapter_js_1 = require("../infrastructure/ui/DomGameUIAdapter.js");
const DomKeyboardInputAdapter_js_1 = require("../infrastructure/input/DomKeyboardInputAdapter.js");
const BrowserNavigationAdapter_js_1 = require("../infrastructure/navigation/BrowserNavigationAdapter.js");
const InMemoryWordProvider_js_1 = require("../infrastructure/words/InMemoryWordProvider.js");
const env_js_1 = require("../env.js");
const words = [
    "GATOS", "PERRO", "CASAS", "LIBRO", "PLAYA",
    "MONTE", "VERDE", "NEGRO", "PIANO", "FRESA",
    "DULCE", "SALSA", "LIMON", "PAPEL", "MESA",
    "SILLA", "COCHE", "TREN", "AVION", "BARCO",
    "HOTEL", "PLATO", "ARROZ", "PERAS", "MANGO",
    "MELON", "TIGRE", "ZORRO", "PALMA", "CAMPO"
];
const wordProvider = new InMemoryWordProvider_js_1.InMemoryWordProvider(words);
const targetWord = wordProvider.getRandomWord();
const evaluator = new WordEvaluator_js_1.WordEvaluator();
const game = new WordleGame_js_1.WordleGame(targetWord, env_js_1.MAX_WORD_SIZE, env_js_1.MAX_ATTEMPTS, evaluator);
const ui = new DomGameUIAdapter_js_1.DomGameUIAdapter();
const navigation = new BrowserNavigationAdapter_js_1.BrowserNavigationAdapter();
const controller = new GameController_js_1.GameController(game, ui, navigation);
const input = new DomKeyboardInputAdapter_js_1.DomKeyboardInputAdapter();
input.subscribe((code) => controller.handleInput(code));
