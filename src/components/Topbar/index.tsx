import { useState, useEffect } from "react";

import styles from "./topbar.module.scss";
import userPhoto from "../../assets/icons/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

import { useAuth0 } from "@auth0/auth0-react";
import { fetchUser } from "../../redux/slices/user";
import { useDispatch } from "react-redux";

export const Topbar = ({ pageName }: {pageName: string}) => {
  const dispatch = useDispatch<any>();

  // Getting current date
  let [date, setDate] = useState(new Date());
    
  useEffect(() => {
    let timer = setInterval(()=>setDate(new Date()), 1000 )
    return function cleanup() {
      clearInterval(timer)
    }
  }, []);

  // Getting information of current user
  const { user } = useAuth0(); // Get current logged in user 
  const [currentUser, setCurrentuser] = useState<any>();

  useEffect(() => {
    if (user?.sub) {
      dispatch(fetchUser(user?.sub)).then((us: any) => {
        setCurrentuser(us.payload);
      })
    }
  }, [user])

  return (
    <header className={styles.header}>
      <nav className={styles.header_items}>
        <h2>{pageName}</h2>
        <div className={styles.navFlex}>
          <span className={styles.date}>{date.toLocaleDateString()}</span>
          <img className={styles.userPhoto} src={currentUser?.image || userPhoto} alt="User Photo" />
        </div>
      </nav>
    </header>
  )
};