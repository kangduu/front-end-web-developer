import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Demo from "../pages/case";
import ReactPage from "../pages/react";

export default class extends Component {
  render() {
    // TODO： fallback 组件
    return (
      <React.Suspense fallback="加载中...">
        <Switch>
          <Route exact path="/">
            <Redirect to="/react" />
          </Route>
          <Route
            path="/case"
            children={(params) => {
              const { match, ...rest } = params;
              console.log(params);
              if (match.isExact) return <Demo {...rest} />;
              return <Redirect to={match.url} />;
            }}
          />
          <Route exact path="/react">
            <ReactPage />
          </Route>
        </Switch>
      </React.Suspense>
    );
  }
}
