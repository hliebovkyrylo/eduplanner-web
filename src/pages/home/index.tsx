import styles     from "./home.module.scss";
import { Topbar } from "../../components/index";
import { 
  LeftSideBlock, 
  RightSideBlock 
}                 from "../../components/blocks/index";
import { auth }   from "@hocs/auth";

export const Home = auth(() => {
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
});