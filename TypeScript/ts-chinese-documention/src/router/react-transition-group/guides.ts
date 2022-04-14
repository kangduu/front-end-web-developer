import React from "react";
import { RouteType } from "../../types/route";

const Routes: RouteType[] = [
  {
    name: "React Transition Group",
    path: "/handbook",
    component: React.lazy(
      () => import("../../pages/handbook/TheTypeScriptHandbook")
    ),
  },
];

export default Routes;
