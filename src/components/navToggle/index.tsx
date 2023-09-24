import styles from "./navToggle.module.scss";

export const NavToggle = () => {
  const isAuth = false;

  return (
    <div className={styles.menu}>
      <input type="checkbox" id={styles.check} />
      <label htmlFor={styles.check} className={styles.button}>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </label>
      {isAuth ? (
        <nav>
          <a className={styles.a} href="/">Home</a>
          <a className={styles.a} href="/users/me">My profile</a>
          <a className={styles.a} href="/users/update">Edit profile</a>
          <a className={styles.a} href="/projects/create">Create project</a>
        </nav>
      ) : (
        <nav>
          <a className={styles.a} href="/auth/login">Login</a>
          <a className={styles.a} href="/auth/register">Sign Up</a>
        </nav>
      )}       
    </div>	
  )
};