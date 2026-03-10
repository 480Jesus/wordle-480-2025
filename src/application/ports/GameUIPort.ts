import type { CellState } from "../../domain/types.js";

export interface GameUIPort {
    setLetter(turn: number, position: number, letter: string): void;
    deleteLetter(turn: number, position: number): void;
    paintCell(turn: number, position: number, state: CellState): void;
    paintKey(code: string, state: CellState): void;
    shakeRow(turn: number): void;
}
