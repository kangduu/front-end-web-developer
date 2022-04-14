import React, { FC, RefObject } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { HeaderRoutes } from "src/router";
import "./style.scss";

const Categories: FC<any> = (props) => {
  let history = useHistory();
  console.log(history, useLocation());
  const [order, setOrder] = React.useState(0);

  const handleClick = React.useCallback((e) => {
    const node = e.target;
    if (node.tagName.toLowerCase() === "li") {
      const { index } = node.dataset;
      setOrder(Number(index));
    }
  }, []);

  // order改变完成渲染后
  const lineRef: RefObject<HTMLDivElement> = React.useRef(null);
  const ulRef: RefObject<HTMLUListElement> = React.useRef(null);
  React.useLayoutEffect(() => {
    const { children } = ulRef.current || {};
    const line = lineRef.current;
    if (children && line) {
      const _children = Array.from(children).filter(
        (node) => node.tagName.toLowerCase() === "li"
      );
      const target: any = _children[order];
      line.style.left = target.offsetLeft + "px";
      line.style.width = target.offsetWidth + "px";
    }
  }, [order]);

  return (
    <ul ref={ulRef} id="nav" onClick={handleClick}>
      {HeaderRoutes.map(({ name }, index) => (
        <li
          key={name}
          data-index={index} // 标记当前点击的是哪个
          className={order === index ? "active" : ""}
        >
          {name}
        </li>
      ))}
      <div className="line" ref={lineRef} />
    </ul>
  );
};
export default Categories;
