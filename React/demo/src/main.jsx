import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./router/NavBar";
import "./index.less";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <header id="head">
        <NavBar />
      </header>
      <main id="content"></main>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
