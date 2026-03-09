import type { RandomWordPort } from "../../application/ports/RandomWordPort.js";

export class InMemoryWordProvider implements RandomWordPort{

    constructor (private readonly words: string[]) {}

    private currentWord: string | null = null;

    async getRandomWord(): Promise<string> {
        if (this.currentWord) return this.currentWord;

        if (this.words.length === 0){
            throw new Error("No words available")
        }
        const index = Math.floor(Math.random() * this.words.length);
        this.currentWord = this.words[index];
        return this.currentWord;
    }

    resetWord(): void {
        this.currentWord = null;
    }
}
