import React from "react";
import { RouteType } from "../../types/route";

const BasePath = "/ts/start";
const Routes: RouteType[] = [
  {
    name: "TS for the New Programmer",
    path: BasePath,
    component: React.lazy(
      () => import("../../pages/get-started/TsForTheNewProgrammer")
    ),
  },
  {
    name: "TypeScript for JS Programmers",
    path: BasePath + "/js",
    component: React.lazy(
      () => import("../../pages/get-started/TsForJavaScriptProgrammers")
    ),
  },
  {
    name: "TS for Java/C# Programmers",
    path: BasePath + "/java",
    component: React.lazy(
      () => import("../../pages/get-started/TsForJavaProgrammers")
    ),
  },
  {
    name: "TS for Functional Programmers",
    path: BasePath + "/fn",
    component: React.lazy(
      () => import("../../pages/get-started/TsForFunctionalProgrammers")
    ),
  },
  {
    name: "TypeScript Tooling in 5 minutes",
    path: BasePath + "/five",
    component: React.lazy(
      () => import("../../pages/get-started/TsToolingInFiveMinutes")
    ),
  },
];

export default Routes;
