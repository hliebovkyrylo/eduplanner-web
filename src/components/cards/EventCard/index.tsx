import { lighten } from "polished";
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

// HEX to RGB conversion
function hexToRgb(hex: string) {
  // Remove the # symbol
  hex = hex.replace(/^#/, '');

  // Split the string into three parts (R, G, B)
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`; // Return color in rgb format
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
  const rgbColor = hexToRgb(eventColor); // Conversion current color
  const brighterTextColor = eventColor ? lighten(0.35, rgbColor) : undefined; // Set the text color lighter than the background background

  return (
    <article className={styles.event} key={_id}>
      <button style={{ backgroundColor: eventColor }} className={styles.eventItems} onClick={btnClick}>
        <span style={{ color: brighterTextColor }} className={styles.eventText}>{eventName}</span>
        <span style={{ color: brighterTextColor }} className={[styles.eventText, styles.date].join(' ')}>{eventTime}</span>
      </button>
    </article>
  )
}