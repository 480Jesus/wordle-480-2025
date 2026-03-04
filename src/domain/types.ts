export type CellState = "RightLetter" | "MisplacedLetter" | "WrongLetter";

export type SubmitOutcome =
    | "continue"
    | "win"
    | "lose"
    | "invalid-length";

export interface SubmitResult {
    outcome: SubmitOutcome;
    states: CellState[] | null;
    submittedGuess: string | null;
}
