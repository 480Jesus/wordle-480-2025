import { GameUIPort } from "../../application/ports/GameUIPort";
import { CellState } from "../../domain/types";


export class DomKeyboardInputAdapter implements GameUIPort {

    private readonly cssByState: Record<CellState, string> = {
        RightLetter: "cell-green",
        MisplacedLetter: "cell-orange",
        WrongLetter: "cell-grey",
    };

    private getCell(turn: number, position: number): HTMLElement {
        const row = document.getElementById(`row_${turn}`);
        if (!row) throw new Error(`Row not found: row_${turn}`);
        const cell = (Array.from(row.children) as HTMLElement[])[position];
        if (!cell) throw new Error(`Cell not found at row ${turn}, position ${position}`);
        return cell;
    }

    setLetter(turn: number, position: number, letter: string): void {
        this.getCell(turn, position).textContent = letter;
    }
    deleteLetter(turn: number, position: number): void {
        this.getCell(turn, position).textContent = "";
    }
    paintCell(turn: number, position: number, state: CellState): void {
        this.getCell(turn, position).classList.add(this.cssByState[state])
    }
    paintKey(code: string): void {
        if (code === "Enter" || code === "Backspace") return;
        const button = Array.from(document.getElementsByClassName("key"))
            .find((el) => (el as HTMLButtonElement).value === code) as HTMLButtonElement | undefined;
        if (button) button.classList.add("keyPressed");
    }
}


