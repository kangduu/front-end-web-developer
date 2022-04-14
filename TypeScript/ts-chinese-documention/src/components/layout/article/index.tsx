import { FC } from "react";
import { Route } from "react-router-dom";
import { routes } from "src/router";
import { RouteType } from "src/types/route";
import styles from "./index.module.scss";

const Article: FC<any> = () => {
  return (
    <div className={styles["article-container"]}>
      {routes.map((item: RouteType) => {
        return (
          <Route exact key={item.path} path={item.path}>
            <item.component />
          </Route>
        );
      })}
    </div>
  );
};
export default Article;
