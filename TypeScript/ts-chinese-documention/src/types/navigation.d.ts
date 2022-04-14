import { ReactComponentElement } from "react";
import { RouteType } from "./route";

export type SideItemType = {
  name: string;
  children?: RouteType[];
};

export type NavigationType = {
  name: string;
  children: SideItemType[];
  icon?: ReactComponentElement;
  order?: number;
};
