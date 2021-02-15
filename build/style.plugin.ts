import styleImport from "vite-plugin-style-import";

export const StylePlugin = () =>
  styleImport({
    libs: [
      {
        libraryName: "antd",
        esModule: true,
        resolveStyle: (name) => {
          return `antd/es/${name}/style/index`;
        },
      },
    ],
  });
