import { describe, it, expect } from "@jest/globals";
import { WordEvaluator } from "../src/domain/WordEvaluator";

describe("WordEvaluator.evaluate()", () => {
  it("marca todas las letras como correctas si guess === answer", () => {
    const evaluator = new WordEvaluator();
    const result = evaluator.evaluate("CASA", "CASA");
    expect(result.every((l) => l === "RightLetter")).toBe(true);
  });

  it("marca letras presentes pero en posicion incorrecta", () => {
    const evaluator = new WordEvaluator();
    const result = evaluator.evaluate("CASA", "SACA");
    expect(result).toContain("MisplacedLetter");
  });
});
