export type CellState = "RightLetter" | "MisplacedLetter" | "WrongLetter";

export type SubmitOutcome =
    |"continue"
    |"win"
    |"lose"
    |"invalid-lenghth";

export interface SubmitResult {
    outcome: SubmitOutcome;
    states: CellState[] | null;
    submittedGuess: string | null;
}
