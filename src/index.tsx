import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import { App } from "./components/App";
import { themeFactory } from "./theme";
import { localStorageUtils } from "./scripts/utils/localStorageUtils";

export type DarkThemeState = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

const initialDarkTheme = localStorageUtils.getItem("darkTheme") || false;

const AppRoot = () => {
  const darkThemeState = useState(initialDarkTheme);
  const themePaletteType = darkThemeState[0] ? "dark" : "light";

  return (
    <ThemeProvider theme={themeFactory(themePaletteType)}>
      <CssBaseline></CssBaseline>
      <App darkThemeState={darkThemeState} />
    </ThemeProvider>
  );
};

ReactDOM.render(<AppRoot />, document.getElementById("root"));
