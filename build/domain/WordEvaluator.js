var WordEvaluator = /** @class */ (function () {
    function WordEvaluator() {
    }
    WordEvaluator.prototype.evaluate = function (target, guess) {
        var _a, _b;
        var result = new Array(guess.length).fill("wrongLetter");
        var remaining = new Map();
        // Marcar aciertos exactos y cuenta las letras sobrantes de target
        for (var i = 0; i < target.length; i++) {
            if (guess[i] === target[i]) {
                result[i] = "RightLetter";
            }
            else {
                var ch = target[i];
                remaining.set(ch, ((_a = remaining.get(ch)) !== null && _a !== void 0 ? _a : 0) + 1);
            }
        }
        //Marcar cuando estan descolocadas si esa letra esta en target
        for (var i = 0; i < guess.length; i++) {
            if (result[i] === "RightLetter")
                continue;
            var ch = guess[i];
            var count = (_b = remaining.get(ch)) !== null && _b !== void 0 ? _b : 0;
            if (count > 0) {
                result[i] = "MisplacedLetter";
                remaining.set(ch, count - 1);
            }
        }
        return result;
    };
    return WordEvaluator;
}());
export { WordEvaluator };
