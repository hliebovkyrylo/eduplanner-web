import styles from "./srangerShedule.module.scss";

interface Props {
  id: string;
  scheduleName: string;
  owner: string;
  isPublic: Boolean;
}

export const StrangerScheduleCard = ({ 
  id,
  scheduleName,
  owner,
  isPublic,
}: Props) => {
  return (
    <article className={styles.strangerScheduleCard}>
      <a href={`/s/${id}`}>
        <div className={styles.scheduleCardItems}>
          <div className={styles.scheduleCardInfo}>
            <span>{scheduleName}</span>
            <span className={styles.scheduleCardTextAbout}><span className={[styles.isPublicDot, !isPublic && styles.isPublicDotRed].join(' ')}></span> Owner: <span className={styles.scheduleCardText}>{owner}</span></span>
          </div>
          <div className={styles.dots}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>
      </a>
    </article>
  )
};