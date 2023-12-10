import { useState, useEffect } from "react";
import styles                  from "./topbar.module.scss";
import userPhoto               from "@icons/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
import logoutPhoto             from "@icons/arrow-right-from-bracket-solid.svg";
import { animated, useSpring } from "react-spring";
import { useGetUserQuery }     from "@redux/api/userAPI";
import { IUser }               from "@typings/user";
import { useSignOutMutation }  from "@redux/api/authAPI";

export const Topbar = ({ pageName }: {pageName: string}) => {
  const { data: user } = useGetUserQuery();
  const userMe         = user as IUser;
  const [signOut]      = useSignOutMutation();

  // Getting current date
  let [date, setDate] = useState(new Date());
    
  useEffect(() => {
    let timer = setInterval(()=>setDate(new Date()), 1000 )
    return function cleanup() {
      clearInterval(timer)
    }
  }, []);

  const [showItems, setShowItems] = useState(false);

  const fadeIn = useSpring({ // Animation for elements to appear
    opacity: showItems ? 1 : 0,
    from: { opacity: 0 },
  });

  const handleAvatarClick = () => {
    setShowItems(!showItems);
  };

  const onClickSignOut = () => {
    signOut();
    window.location.reload();
  }

  return (
    <header className={styles.header}>
      <nav className={styles.header_items}>
        <h2>{pageName}</h2>
        <div className={styles.navFlex}>
          <span className={styles.date}>{date.toLocaleDateString()}, {date.toLocaleTimeString()}</span>
          <button onClick={handleAvatarClick}>
            <img className={styles.userPhoto} src={userMe?.image || userPhoto} alt="User Photo" />
          </button>
        </div>

        {showItems && (
          <animated.div style={fadeIn} className={styles.dropBtn}>
            <div className={styles.dropBtnItems}>
              <button onClick={onClickSignOut} className={styles.dropBtnItem}><img className={styles.dropBtnIcon} src={logoutPhoto} alt="" /> Logout</button>
            </div>
          </animated.div>
        )}
      </nav>
    </header>
  )
};