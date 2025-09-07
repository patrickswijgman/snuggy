import dts from "unplugin-dts/rolldown";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
  },
  plugins: [dts({ bundleTypes: true })],
});
