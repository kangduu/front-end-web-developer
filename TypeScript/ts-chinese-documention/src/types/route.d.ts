import React from "react";

export type RouteType = {
  name: string;
  path: string;
  component: React.LazyExoticComponent<any>;
  children?: RouteType[];
};
