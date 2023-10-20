import styles from "./rightSideBlock.module.scss";

import { SchedulePreviewCard } from "../../index";

export const RightSideBlock = () => {
  return (
    <div className={styles.rightSideCard}>
      <div className={styles.recentlyText}>Recently updated</div>
      {[...Array(3)].map(() => (
        <SchedulePreviewCard 
          id="sdfsd"
          scheduleImage="https://www.custodyxchange.com/images/topics/schedules/50-50/2-2-5-5-calendar.png"
        />
      ))}
    </div>
  )
}