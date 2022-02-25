import React from "react";
import "./index.less";

const TagsList = [
  { name: "JavaScript", color: "#ffca28" },
  { name: "HTML&CSS", color: "#fc490b" },
  { name: "React", color: "#61dafb" },
  { name: "TypeScript", color: "#0288d1" },
  { name: "Algorithm", color: "#36cfc9" },
  { name: "Browser", color: "#f759ab" },
  { name: "HTTP", color: "#95de64" },
  { name: "Node", color: "#ffca28" },
  { name: "WeChat", color: "#0e932e" },
];

export default function Home() {
  return (
    <ul className="home">
      {TagsList.map(({ name, color }) => {
        return (
          <li key={name} style={{ backgroundColor: color }}>
            {name}
          </li>
        );
      })}
      <li>Other</li>
    </ul>
  );
}
