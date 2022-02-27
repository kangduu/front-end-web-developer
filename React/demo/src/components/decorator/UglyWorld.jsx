import React, { Component } from "react";
import { decoratorWithNameHeight } from "../../hoc/index";

@decoratorWithNameHeight(100);
class UglyWorld extends Component {
  render() {
    return <div>bye ugly world my name is {this.props.name}</div>;
  }
}

export default UglyWorld;
