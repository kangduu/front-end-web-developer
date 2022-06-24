import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Spin } from "antd";
import Demo from "../pages/case";
import ReactPage from "../pages/react";
export default class CaRouter extends Component {
  render() {
    console.log(this.props.children);
    return (
      <React.Suspense fallback={<Spin spinning={true} />}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/react" />
          </Route>
          <Route
            path="/case"
            children={(params) => {
              const { match, ...rest } = params;
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
