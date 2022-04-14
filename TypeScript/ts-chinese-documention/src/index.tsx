import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import setTheme from "./utils/setTheme";
import Home from "./pages/home";
import "./styles/index.css";

setTheme("dark");
const { createRoot } = require("react-dom/client");
const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Switch>
      <Redirect exact from="/" to="app" />
      <Route path="/app">
        <Router basename="/app">
          <Home />
        </Router>
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
