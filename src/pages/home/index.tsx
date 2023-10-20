import styles from "./home.module.scss";

import { HomeTopbar, LeftSideBlock, RightSideBlock } from "../../components/index";

export const Home = () => {
  return (
    <main className={styles.mainContainer}>
      <HomeTopbar />
      <section className={styles.mainSection}>
        <LeftSideBlock />

        <RightSideBlock />
      </section>
    </main>
  )
}