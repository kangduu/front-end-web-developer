import React from "react";
import { RouteType } from "src/types/route";

const Routes: RouteType[] = [
  {
    name: "Quick Start",
    path: "/handbook",
    component: React.lazy(
      () => import("src/pages/handbook/TheTypeScriptHandbook")
    ),
  },
];

export default Routes;
