import React, { Component } from "react";
import "./nav.less";

const list = [
  "React",
  "Angular",
  "Vue.js",
  "Webpack",
  "Node.js",
  "Typescript",
  "Demo",
];

export default function () {
  const [order, setOrder] = React.useState(0);
  const handleClick = React.useCallback((e) => {
    const node = e.target;
    if (node.tagName.toLowerCase() === "li") {
      const { index } = node.dataset;
      setOrder(Number(index));
    }
  });

  // order改变完成渲染后
  const lineRef = React.useRef(null);
  const ulRef = React.useRef(null);
  React.useLayoutEffect(() => {
    const { children } = ulRef.current || {};
    const line = lineRef.current;
    if (children && line) {
      const _children = Array.from(children).filter(
        (node) => node.tagName.toLowerCase() === "li"
      );
      const target = _children[order];
      line.style.left = target.offsetLeft + "px";
      line.style.width = target.offsetWidth + "px";
    }
  }, [order]);

  return (
    <>
      <ul ref={ulRef} id="nav" onClick={handleClick}>
        {list.map((item, index) => (
          <li
            key={item}
            data-index={index}
            className={order === index ? "active" : ""}
          >
            {item}
          </li>
        ))}
        <div className="line" ref={lineRef} />
        <div className="profile">
          <span>Duk</span>
        </div>
      </ul>
    </>
  );
}
