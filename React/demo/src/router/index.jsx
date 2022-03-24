import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

export default class index extends Component {
  render() {
    return (
      <React.Suspense>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/list">
            <Table />
          </Route>
        </Switch>
      </React.Suspense>
    );
  }
}
