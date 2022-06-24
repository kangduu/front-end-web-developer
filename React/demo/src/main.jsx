import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "@routes/nav";
import Pages from "@routes";
import "@styles/index.less";

console.log(ReactDOM.render)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <header className="head">
        <NavBar />
      </header>
      <main className="content">
        <Pages />
      </main>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
