import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import path from "path";
import { generateModifyVars, createPlugins } from "./build";
// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    "/@": path.resolve(__dirname, "src"),
    "~antd": "antd",
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: {
        //   // reference:  Avoid repeated references
        //   hack: `true; @import (reference) "${path.resolve(
        //     "src/styles/antd/index.less"
        //   )}";`,
        //   ...generateModifyVars(),
        // },
        javascriptEnabled: true,
      },
    },
  },
  plugins: [reactRefresh(), ...createPlugins()],
});
