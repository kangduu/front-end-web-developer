import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import DemoTree from "./g6/index";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <Router> */}
    <DemoTree />
    {/* </Router> */}
  </React.StrictMode>,
  document.getElementById("root")
);
