import { GameUIPort } from "../../application/ports/GameUIPort";
import { CellState } from "../../domain/types";

export class DomGameUIAdapter implements GameUIPort {

    private readonly cssByState: Record<CellState, string> = {
        RightLetter: "cell-green",
        MisplacedLetter: "cell-orange",
        WrongLetter: "cell-grey",
    };

    // Prioridad: verde > naranja > gris (no degradar una tecla ya mejor coloreada)
    private readonly statePriority: Record<CellState, number> = {
        RightLetter: 3,
        MisplacedLetter: 2,
        WrongLetter: 1,
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
        this.getCell(turn, position).classList.add(this.cssByState[state]);
    }

    // ✅ Ahora recibe el estado y solo pinta si el nuevo estado tiene mayor prioridad
    paintKey(code: string, state: CellState): void {
        const button = Array.from(document.getElementsByClassName("key"))
            .find((el) => (el as HTMLButtonElement).value === code) as HTMLButtonElement | undefined;

        if (!button) return;

        // Comprobar si ya tiene un color con mayor o igual prioridad
        const currentPriority = this.getCurrentPriority(button);
        const newPriority = this.statePriority[state];

        if (newPriority > currentPriority) {
            // Quitar clases de color anteriores
            button.classList.remove("cell-green", "cell-orange", "cell-grey", "keyPressed");
            // Añadir la nueva clase de color
            button.classList.add(this.cssByState[state]);
        }
    }

    private getCurrentPriority(button: HTMLButtonElement): number {
        if (button.classList.contains("cell-green")) return this.statePriority["RightLetter"];
        if (button.classList.contains("cell-orange")) return this.statePriority["MisplacedLetter"];
        if (button.classList.contains("cell-grey")) return this.statePriority["WrongLetter"];
        return 0;
    }

    // ✅ Sacude la fila cuando el usuario pulsa Enter con menos de 5 letras
    shakeRow(turn: number): void {
        const row = document.getElementById(`row_${turn}`);
        if (!row) return;
        row.classList.add("shake");
        row.addEventListener("animationend", () => {
            row.classList.remove("shake");
        }, { once: true });
    }
}