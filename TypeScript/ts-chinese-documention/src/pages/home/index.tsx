import React, { FC } from "react";
import { withRouter } from "react-router";
import Categories from "../../components/categories";
import styles from "./style.module.scss";

const Home: FC<any> = () => {
  return (
    <main className={styles.app}>
      <nav className={styles.sidebar}></nav>
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
