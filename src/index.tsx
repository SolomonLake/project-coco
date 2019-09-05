import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { getUrlParam } from "./utils/windowUtils";
import { zoomAuth } from "./js/zoomAuth/zoomAuth";

async function run() {
  await zoomAuth.initialize();
  const user = await zoomAuth.getUser();
  ReactDOM.render(<App />, document.getElementById("root"));
}

run();
