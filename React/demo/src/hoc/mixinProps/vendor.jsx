import React from "react";

export default function (WrapComponent) {
  return class extends React.Component {
    state = {
      uuid: "123",
    };
    componentDidMount() {
      console.log("HigherOrderComponent Mount");
    }
    render() {
      return <WrapComponent {...this.props} {...this.state} />;
    }
  };
}
