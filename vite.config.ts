import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  publicDir: "public",
  base: "./",         // era esto!!!!
  build: {
    outDir: "dist",
  },
});
