import React from "react";
import { RouterType } from "./route";

const Routes: RouterType[] = [
  {
    name: "TS for the New Programmer",
    path: "/started/new",
    component: React.lazy(
      () => import("../pages/get-started/TsForTheNewProgrammer")
    ),
  },
  {
    name: "TypeScript for JS Programmers",
    path: "/started/js",
    component: React.lazy(
      () => import("../pages/get-started/TsForJavaScriptProgrammers")
    ),
  },
  {
    name: "TS for Java/C# Programmers",
    path: "/started/java",
    component: React.lazy(
      () => import("../pages/get-started/TsForJavaProgrammers")
    ),
  },
  {
    name: "TS for Functional Programmers",
    path: "/started/fn",
    component: React.lazy(
      () => import("../pages/get-started/TsForFunctionalProgrammers")
    ),
  },
  {
    name: "TypeScript Tooling in 5 minutes",
    path: "/started/five",
    component: React.lazy(
      () => import("../pages/get-started/TsToolingInFiveMinutes")
    ),
  },
];

export default Routes;
