import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

const zoomAuthQueryParams = `response_type=code&client_id=HqnmSZ3VTuWHG7X4DuEh9A&redirect_uri=${window.location.href}`;

window.open(`https://zoom.us/oauth/authorize?${zoomAuthQueryParams}`, "_self");

ReactDOM.render(<App />, document.getElementById("root"));
