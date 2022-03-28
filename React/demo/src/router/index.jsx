import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Demo from "../pages/case";

export default class extends Component {
  render() {
    return (
      <React.Suspense>
        <Switch>
          <Route exact path="/">
            <Redirect to="/react" />
          </Route>
          <Route path="/case">
            <Switch>
              <Route strict from="/case" path="/case" component={Demo} />
            </Switch>
          </Route>
          <Route path="/react">React</Route>
        </Switch>
      </React.Suspense>
    );
  }
}
