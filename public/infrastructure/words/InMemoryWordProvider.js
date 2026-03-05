var InMemoryWordProvider = /** @class */ (function () {
    function InMemoryWordProvider(words) {
        this.words = words;
    }
    InMemoryWordProvider.prototype.getRandomWord = function () {
        if (this.words.length === 0) {
            throw new Error("No words available");
        }
        var index = Math.floor(Math.random() * this.words.length);
        //Math.floor convierte en un entero válido desde 0 hasta lenght -1.
        //Math.random() da un numero aleatorio.
        //* this.words.length multiplica la longitud de la palabra.
        //si this.words.length = 3
        //Math.random() te da un 0.72
        //0.72 * 3= 2.16
        //Math-floor(2.16)
        //index= 2
        return this.words[index];
    };
    return InMemoryWordProvider;
}());
export { InMemoryWordProvider };
