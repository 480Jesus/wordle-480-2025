// Shared primitive types used across the domain

export type CellState = "RightLetter" | "MisplacedLetter" | "WrongLetter";

export type SubmitOutcome =
  | "invalid-length"
  | "win"
  | "lose"
  | "continue";

export interface SubmitResult {
  outcome: SubmitOutcome;
  states: CellState[] | null;
  submittedGuess: string | null;
}
