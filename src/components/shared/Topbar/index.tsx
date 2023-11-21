import { useState, useEffect } from "react";

import styles from "./topbar.module.scss";
import userPhoto from "@icons/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
import logoutPhoto from "@icons/arrow-right-from-bracket-solid.svg";

import { useAuth0 } from "@auth0/auth0-react";
import { fetchUser } from "../../../redux/slices/user";
import { useDispatch } from "react-redux";
import { animated, useSpring } from "react-spring";

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

  //
  const { logout, isAuthenticated } = useAuth0();
  const [showItems, setShowItems] = useState(false);

  const fadeIn = useSpring({ // Animation for elements to appear
    opacity: showItems ? 1 : 0,
    from: { opacity: 0 },
  });

  const handleAvatarClick = () => {
    if (isAuthenticated) {
      setShowItems(!showItems);
    }
  }

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
          <span className={styles.date}>{date.toLocaleDateString()}, {date.toLocaleTimeString()}</span>
          <button onClick={handleAvatarClick}>
            <img className={styles.userPhoto} src={currentUser?.image || userPhoto} alt="User Photo" />
          </button>
        </div>

        {showItems && (
          <animated.div style={fadeIn} className={styles.dropBtn}>
            <div className={styles.dropBtnItems}>
              <button onClick={() => logout({ logoutParams: { returnTo: 'http://localhost:5173/' } })} className={styles.dropBtnItem}><img className={styles.dropBtnIcon} src={logoutPhoto} alt="" /> Logout</button>
            </div>
          </animated.div>
        )}
      </nav>
    </header>
  )
};