var DomKeyboardInputAdapter = /** @class */ (function () {
    function DomKeyboardInputAdapter() {
        this.cssByState = {
            RightLetter: "cell-green",
            MisplacedLetter: "cell-orange",
            WrongLetter: "cell-grey",
        };
    }
    DomKeyboardInputAdapter.prototype.getCell = function (turn, position) {
        var row = document.getElementById("row_".concat(turn));
        if (!row)
            throw new Error("Row not found: row_".concat(turn));
        var cell = Array.from(row.children)[position];
        if (!cell)
            throw new Error("Cell not found at row ".concat(turn, ", position ").concat(position));
        return cell;
    };
    DomKeyboardInputAdapter.prototype.setLetter = function (turn, position, letter) {
        this.getCell(turn, position).textContent = letter;
    };
    DomKeyboardInputAdapter.prototype.deleteLetter = function (turn, position) {
        this.getCell(turn, position).textContent = "";
    };
    DomKeyboardInputAdapter.prototype.paintCell = function (turn, position, state) {
        this.getCell(turn, position).classList.add(this.cssByState[state]);
    };
    DomKeyboardInputAdapter.prototype.paintKey = function (code) {
        if (code === "Enter" || code === "Backspace")
            return;
        var button = Array.from(document.getElementsByClassName("key"))
            .find(function (el) { return el.value === code; });
        if (button)
            button.classList.add("keyPressed");
    };
    return DomKeyboardInputAdapter;
}());
export { DomKeyboardInputAdapter };
