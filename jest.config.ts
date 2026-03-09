import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  transform: {},
  extensionsToTreatAsEsm: [".ts"],
  testMatch: ["**/tests/**/*.test.ts"],
  testPathIgnorePatterns: ["/build/", "/node_modules/"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: "tsconfig.json",
      diagnostics: {
        ignoreCodes: [151002],
      },
    },
  },
};

export default config;
