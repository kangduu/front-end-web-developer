import React, { Component } from "react";
import G6 from "@antv/g6";
import MockData from "./data";

const ref = React.createRef();

G6.registerNode(
  "card-node",
  {
    /**
     * 绘制节点，包含文本
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中的图形对象的容器
     * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
     */
    draw(cfg, group) {
      const rect = group.addShape("rect");

      return rect;
    },
    /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中的图形对象的容器
     */
    afterDraw(cfg, group) {},
    /**
     * 更新节点，包含文本
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    update(cfg, node) {},
    /**
     * 更新节点后的操作，一般同 afterDraw 配合使用
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    afterUpdate(cfg, node) {},
    /**
     * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
     * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {Node} node 节点
     */
    setState(name, value, node) {},
    /**
     * 获取锚点（相关边的连入点）
     * @param  {Object} cfg 节点的配置项
     * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有锚点
     */
    getAnchorPoints(cfg) {},
  },
  "modelRect"
);

G6.registerEdge("card-edge", {});

export default class DemoTree extends Component {
  renderGraph(container) {
    if (!container) return;
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;

    const graph = new G6.Graph({
      container,
      width,
      height,
      fitView: true,
      modes: {
        default: ["drag-canvas"],
      },
      defaultNode: {
        size: [30, 20],
        type: "rect",
        style: {
          lineWidth: 2,
          stroke: "#5B8FF9",
          fill: "#C6E5FF",
        },
      },
      defaultEdge: {
        type: "polyline",
        size: 1,
        color: "#e2e2e2",
        style: {
          endArrow: {
            path: "M 0,0 L 8,4 L 8,-4 Z",
            fill: "#e2e2e2",
          },
          radius: 20,
        },
      },
      layout: {
        type: "dagre",
        rankdir: "LR",
        align: "UL",
        controlPoints: true,
        nodesepFunc: () => 1,
        ranksepFunc: () => 1,
      },
    });

    graph.data(MockData);
    graph.render();
    // graph.fitView();

    // graph.on("node:click", (e) => {
    //   if (e.target.get("name") === "collapse-icon") {
    //     e.item.getModel().collapsed = !e.item.getModel().collapsed;
    //     graph.setItemState(e.item, "collapsed", e.item.getModel().collapsed);
    //     graph.layout();
    //   }
    // });
  }
  componentDidMount() {
    this.renderGraph(ref.current);
  }
  render() {
    return (
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "100vh",
          margin: "0 auto",
        }}
      />
    );
  }
}
