var InMemoryWordProvider = /** @class */ (function () {
    function InMemoryWordProvider() {
    }
    InMemoryWordProvider.prototype.getRandomWord = function () {
        throw new Error("Method not implemented.");
    };
    InMemoryWordProvider.prototype.goToWin = function () {
        location.assign("/winner");
    };
    InMemoryWordProvider.prototype.goToLose = function () {
        location.assign("/loser");
    };
    return InMemoryWordProvider;
}());
export { InMemoryWordProvider };
