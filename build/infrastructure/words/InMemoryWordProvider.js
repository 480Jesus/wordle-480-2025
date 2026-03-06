export class InMemoryWordProvider {
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
