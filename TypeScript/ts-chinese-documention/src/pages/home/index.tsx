import { FC } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Categories from "src/pages/home/categories";
import styles from "./style.module.scss";

const Home: FC<any> = (props) => {
  return (
    <main className={styles.app}>
      <nav className={styles.sidebar}>
        <Link to="/ts">TS</Link>
      </nav>
      <section className={styles.content}>
        <header className={styles.head}>
          <div className={styles.categories}>
            <Categories />
          </div>
          <p className={styles["descript-text"]}>Front-end Development</p>
        </header>
        <div className={styles.article}></div>
      </section>
    </main>
  );
};

export default withRouter(Home);
