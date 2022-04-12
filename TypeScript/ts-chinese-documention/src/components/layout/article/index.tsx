import { FC } from "react";
import { Route } from "react-router-dom";
import { routes } from "../../../routers";
import { RouterType } from "../../../routers/route";
import styles from "./index.module.scss";

const Article: FC<any> = () => {
  return (
    <div className={styles["article-container"]}>
      {routes.map((item: RouterType) => {
        return (
          <Route key={item.path} path={item.path}>
            <item.component />
          </Route>
        );
      })}
    </div>
  );
};
export default Article;
