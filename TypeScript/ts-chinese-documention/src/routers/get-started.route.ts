import React from "react";
import { RouterType } from "./route";

const Routes: RouterType[] = [
  {
    name: "TS for the New Programmer",
    path: "/started/programmer",
    component: React.lazy(() => import("../pages/TsForTheNewProgrammer")),
  },
];

export default Routes;
