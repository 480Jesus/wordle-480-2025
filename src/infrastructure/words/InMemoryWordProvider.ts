import { RandomWordPort } from "../../application/ports/RandomWordPort";

export class InMemoryWordProvider implements RandomWordPort{
    constructor (private readonly words: string[]) {}

    getRandomWord(): string {
        if (this.words.length === 0){
            throw new Error("No words available")
        }
        const index = Math.floor(Math.random() * this.words.length);
        return this.words[index]
    }
}