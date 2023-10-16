import styles from "./ShedulesList.module.scss";

import settingsImage from "../../assets/icons/gear-solid.svg";

interface Props {
  scheduleName: string;
  createdAt: string;
  href: string;
}

export const ShedulesList = ({
  scheduleName,
  createdAt,
  href,
}: Props) => {
  const handleButtonClick = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
  };

  return (
    <a href={href} className={styles.scheduleItems}>
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