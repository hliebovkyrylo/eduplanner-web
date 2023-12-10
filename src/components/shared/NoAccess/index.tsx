import styles from "./noaccess.module.scss";
import lock   from "@icons/lock-solid.svg";

export const NoAccess = () => {
  return (
    <main className={styles.noAccess}>
      <div className={styles.noAccessItems}>
        <img className={styles.noAccessImage} src={lock} alt="Lock" />
        <p className={styles.noAccessText}>This is private schedule</p>
      </div>
    </main>
  )
}