import React, { Component } from "react";
import G6 from "@antv/g6";
import MockData from "./data";

const ref = React.createRef();

const color = "#198efa";

G6.registerNode(
  "card-node",
  {
    options: {
      style: {
        fill: "red",
      },
      stateStyles: {
        hover: {
          stroke: "#198efa",
        },
        selected: {},
      },
    },
    /**
     * 绘制节点，包含文本
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中的图形对象的容器
     * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
     */
    draw(cfg, group) {
      //   debugger;
      const r = 4;
      const w = cfg.size[0];
      const h = cfg.size[1];

      const rectShape = group.addShape("rect", {
        attrs: {
          x: -w / 2,
          y: -h / 2,
          width: w,
          height: h,
          radius: r,
          stroke: "transparent",
          fill: "#ffffff",
          shadowOffsetX: 0,
          shadowOffsetY: 5,
          shadowColor: "rgba(21, 21, 21, 0.07)",
          shadowBlur: 40,
        },
        name: "rect-shape",
        draggable: true,
      });

      group.addShape("marker", {
        attrs: {
          x: w / 2 + 14,
          y: 0,
          r: 8,
          cursor: "pointer",
          symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
          lineWidth: 1,
          stroke: "#fff",
          fill: "#cccccc",
          shadowOffsetX: 0,
          shadowOffsetY: 5,
          shadowColor: "rgba(21, 21, 21, 0.07)",
          shadowBlur: 40,
        },
        name: "collapse-icon",
      });

      if (cfg.label) {
        // 如果有文本
        // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
        // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
        // style.text = cfg.label;
        const label = group.addShape("text", {
          // attrs: style
          attrs: {
            x: 0, // 居中
            y: 0,
            textAlign: "center",
            textBaseline: "middle",
            text: cfg.label,
            fill: "#666",
          },
          // must be assigned in G6 3.3 and later versions. it can be any value you want
          name: "text-shape",
          // 设置 draggable 以允许响应鼠标的图拽事件
          draggable: true,
        });
      }

      return rectShape;
    },
    /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中的图形对象的容器
     */
    // afterDraw(cfg, group) {},
    /**
     * 更新节点，包含文本
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    // update(cfg, node) {},
    /**
     * 更新节点后的操作，一般同 afterDraw 配合使用
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    // afterUpdate(cfg, node) {},
    /**
     * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
     * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {Node} node 节点
     */
    setState(name, value, item) {
      const group = item.getContainer();
      const shape = group.get("children")[0]; // 顺序根据 draw 时确定
      if (name === "running") {
        if (value) {
          shape.attr("stroke", color);
        } else {
          shape.attr("stroke", "transparent");
        }
      }
      if (name === "collapsed") {
        const marker = item
          .get("group")
          .find((ele) => ele.get("name") === "collapse-icon");
        const icon = value ? G6.Marker.expand : G6.Marker.collapse;
        marker.attr("symbol", icon);
      }
    },
    /**
     * 获取锚点（相关边的连入点）
     * @param  {Object} cfg 节点的配置项
     * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有锚点
     */
    // getAnchorPoints(cfg) {},
  }
  // 继承内置节点类型的名字，例如基类 'single-node'，或 'circle', 'rect' 等
  // 当不指定该参数则代表不继承任何内置节点类型
  //   "modelRect"
);

G6.registerEdge("card-edge", {}, "polyline");

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
      fitCenter: true,
      fitViewPadding: 40,
      modes: {
        default: ["drag-canvas", "zoom-canvas"],
      },
      defaultNode: {
        size: [212, 95],
        type: "card-node",
        anchorPoints: [
          [1, 0.5],
          [0, 0.5],
        ],
      },
      defaultEdge: {
        // type: "card-edge",
        size: 1,
        color: "#e78686",
        style: {
          endArrow: {
            path: "M 0,0 L 8,4 L 8,-4 Z",
            fill: "#e78686",
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

    graph.on("node:click", (e) => {
      const node = e.item;

      if (e.target.get("name") === "collapse-icon") {
        console.log(node.getModel());
        // TODO  收起展开
        node.getModel().collapsed = !node.getModel().collapsed;
        graph.setItemState(node, "collapsed", node.getModel().collapsed);
        graph.layout();
      }
    });

    // 鼠标移动到上面 running，移出结束
    // graph.on("node:mouseenter", (e) => {
    //   const node = e.item;
    //   graph.setItemState(node, "running", true);
    // });

    // graph.on("node:mouseleave", (e) => {
    //   const node = e.item;
    //   graph.setItemState(node, "running", false);
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
