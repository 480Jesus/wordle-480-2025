import { RandomWordPort } from "../../application/ports/RandomWordPort";

export class InMemoryWordProvider implements RandomWordPort{
    constructor (private readonly words: string[]) {}

    getRandomWord(): string {
        if (this.words.length === 0){
            throw new Error("No words available")
        }
        const index = Math.floor(Math.random() * this.words.length);

        //Math.floor convierte en un entero válido desde 0 hasta lenght -1.
        //Math.random() da un numero aleatorio.
        //* this.words.length multiplica la longitud de la palabra.


        //si this.words.length = 3
        //Math.random() te da un 0.72
        //0.72 * 3= 2.16
        //Math-floor(2.16)

        //index= 2

        return this.words[index]
    }
}