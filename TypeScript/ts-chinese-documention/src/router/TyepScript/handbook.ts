import React from "react";
import { RouteType } from "../../types/route";

const BasePath = "/ts/handbook";
const Routes: RouteType[] = [
  {
    name: "The TypeScript Handbook",
    path: BasePath,
    component: React.lazy(
      () => import("../../pages/handbook/TheTypeScriptHandbook")
    ),
  },
];

export default Routes;
