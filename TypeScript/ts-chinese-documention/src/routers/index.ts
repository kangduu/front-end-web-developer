import { RouterContextType, RouterType } from "./route";

// 首字母大写
function capitalizeTheFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// 设置根目录名称（导航）
function setRootName(name: string): string {
  const splitName: string[] = name.split("-");

  if (splitName.length === 1) {
    return capitalizeTheFirstLetter(splitName[0]);
  }

  const RootName = splitName.reduce((a: string, b: string) => {
    if (a && b) {
      return capitalizeTheFirstLetter(a) + " " + capitalizeTheFirstLetter(b);
    }

    if (a) return capitalizeTheFirstLetter(a);

    return "";
  });

  return RootName;
}

const routes: RouterType[] = [];
const sidebarRoutes: RouterContextType = {};
const RouteContext = require.context("./", true, /(\.route.ts|\.route.js)$/);
RouteContext.keys().forEach((key: string) => {
  // set path
  const KeyMatches = key
    .substring(key.lastIndexOf("/") + 1)
    .replace(/\.\w+/g, "");

  // get component name
  let componentConfig = RouteContext(key);
  let ComponentName = setRootName(KeyMatches);

  sidebarRoutes[ComponentName] = componentConfig.default;
  routes.push(...componentConfig.default);
});

export { sidebarRoutes, routes };
