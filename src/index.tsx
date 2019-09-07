import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { zoomAuth } from "./scripts/zoomAuth/zoomAuth";

async function run() {
  const user = await zoomAuth.getUser();
  console.log("zoom user", user);
  ReactDOM.render(<App />, document.getElementById("root"));
}

run();
