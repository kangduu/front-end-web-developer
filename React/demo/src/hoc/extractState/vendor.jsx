import React, { Component } from "react";

export default function (WrapComponent) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        value: 0,
      };
      this.changeValue = this.changeValue.bind(this);
    }

    changeValue(value) {
      this.setState({ value });
    }

    render() {
      return (
        <WrapComponent
          {...this.props}
          {...this.state}
          changeValue={this.changeValue}
        />
      );
    }
  };
}
