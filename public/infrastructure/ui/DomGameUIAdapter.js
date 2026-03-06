var DomGameUIAdapter = /** @class */ (function () {
    function DomGameUIAdapter() {
        this.cssByState = {
            RightLetter: "cell-green",
            MisplacedLetter: "cell-orange",
            WrongLetter: "cell-grey",
        };
        // Prioridad: verde > naranja > gris (no degradar una tecla ya mejor coloreada)
        this.statePriority = {
            RightLetter: 3,
            MisplacedLetter: 2,
            WrongLetter: 1,
        };
    }
    DomGameUIAdapter.prototype.getCell = function (turn, position) {
        var row = document.getElementById("row_".concat(turn));
        if (!row)
            throw new Error("Row not found: row_".concat(turn));
        var cell = Array.from(row.children)[position];
        if (!cell)
            throw new Error("Cell not found at row ".concat(turn, ", position ").concat(position));
        return cell;
    };
    DomGameUIAdapter.prototype.setLetter = function (turn, position, letter) {
        this.getCell(turn, position).textContent = letter;
    };
    DomGameUIAdapter.prototype.deleteLetter = function (turn, position) {
        this.getCell(turn, position).textContent = "";
    };
    DomGameUIAdapter.prototype.paintCell = function (turn, position, state) {
        this.getCell(turn, position).classList.add(this.cssByState[state]);
    };
    // ✅ Ahora recibe el estado y solo pinta si el nuevo estado tiene mayor prioridad
    DomGameUIAdapter.prototype.paintKey = function (code, state) {
        var button = Array.from(document.getElementsByClassName("key"))
            .find(function (el) { return el.value === code; });
        if (!button)
            return;
        // Comprobar si ya tiene un color con mayor o igual prioridad
        var currentPriority = this.getCurrentPriority(button);
        var newPriority = this.statePriority[state];
        if (newPriority > currentPriority) {
            // Quitar clases de color anteriores
            button.classList.remove("cell-green", "cell-orange", "cell-grey", "keyPressed");
            // Añadir la nueva clase de color
            button.classList.add(this.cssByState[state]);
        }
    };
    DomGameUIAdapter.prototype.getCurrentPriority = function (button) {
        if (button.classList.contains("cell-green"))
            return this.statePriority["RightLetter"];
        if (button.classList.contains("cell-orange"))
            return this.statePriority["MisplacedLetter"];
        if (button.classList.contains("cell-grey"))
            return this.statePriority["WrongLetter"];
        return 0;
    };
    // ✅ Sacude la fila cuando el usuario pulsa Enter con menos de 5 letras
    DomGameUIAdapter.prototype.shakeRow = function (turn) {
        var row = document.getElementById("row_".concat(turn));
        if (!row)
            return;
        row.classList.add("shake");
        row.addEventListener("animationend", function () {
            row.classList.remove("shake");
        }, { once: true });
    };
    return DomGameUIAdapter;
}());
export { DomGameUIAdapter };
