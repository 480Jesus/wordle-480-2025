/**
 * Configuración de Jest para TypeScript.
 * Esta configuración permite ejecutar tests en archivos .ts.
 * Para ejecutar los tests: npm test
 * Para extender: añade más archivos .test.ts en la carpeta tests/
 */
export default {
  // Preset para TypeScript
  preset: 'ts-jest',
  // Entorno de ejecución: Node.js
  testEnvironment: 'node',
  // Tratar los archivos .ts como ESM para coincidir con el proyecto
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  // Patrón de archivos de test
  testMatch: ['**/tests/**/*.test.ts'],
  // Transformar archivos .ts con ts-jest
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  // Módulos que no deben ser transformados (nativos de Node)
  transformIgnorePatterns: [
    'node_modules/(?!(supertest)/)',
  ],
};