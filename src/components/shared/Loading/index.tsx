import styles from "./loading.module.scss";

export const Loading = () => {
  return (
    <main className={styles.loadingElem}>
      <div className={styles.loading} />
    </main>
  )
}