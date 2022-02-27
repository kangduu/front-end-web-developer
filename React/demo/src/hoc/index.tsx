import React, { Component } from "react";

interface State {
  name: String;
}

export const decoratorWithNameHeight = (height?: number) => {
  return (WrappedComponent: any) => {
    return class extends Component<any, State> {
      public state: State = {
        name: "",
      };

      componentWillMount() {
        let username = localStorage.getItem("myName");
        this.setState({
          name: username || "",
        });
      }

      render() {
        return (
          <div>
            <WrappedComponent name={this.state.name} {...this.props} />
            <p>身高为 {height || 0}</p>
          </div>
        );
      }
    };
  };
};
