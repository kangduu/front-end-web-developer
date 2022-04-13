import React from "react";
import { RouterType } from "../route";

const Routes: RouterType[] = [
  {
    name: "The TypeScript Handbook",
    path: "/handbook",
    component: React.lazy(
      () => import("../../pages/handbook/TheTypeScriptHandbook")
    ),
  },
];

export default Routes;
