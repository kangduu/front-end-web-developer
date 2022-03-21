import React, { Component } from "react";
import G6 from "@antv/g6";
import MockData from "./data";

const ref = React.createRef();

const color = "#198efa";

G6.registerNode(
  "card-node",
  {
    // ! 这个options，可以在那些生命周期获取，可用来zuoshenm？
    // options: {
    //   style: {
    //     fill: "red",
    //   },
    //   stateStyles: {
    //     hover: {
    //       stroke: "#198efa",
    //     },
    //     selected: {},
    //   },
    // },

    /**
     * 绘制节点，包含文本
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中的图形对象的容器
     * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
     */
    draw(cfg, group) {
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

      cfg.children &&
        group.addShape("marker", {
          attrs: {
            x: w / 2 + 15,
            y: 0,
            r: 10,
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
    getAnchorPoints(cfg) {
      // console.log("getAnchorPoints", cfg);
      // 设置锚点（很多锚点怎么实现？） ： https://g6.antv.vision/zh/docs/manual/middle/elements/nodes/anchorpoint

      // const points = new Array(8)
      //   .fill(0)
      //   .map((item, index) => [item, ((index + 1) / 15).toFixed(0)]);
      // return [...points, [1, 0.5]];

      return [
        [0, 0.1],
        [0, 0.3],
        [0, 0.5],
        [0, 0.7],
        [0, 0.9],
        [1, 0.5],
      ];
    },
  }
  // 继承内置节点类型的名字，例如基类 'single-node'，或 'circle', 'rect' 等
  // 当不指定该参数则代表不继承任何内置节点类型
  //   "modelRect"
);

// path direction
function getDirection({ startPoint, endPoint }) {
  if (startPoint && endPoint) {
    let direction = 1;
    const { x: sx } = startPoint,
      { x: ex } = endPoint;
    console.log(sx, ex);

    if (sx > ex) direction = -1;

    return direction;
  }
  return 0;
}

function getEdgeColor(cfg) {
  // edge color
  const EdgeColor = "#e78686";
  const EdgeHighlightColor = "#ff4d4f";

  // inverse edge color
  const EdgeInverseColor = "#82d4b6";
  const EdgeHighlightInverseColor = "#43f2b2";

  const direction = getDirection(cfg);

  const color =
    direction > 0
      ? {
          color: EdgeColor,
          highlightColor: EdgeHighlightColor,
          endArrow: {
            path: G6.Arrow.triangle(15, 11, 0),
            fill: EdgeColor,
            d: 0,
          },
          endArrowHighlight: {
            path: G6.Arrow.triangle(15, 11, 0),
            fill: EdgeHighlightColor,
            d: 0,
          },
        }
      : {
          color: EdgeInverseColor,
          highlightColor: EdgeHighlightInverseColor,
          endArrow: {
            path: G6.Arrow.triangle(15, 11, 0),
            fill: EdgeInverseColor,
            d: 0,
          },
          endArrowHighlight: {
            path: G6.Arrow.triangle(15, 11, 0),
            fill: EdgeHighlightInverseColor,
            d: 0,
          },
        };

  return color;
}

function customEdge(cfg) {
  const { startPoint, endPoint, sourceNode } = cfg;

  const direction = getDirection(cfg),
    sDistance = 60 * direction,
    eDistance = 50 * direction;

  const { x: sx, y: sy } = startPoint,
    { x: ex, y: ey } = endPoint;

  const path = ((parents, dir, sd, ed) => {
    // 起始节点若无父节点，不显示marker，则 M 起点不一样
    let sIndent, eIndet;

    if (dir > 0) {
      sIndent = (Array.isArray(parents) && parents.length > 0 ? 35 : 15) * dir;
      eIndet = 20 * dir;
    } else {
      sIndent = (Array.isArray(parents) && parents.length > 0 ? 15 : 35) * dir;
      eIndet = 70 * dir;
    }

    let path = [
      ["M", sx + sIndent, sy],
      ["L", sx + sd, sy],
      ["L", sx + sd, ey],
      ["L", ex - eIndet, ey],
    ];
    if (sx === ex)
      path = [
        ["M", sx + sIndent, sy],
        ["L", ex - ed, ey],
      ];

    return path;
  })(sourceNode.getModel().parents, direction, sDistance, eDistance);

  return path;
}
G6.registerEdge(
  "card-edge",
  {
    draw(cfg, graph) {
      const { color } = getEdgeColor(cfg);
      const keyShape = graph.addShape("path", {
        attrs: {
          startArrow: null,
          endArrow: {
            path: G6.Arrow.triangle(10, 10, 0),
            fill: color,
            radius: true,
            d: 0,
          },
          path: customEdge(cfg),
          stroke: color,
          lineWidth: 2,
          lineAppendWidth: 2,
        },
        name: "path-shape",
      });

      return keyShape;
    },
  }
  // "polyline"
);

export default class DemoTree extends Component {
  // 【折叠】点击 marker 触发
  indentGraph = (e) => {
    try {
      const graph = this.graph;
      const node = e.item;
      const { collapsed, x } = node.getModel();

      // e.item.getOutEdges 显示修改
      const outEdges = node.getOutEdges();
      outEdges.forEach((edge) => {
        // 必须先设置 visible
        edge.changeVisibility(!collapsed);
      });

      // 目标节点和其左侧的祖先节点
      const ancestorAtLeft = node.getNeighbors("source").filter((item) => {
        const { x: ix } = item.getModel();
        return ix < x;
      });

      // collapsed 为 true 的时候隐藏 ， 反之则反
      const descendantNode = ((sons, ancestor, self, collapsed) => {
        try {
          const hasHideInEdges = (edges) =>
            edges.every((edge) => !edge.isVisible());

          const getSons = (data, parent, collapsed) => {
            if (collapsed) {
              return data.filter((item) => {
                // if (parent.getModel().x < item.getModel().x) return true;
                const outEdges = item.getOutEdges();
                const inEdges = item.getInEdges();
                return (
                  (Array.isArray(outEdges) && outEdges.length === 0) ||
                  hasHideInEdges(inEdges)
                );
              });
            }
            return data;
          };

          const nodes = [];
          const toggleNodes = getSons(sons, self, collapsed);
          let son = toggleNodes.shift();
          ancestor.push(self);

          while (son) {
            const { id, x } = son.getModel();
            if (ancestor.some(({ x: ix, id: _id }) => id === id || ix < x)) {
              son = toggleNodes.shift();
              continue;
            }
            ancestor.push(son);

            // 必须先设置 visible
            son.getOutEdges().forEach((edge) => {
              edge.changeVisibility(!collapsed);
            });

            nodes.push(son);

            const targets = son.getNeighbors("target");
            if (Array.isArray(targets) && targets.length > 0) {
              const subNodes = getSons(targets, son, collapsed);
              toggleNodes.push(...subNodes);
            }

            son = toggleNodes.shift();
          }
          return nodes;
        } catch (error) {
          console.log(error);
        }
      })(node.getNeighbors("target"), ancestorAtLeft, node, collapsed);

      descendantNode.forEach((item) => {
        item.changeVisibility(!collapsed);
      });
      graph.layout();
      // node.updatePosition({ x, y });
    } catch (error) {
      console.log("indent error", error);
    }
  };

  renderGraph(container) {
    if (!container) return;
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;

    const graph = new G6.Graph({
      container,
      width,
      height,
      fitView: false,
      fitCenter: true,
      fitViewPadding: 40,
      modes: {
        default: ["drag-canvas", "zoom-canvas"],
      },
      defaultNode: {
        size: [212, 95],
        type: "card-node",
        // anchorPoints: [
        //   [1, 0.5],
        //   [0, 0.5],
        // ],
      },
      defaultEdge: {
        type: "card-edge",
        // size: 1,
        // color: "#e78686",
        // style: {
        //   endArrow: {
        //     path: "M 0,0 L 8,4 L 8,-4 Z",
        //     fill: "#e78686",
        //   },
        //   radius: 20,
        // },
      },
      layout: {
        type: "dagre",
        rankdir: "LR",
        align: "UL",
        controlPoints: true,
        nodesepFunc: () => 10,
        ranksepFunc: () => 140,
      },
    });

    graph.read(MockData);

    this.graph = graph;

    graph.getEdges().forEach((edge) => {
      if (edge) {
        const direction = getDirection(edge.getModel());
        edge.update({ direction });
      }
    });

    graph.on("node:click", (e) => {
      const node = e.item;

      if (e.target.get("name") === "collapse-icon") {
        node.getModel().collapsed = !node.getModel().collapsed;
        graph.setItemState(node, "collapsed", node.getModel().collapsed);
        graph.layout();

        // 折叠
        this.indentGraph(e);
      }
    });

    // 鼠标移动到上面 running，移出结束
    graph.on("node:mouseenter", (e) => {
      const node = e.item;
      if (e.target.get("name") === "rect-shape") {
        graph.setItemState(node, "running", true);
      }
    });

    graph.on("node:mouseleave", (e) => {
      const node = e.item;
      graph.setItemState(node, "running", false);
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
