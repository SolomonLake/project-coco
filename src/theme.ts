import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import { PaletteType } from "@material-ui/core";

export const themePalette = {
  primary: {
    main: "#556cd6",
  },
  secondary: {
    main: "#19857b",
  },
  error: {
    main: red.A400,
  },
};

export const themePaletteBackground = {
  light: "#fafafa",
  dark: "#303030",
};

// A custom theme for this app
export const themeFactory = (paletteType: PaletteType) => {
  return createMuiTheme({
    palette: {
      type: paletteType,
      ...themePalette,
      background: {
        default:
          paletteType === "light"
            ? themePaletteBackground.light
            : themePaletteBackground.dark,
      },
    },
  });
};
