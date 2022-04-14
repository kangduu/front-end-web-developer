import { RouteType } from "src/types/route";
import { NavigationType } from "src/types/navigation";

// header classify
const HeaderRoutes: NavigationType[] = [];

const RouteContext = require.context("./", true, /(\.route.ts|\.route.js)$/);
const keys = RouteContext.keys();

// switch routes
const routes: RouteType[] = [];
function setRoutes(item: RouteType) {
  if (item && Array.isArray(item.children)) {
    item.children.forEach((child: RouteType) => {
      routes.push(child);
    });
  }
}

for (let index = 0; index < keys.length; index++) {
  const key = keys[index];
  const KeyMatches = key.substring(key.indexOf("/") + 1).replace(/\.\w+/g, "");
  if (KeyMatches.indexOf("/") === -1) continue;

  let category = RouteContext(key)?.default;
  if (category && Array.isArray(category.children)) {
    category.children.forEach((item: RouteType) => {
      setRoutes(item);
    });
    HeaderRoutes.push(category);
  }
}

console.log(routes, HeaderRoutes);

export { HeaderRoutes, routes };
