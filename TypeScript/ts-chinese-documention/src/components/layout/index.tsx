import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Article from "./article";
import SideBar from "./sidebar/index";
import styles from "./layout.module.scss";

const App: FC<any> = () => {
  return (
    <main className={styles["container"]}>
      <Router forceRefresh>
        <nav className={styles["sidebar"]}>
          <SideBar />
        </nav>
        <section className={styles["content"]}>
          <Article />
        </section>
      </Router>
    </main>
  );
};
export default App;
