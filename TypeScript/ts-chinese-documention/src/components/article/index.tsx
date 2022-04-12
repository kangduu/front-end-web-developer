import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "../../routers";
import { RouterType } from "../../routers/route";

const Article: FC<any> = (props: any) => {
  console.log(routes);
  return (
    <section>
      <Routes>
        {routes.map((item: RouterType) => (
          <Route path={item.path} element={item.component}></Route>
        ))}
      </Routes>
    </section>
  );
};
export default Article;
