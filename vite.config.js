import { defineConfig } from "vite";
import VitePluginWasm from "vite-plugin-wasm";

export default defineConfig({
  base: process.env.REPO_NAME || "/",
  plugins: [VitePluginWasm()],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  build: {
    target: "esnext",
  },
  worker: {
    format: "esm",
    plugins: [VitePluginWasm()],
  },
});
