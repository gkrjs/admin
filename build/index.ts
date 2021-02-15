import { StylePlugin } from "./style.plugin";
export * from "./theme";
export const createPlugins = () => [StylePlugin()];
