import React from "react";

export type RouterType = {
  name: string;
  path: string;
  component: React.LazyExoticComponent<any>;
};
