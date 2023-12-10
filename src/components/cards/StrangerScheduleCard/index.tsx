import styles    from "./srangerShedule.module.scss";
import trash_btn from "../../../assets/icons/trash-solid.svg";

interface Props {
  id            : string;
  scheduleName  : string;
  owner         : string;
  isPublic      : Boolean;
  removeSchedule: (ev: any) => void;
}

export const StrangerScheduleCard = ({ 
  id,
  scheduleName,
  owner,
  isPublic,
  removeSchedule,
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
            <button onClick={removeSchedule} className={styles.btn_delete}>
              <img className={styles.icon_delete} src={trash_btn} alt="Btn" />
            </button>
          </div>
        </div>
      </a>
    </article>
  )
};