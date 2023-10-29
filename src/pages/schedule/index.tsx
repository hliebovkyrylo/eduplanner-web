import { Topbar } from "../../components/index";
import { scheduleHead } from "../../constants";

import styles from "./schedule.module.scss";

export const Schedule = () => {
  return (
    <main>
      <div className={styles.container}>
        <Topbar
          pageName={"New schedule"} 
        />

        <section className={styles.scheduleInner}>
          <div className={styles.scheduleHead}>
            {scheduleHead.map((day) => (
              <span className={styles.day}>{day.value}</span>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}