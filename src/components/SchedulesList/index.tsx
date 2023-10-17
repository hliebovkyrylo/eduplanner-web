import styles from "./ShedulesList.module.scss";

import settingsImage from "../../assets/icons/gear-solid.svg";

interface Props {
  _id: string;
  scheduleName: string;
  createdAt: string;
  handleButtonClick: (ev: any) => void;
}

export const ShedulesList = ({
  _id,
  scheduleName,
  createdAt,
  handleButtonClick
}: Props) => {
  return (
    <a href={`/shedule/${_id}`} className={styles.scheduleItems}>
      <span className={styles.schedulesText}>{scheduleName}</span>
      <div className={styles.rightItems}>
        <span className={styles.schedulesText}>{createdAt}</span>
        <button onClick={handleButtonClick}>
          <img className={styles.settingsImage} src={settingsImage} alt="Settings" />
        </button>
      </div>
    </a>
  )
}