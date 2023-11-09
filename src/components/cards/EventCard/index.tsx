import styles from "./eventCard.module.scss";

interface Props {
  _id: string;
  eventName: string;
  eventTime: string;
  eventColor: string;
  btnClick: () => void;
  rowNum: number;
  colNum: number;
}

export const EventCard = ({
  _id,
  eventName,
  eventTime,
  eventColor,
  btnClick,
  rowNum,
  colNum,

}: Props) => {
  let buttonClassName;

  switch (eventColor) {
    case "purple":
      buttonClassName = styles.purpleBtn;
      break;
    case "green":
      buttonClassName = styles.greenBtn;
      break;
    case "yellow":
      buttonClassName = styles.yellowBtn;
      break;
    case "red":
      buttonClassName = styles.redBtn;
      break;
    case "pink":
      buttonClassName = styles.pinkBtn;
      break;
    case "blue":
      buttonClassName = styles.blueBtn;
      break;
    default:
      buttonClassName = styles.defaultBtn;
      break;
  }

  return (
    <article className={styles.event} key={_id}>
      <button className={[styles.eventItems, buttonClassName].join(' ')} onClick={btnClick}>
        <span className={styles.eventText}>{eventName}</span>
        <span className={[styles.eventText, styles.date].join(' ')}>{eventTime}</span>
      </button>
    </article>
  )
}