import React, { Component } from "react";
import G6 from "@antv/g6";
import MockData from "./data";

console.log(MockData);

const ref = React.createRef();

G6.registerNode("card-node", {
  draw: function drawShape(cfg, group) {
    const r = 4;
    const color = "#5B8FF9";
    const w = cfg.size[0];
    const h = cfg.size[1];
    const shape = group.addShape("rect", {
      attrs: {
        x: -w / 2,
        y: -h / 2,
        width: w, //200,
        height: h, // 60
        stroke: color,
        radius: r,
        fill: "#fff",
      },
      name: "main-box",
      draggable: true,
    });

    group.addShape("rect", {
      attrs: {
        x: -w / 2,
        y: -h / 2,
        width: w, //200,
        height: h / 2, // 60
        fill: color,
        radius: [r, r, 0, 0],
      },
      name: "title-box",
      draggable: true,
    });

    // title text
    group.addShape("text", {
      attrs: {
        textBaseline: "top",
        x: -w / 2 + 8,
        y: -h / 2 + 2,
        lineHeight: 20,
        text: cfg.id,
        fill: "#fff",
      },
      name: "title",
    });
    cfg.children &&
      group.addShape("marker", {
        attrs: {
          x: w / 2 + 10,
          y: 0,
          r: 6,
          cursor: "pointer",
          symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
          stroke: "#666",
          lineWidth: 1,
          fill: "#fff",
        },
        name: "collapse-icon",
      });
    group.addShape("text", {
      attrs: {
        textBaseline: "top",
        x: -w / 2 + 8,
        y: -h / 2 + 24,
        lineHeight: 20,
        text: "description",
        fill: "rgba(0,0,0, 1)",
      },
      name: `description`,
    });
    return shape;
  },
  setState(name, value, item) {
    if (name === "collapsed") {
      const marker = item
        .get("group")
        .find((ele) => ele.get("name") === "collapse-icon");
      const icon = value ? G6.Marker.expand : G6.Marker.collapse;
      marker.attr("symbol", icon);
    }
  },
});

G6.registerEdge("card-edge", {});

export default class DemoTree extends Component {
  renderGraph(container) {
    if (!container) return;
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;

    const graph = new G6.TreeGraph({
      container,
      width,
      height,
      modes: {
        default: ["drag-canvas"],
      },
      defaultNode: {
        type: "card-node",
        size: [100, 40],
      },
      defaultEdge: {
        type: "card-edge",
        style: {
          endArrow: true,
        },
      },
      layout: {
        type: "indented",
        direction: "LR",
        dropCap: false,
        indent: 150,
        getHeight: () => {
          return 30;
        },
      },
    });

    graph.data(MockData);
    graph.render();
    graph.fitView();

    graph.on("node:click", (e) => {
      if (e.target.get("name") === "collapse-icon") {
        e.item.getModel().collapsed = !e.item.getModel().collapsed;
        graph.setItemState(e.item, "collapsed", e.item.getModel().collapsed);
        graph.layout();
      }
    });
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
