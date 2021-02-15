import { generate } from "@ant-design/colors";

export const primaryColor = "#0084f4";

export const themeMode = "light";

export type ThemeMode = "dark" | "light";

type Fn = (...arg: any) => any;

export interface GenerateColorsParams {
  mixLighten: Fn;
  mixDarken: Fn;
  tinycolor: any;
  color?: string;
}

export function generateAntColors(color: string, mode: ThemeMode) {
  return generate(color, {
    theme: mode == "dark" ? "dark" : "default",
  });
}

export function getThemeColors(color?: string, theme?: ThemeMode) {
  const tc = color || primaryColor;
  const tm = theme || themeMode;
  const colors = generateAntColors(tc, tm);
  const primary = colors[5];
  const modeColors = generateAntColors(
    primary,
    tm === "dark" ? "light" : "dark"
  );

  return [...colors, ...modeColors];
}

export function generateColors({
  color = primaryColor,
  mixLighten,
  mixDarken,
  tinycolor,
}: GenerateColorsParams) {
  const arr = new Array(19).fill(0);
  const lightens = arr.map((_, i) => {
    return mixLighten(color, i / 5);
  });

  const darkens = arr.map((_, i) => {
    return mixDarken(color, i / 5);
  });

  const alphaColors = arr.map((_, i) => {
    return tinycolor(color)
      .setAlpha(i / 20)
      .toRgbString();
  });

  const tinycolorLightens = arr
    .map((_, i) => {
      return tinycolor(color)
        .lighten(i * 5)
        .toHexString();
    })
    .filter((item) => item !== "#ffffff");

  const tinycolorDarkens = arr
    .map((_, i) => {
      return tinycolor(color)
        .darken(i * 5)
        .toHexString();
    })
    .filter((item) => item !== "#000000");
  return [
    ...lightens,
    ...darkens,
    ...alphaColors,
    ...tinycolorDarkens,
    ...tinycolorLightens,
  ];
}

/**
 * less global variable
 */
export function generateModifyVars() {
  const palettes = generateAntColors(primaryColor, themeMode);
  const primary = palettes[5];

  const primaryColorObj: Record<string, string> = {};

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index}`] = palettes[index];
  }

  return {
    "primary-color": primary,
    ...primaryColorObj,
    "info-color": primary,
    "alert-info-bg-color": palettes[0],
    "alert-info-border-color": palettes[2],
    "processing-color": primary,
    "success-color": "#55D187", //  Success color
    "error-color": "#ED6F6F", //  False color
    "warning-color": "#EFBD47", //   Warning color
    "disabled-color": "rgba(0, 0, 0, 0.25)", //  Failure color
    "heading-color": "rgba(0, 0, 0, 0.85)", //  Title color
    "text-color": "rgba(0, 0, 0, 0.85)", //  Main text color
    "text-color-secondary ": "rgba(0, 0, 0, 0.45)", // Subtext color
    "font-size-base": "14px", //  Main font size
    "box-shadow-base": "0 2px 8px rgba(0, 0, 0, 0.15)", //  Floating shadow
    "border-color-base": "#d9d9d9", //  Border color,
    "border-radius-base": "2px", //  Component/float fillet
    "link-color": primary, //   Link color
  };
}
