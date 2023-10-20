import { useState } from "react";
import { HomeMainCard, Settings, ShedulesList } from "../../index";

import styles from "./leftSideBlock.module.scss";

export const LeftSideBlock = () => {
  const onClickCreateSchedule = () => {};

  // Settings
  const [openSettings, setOpenSettings] = useState(false); // By default the menu is closed

  const handleBtnClick = (ev: any) => { // When the button was pressed the settings menu opens/closes
    ev.preventDefault();

    setOpenSettings(!openSettings);
  }

  // Actions with schedules
  const handleDeleteSchedule = () => {};

  const handleChangeAccess = () => {};

  return (
    <>
      <div className={styles.leftSideCards}>
        <HomeMainCard
          name="sdf"
          clickBtn={onClickCreateSchedule} 
        />
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
      {openSettings ? (
        <Settings
          id="dsfsdf"
          deleteSchedule={handleDeleteSchedule}
          changeAccess={handleChangeAccess}
          cancelButton={handleBtnClick}
        />
      ) : null}
    </>
  )
}