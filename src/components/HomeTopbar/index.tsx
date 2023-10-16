import { useState, useEffect } from "react";

import styles from "./HomeTopbar.module.scss";
import userPhoto from "../../assets/icons/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

export const HomeTopbar = () => {
  // getting current date
  let [date,setDate] = useState(new Date());
    
  useEffect(() => {
    let timer = setInterval(()=>setDate(new Date()), 1000 )
    return function cleanup() {
      clearInterval(timer)
    }
  });

  return (
    <header className={styles.header}>
      <nav className={styles.header_items}>
        <h2>Home</h2>
        <div className={styles.navFlex}>
          <span className={styles.date}>{date.toLocaleDateString()}</span>
          <img className={styles.userPhoto} src={userPhoto} alt="User Photo" />
        </div>
      </nav>
    </header>
  )
};