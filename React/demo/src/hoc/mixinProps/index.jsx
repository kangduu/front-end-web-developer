import React, { Component } from "react";
import MixinProps from "./vendor.jsx";

// class 组件
// class MixinPropsHOC extends Component {
//   componentDidMount() {
//     console.log("MixinPropsHOC Mount");
//   }
//   render() {
//     return <div>Demo : {this.props.uuid}</div>;
//   }
// }

// hook
function MixinPropsHOC(props) {
  const { uuid } = props;

  // React.useEffect(() => {
  //   console.log("MixinPropsHOC HOOK Mount");
  // }, []);

  // 注意与 useEffect 的区别，执行时机不同
  React.useLayoutEffect(() => {
    console.log("WrappedComponentOfHook Mount");
  }, []);

  return <div>MixinPropsHOC : {uuid}</div>;
}

export default MixinProps(MixinPropsHOC);
