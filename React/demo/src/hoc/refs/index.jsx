import React, { Component } from "react";
import RefsHOC from "./vendor";

class AcquireRef extends Component {
  render() {
    return <div>AcquireRef</div>;
  }
}

export default RefsHOC(AcquireRef);
