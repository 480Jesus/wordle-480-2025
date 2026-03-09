/**
 * Test unitario para la clase WordEvaluator.
 * Ejemplo de cómo probar lógica de negocio.
 * Para ejecutar: npm test
 * Para añadir más tests unitarios: importa la clase y escribe describe/it
 */
const { WordEvaluator: WordEval } = require('../src/domain/WordEvaluator');

describe('WordEvaluator', () => {
  let evaluator: any;

  beforeEach(() => {
    evaluator = new WordEval();
  });

  it('should evaluate guess correctly for exact match', () => {
    const result = evaluator.evaluate('apple', 'apple');
    expect(result).toEqual(['RightLetter', 'RightLetter', 'RightLetter', 'RightLetter', 'RightLetter']);
  });

  it('should evaluate guess correctly for no matches', () => {
    const result = evaluator.evaluate('apple', 'grape');
    expect(result).toEqual(['WrongLetter', 'WrongLetter', 'MisplacedLetter', 'MisplacedLetter', 'RightLetter']);
  });

  it('should evaluate guess correctly for misplaced letters', () => {
    const result = evaluator.evaluate('apple', 'peach');
    expect(result).toEqual(['MisplacedLetter', 'MisplacedLetter', 'MisplacedLetter', 'WrongLetter', 'WrongLetter']);
  });
});