import styles from "./home.module.scss";

import { Topbar, LeftSideBlock, RightSideBlock } from "../../components/index";

export const Home = () => {
  return (
    <main className={styles.mainContainer}>
      <Topbar 
        pageName={"Home"}
      />
      <section className={styles.mainSection}>
        <LeftSideBlock />

        <RightSideBlock />
      </section>
    </main>
  )
}