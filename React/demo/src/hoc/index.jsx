import React from "react";
import ExtractStateHOC from "./extractState";
import ViewValue from "./extractState/ViewValue";
import MixinPropsHOC from "./mixinProps";

export default function HOC() {
  return (
    <ul>
      <h3>高阶组件</h3>

      <h4>强化props</h4>
      <li>
        混入props模式：
        <MixinPropsHOC />
      </li>

      <li>
        抽离state控制渲染：
        <ExtractStateHOC />
        <ViewValue />
      </li>

      <h4>控制渲染</h4>
      <li>动态渲染：</li>
      <li>分片渲染：</li>
      <li>异步组件（懒加载）：</li>
      <li>动态渲染：</li>
      <li>动态渲染：</li>
    </ul>
  );
}
