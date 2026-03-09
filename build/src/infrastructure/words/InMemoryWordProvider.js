"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryWordProvider = void 0;
class InMemoryWordProvider {
    constructor(words) {
        this.words = words;
    }
    getRandomWord() {
        if (this.words.length === 0) {
            throw new Error("No words available");
        }
        const index = Math.floor(Math.random() * this.words.length);
        return this.words[index];
    }
}
exports.InMemoryWordProvider = InMemoryWordProvider;
