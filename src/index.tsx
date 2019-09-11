import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import "typeface-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { config } from "./environments/config";

fetch(config().CLOUD_FUNCTION_ENDPOINT + `/firestoreDb`);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline></CssBaseline>
    <App />
  </ThemeProvider>,
  document.getElementById("root"),
);
