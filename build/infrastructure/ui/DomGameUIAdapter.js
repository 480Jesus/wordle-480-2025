export class DomGameUIAdapter {
    constructor() {
        this.cssByState = {
            RightLetter: "cell-green",
            MisplacedLetter: "cell-orange",
            WrongLetter: "cell-grey",
        };
        this.statePriority = {
            RightLetter: 3,
            MisplacedLetter: 2,
            WrongLetter: 1,
        };
    }
    getCell(turn, position) {
        const row = document.getElementById(`row_${turn}`);
        if (!row)
            throw new Error(`Row not found: row_${turn}`);
        const cell = Array.from(row.children)[position];
        if (!cell)
            throw new Error(`Cell not found at row ${turn}, position ${position}`);
        return cell;
    }
    setLetter(turn, position, letter) {
        this.getCell(turn, position).textContent = letter;
    }
    deleteLetter(turn, position) {
        this.getCell(turn, position).textContent = "";
    }
    paintCell(turn, position, state) {
        this.getCell(turn, position).classList.add(this.cssByState[state]);
    }
    paintKey(code, state) {
        const button = Array.from(document.getElementsByClassName("key"))
            .find((el) => el.value === code);
        if (!button)
            return;
        const currentPriority = this.getCurrentPriority(button);
        const newPriority = this.statePriority[state];
        if (newPriority > currentPriority) {
            button.classList.remove("cell-green", "cell-orange", "cell-grey", "keyPressed");
            button.classList.add(this.cssByState[state]);
        }
    }
    getCurrentPriority(button) {
        if (button.classList.contains("cell-green"))
            return this.statePriority["RightLetter"];
        if (button.classList.contains("cell-orange"))
            return this.statePriority["MisplacedLetter"];
        if (button.classList.contains("cell-grey"))
            return this.statePriority["WrongLetter"];
        return 0;
    }
    shakeRow(turn) {
        const row = document.getElementById(`row_${turn}`);
        if (!row)
            return;
        row.classList.add("shake");
        row.addEventListener("animationend", () => {
            row.classList.remove("shake");
        }, { once: true });
    }
}
