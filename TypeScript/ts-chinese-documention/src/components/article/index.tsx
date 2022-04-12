import { FC } from "react";
import { Route } from "react-router-dom";
import { routes } from "../../routers";
import { RouterType } from "../../routers/route";

const Article: FC<any> = () => {
  return (
    <>
      {routes.map((item: RouterType) => {
        return (
          <Route key={item.path} path={item.path}>
            <item.component />
          </Route>
        );
      })}
    </>
  );
};
export default Article;
