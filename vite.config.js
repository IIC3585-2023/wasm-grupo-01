import { defineConfig } from "vite";
import VitePluginWasm from "vite-plugin-wasm";

export default defineConfig({
  base: process.env.REPO_NAME || "/",
  plugins: [VitePluginWasm()],
});
