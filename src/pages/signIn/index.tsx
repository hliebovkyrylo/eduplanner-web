import { useState } from "react";

import styles from "./signIn.module.scss";
import eye_slash from "../../assets/icons/eye-slash-solid.svg";
import eye from "../../assets/icons/eye-solid.svg";

export const LoginPage = () => {
  const [type, setType] = useState('password');

  const [icon, setIcon] = useState(eye_slash);

  const togglePassInput = () => {
    if (type === 'password') {
      setType('text');
      setIcon(eye);
    } else {
      setType('password');
      setIcon(eye_slash);
    }
  };

  return (
    <section className={styles.loginPage}>
      <form className={styles.loginForm}>
        <h1>Sign in</h1>
        <div>
          <input placeholder="Enter your email" className={styles.input} type="email" />
        </div>
        <div className={styles.inputs}>
          <input placeholder="Enter your password" className={styles.input} type={type} />
          <input onClick={togglePassInput} className={styles.checkbox} id="checkbox" type="checkbox" />
          <label className={styles.checkboxBtn} htmlFor="checkbox"><img className={styles.imgaye} src={icon} alt={""} /></label>
        </div>
        <button className={styles.btn} type="submit">Sign in</button>
        <a className={styles.href} href="#">Don't have an account? Sign up</a>
      </form>
    </section>
  )
};