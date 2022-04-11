import React from "react";
import reportWebVitals from "./reportWebVitals";

import {} from "./routers";

import "./styles/reset.css";
import "./styles/index.css";

const { createRoot } = require("react-dom/client");
const root = createRoot(document.getElementById("root"));
root.render(<React.StrictMode></React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
