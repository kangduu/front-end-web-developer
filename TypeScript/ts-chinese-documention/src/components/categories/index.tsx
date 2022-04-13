import React, { FC, RefObject } from "react";
import "./style.scss";

const list = [
  {
    label: "React Transition Group",
    key: "nav-react",
    path: "/react",
  },
  {
    label: "TypeScript",
    key: "nav-ts",
    path: "/ts",
  },
];

const Categories: FC<any> = (props: any) => {
  const [order, setOrder] = React.useState(0);

  const handleClick = React.useCallback((e) => {
    const node = e.target;
    if (node.tagName.toLowerCase() === "li") {
      const { index, path } = node.dataset;
      setOrder(Number(index));
      //   history.push(path);
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
      {list.map(({ label, key, path }, index) => (
        <li
          key={key}
          data-index={index}
          data-path={path}
          className={order === index ? "active" : ""}
        >
          {label}
        </li>
      ))}
      <div className="line" ref={lineRef} />
    </ul>
  );
};
export default Categories;
