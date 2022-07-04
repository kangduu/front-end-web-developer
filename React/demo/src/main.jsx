import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "@components/ErrorBoundary";
import NavBar from "@routes/nav";
import Pages from "@routes";
import "@styles/index.less";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        {/* <header className="head">
          <NavBar />
        </header>
        <main className="content">
      </main> */}
        <Pages />
      </Router>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
