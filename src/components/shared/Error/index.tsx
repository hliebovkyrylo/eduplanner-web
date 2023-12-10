import styles from "./error.module.scss";
import xmark  from "@assets/icons/circle-exclamation-solid.svg";

export const Error = ({ errorText }: { errorText: string }) => {
  return (
    <article className={styles.error}>
      <img className={styles.errorImage} src={xmark} alt="xmark" />
      <p className={styles.errorText}>{errorText}</p>
    </article>
  )
}