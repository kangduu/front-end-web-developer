import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import App from "./components/layout";
import Home from "./pages/home";

import "./styles/index.css";

const { createRoot } = require("react-dom/client");
const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/404">
        <div>404</div>
      </Route>
    </Switch>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
