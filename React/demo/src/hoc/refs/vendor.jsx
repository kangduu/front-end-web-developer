import React, { Component } from "react";

export default function (WrappedComponent) {
  class WithSubscription extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithSubscription.displayName = "refs";

  return WithSubscription;
}
