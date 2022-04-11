import { RouterType } from "./route";

// 首字母大写
function capitalizeTheFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// 设置根目录名称（导航）
function setRootName(name: string): string {
  const splitName: string[] = name.split("-");

  const RootName = splitName.reduce((a: string, b: string) => {
    if (a && b) {
      return capitalizeTheFirstLetter(a) + " " + capitalizeTheFirstLetter(b);
    }

    if (a) capitalizeTheFirstLetter(a);

    return "";
  });

  return RootName;
}
const routes: RouterType[] = [];

const RouteContext = require.context("./", true, /(\.route.ts|\.route.js)$/);
RouteContext.keys().forEach((key: string) => {
  // set path
  const KeyMatches = key
    .substring(key.lastIndexOf("/") + 1)
    .replace(/\.\w+/g, "");

  // get component name
  let componentConfig = RouteContext(key);

  console.log(setRootName(KeyMatches), ":", componentConfig);
  let ComponentName = componentConfig.default?.name;
  if (ComponentName === undefined) {
    // ! 必须使用 export default 方式导出。
    throw new SyntaxError(
      'Page components must be exported using "export default ComponentName" mode.'
    );
  }
  // TODO 自动合并路由，利于维护
});

export default routes;
