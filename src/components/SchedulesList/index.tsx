import styles        from "./ShedulesList.module.scss";
import settingsImage from "@assets/icons/gear-solid.svg";

interface Props {
  id               : string;
  scheduleName     : string;
  updatedAt        : string;
  handleButtonClick: (ev: any) => void;
}

export const ShedulesList = ({
  id,
  scheduleName,
  updatedAt,
  handleButtonClick
}: Props) => {
  const handleBtnClick = (ev: React.MouseEvent) => {
    ev.preventDefault(); // Preventing links from being followed
    handleButtonClick(ev);
  }

  return (
    <a href={`/s/${id}`} className={styles.scheduleItems}>
      <span className={styles.schedulesText}>{scheduleName}</span>
      <div className={styles.rightItems}>
        <span className={styles.schedulesText}>{updatedAt}</span>
        <button onClick={handleBtnClick}>
          <img className={styles.settingsImage} src={settingsImage} alt="Settings" />
        </button>
      </div>
    </a>
  )
}