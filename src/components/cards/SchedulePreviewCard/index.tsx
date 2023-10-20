import styles from "./schedulePreview.module.scss";

interface Props {
  id: string;
  scheduleImage: string;
}

export const SchedulePreviewCard = ({ 
  id, 
  scheduleImage 
}: Props) => {
  return (
    <div className={styles.imgItem}>
      <a href={`/schedules/${id}`}>
        <img className={styles.recentlyImage} src={scheduleImage} alt="" />
      </a>
    </div>
  )
};