import { FC, MouseEvent } from "react";

import styles from "./scheduleButton.module.scss";

interface ScheduleButtonProps {
  groupTitle: string;
  className?: string;
  _id: string;
  onScheduleButtonClick: (id: string) => void;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const ScheduleButton: FC<ScheduleButtonProps> = ({
  groupTitle,
  className,
  _id,
  onScheduleButtonClick,
  onClick
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onScheduleButtonClick(_id);

    if(onClick) {
      onClick(e)
    }
  };

  return (
    <button onClick={handleClick} className={[styles.button, className].join(' ')}>
      <div className={styles.groupTitle}>{groupTitle}</div>
    </button>
  )
};