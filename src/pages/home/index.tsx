import { useEffect, useState } from "react";
import axios from "../../axios";

import styles from "./home.module.scss";
import homeImage from "../../assets/otherImages/Group 11.png";

import { HomeTopbar, ShedulesList, Settings } from "../../components/index";
import { useNavigate, useParams } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // get user info
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios.get('/auth/me')
    .then(res => setUser(res.data))
    .catch(error => console.log(error))
  }, []);

  if (!user) {
    navigate('/');
  }

  // create schedule
  const onClickCreateSchedule = () => {
    navigate(`/schedule/${id}`);
  };

  // settings
  const [openSettings, setOpenSettings] = useState(false);

  const handleBtnClick = (ev: any) => {
    ev.preventDefault();

    setOpenSettings(!openSettings);
  }

  // delete schedule
  const handleDeleteSchedule = () => {}

  // change access
  const handleChangeAccess = () => {}

  return (
    <main className={styles.mainContainer}>
      <HomeTopbar />
      <section className={styles.mainSection}>
        <div className={styles.leftSideCards}>
          <div className={styles.mainCard}>
            <div>
              <h2>Home Page</h2>
              <h1 className={styles.userNameIncription}>{`Hello User`}</h1>
              <button onClick={onClickCreateSchedule} className={styles.createBtn}>Create Schedule</button>
            </div>
            <img className={styles.homeImage} src={homeImage} alt="Home image" />
          </div>
          <div className={styles.schedulesCard}>
            <h3>Schedules</h3>
            <div className={styles.schedulesHead}>
              <span className={styles.scheduleHeadText}>Schedule name</span>
              <div className={styles.rightSideHeadtext}>
                <span className={styles.scheduleHeadText}>Created at</span>
                <span className={[styles.scheduleHeadText, styles.lastHeadText].join(' ')}>Settings</span>
              </div>
              <span className={[styles.scheduleHeadText, styles.visibleOnPhones].join(' ')}>Settings</span>
            </div>
            <div className={styles.userSchedules}>
              {[...Array(2)].map(() => {
                return (
                  <ShedulesList
                    key={'obj._id'}
                    scheduleName={'obj.groupName'} 
                    createdAt={'15.10.2023'}
                    _id={'obj._id'}
                    handleButtonClick={handleBtnClick}
                  />
                )
              })}
            </div>
          </div>
        </div>
        <div className={styles.rightSideCard}>
          <div className={styles.recentlyText}>Recently updated</div>
          {[...Array(3)].map(() => (
            <div className={styles.imgItem}>
              <a href="#">
                <img className={styles.recentlyImage} src="https://www.custodyxchange.com/images/topics/schedules/50-50/2-2-5-5-calendar.png" alt="" />
              </a>
            </div>
          ))}
        </div>
        {openSettings ? (
          <Settings
            id="dsfsdf"
            deleteSchedule={handleDeleteSchedule}
            changeAccess={handleChangeAccess}
            cancelButton={handleBtnClick}
          />
        ) : null}
      </section>
    </main>
  )
}