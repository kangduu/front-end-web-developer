import React, { FC } from "react";
import { Switch } from "react-router-dom";
import Article from "./article";
import SideBar from "./sidebar/index";
import styles from "./layout.module.scss";

const App: FC = () => {
  return (
    <main className={styles["container"]}>
      <nav className={styles["sidebar"]}>
        <SideBar />
      </nav>
      <Switch>
        <section className={styles["content"]}>
          <React.Suspense fallback={<div>loading ...</div>}>
            <Article />
          </React.Suspense>
        </section>
      </Switch>
    </main>
  );
};
export default App;
