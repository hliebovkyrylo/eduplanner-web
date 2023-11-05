import { useState, useEffect } from "react";
import { HomeMainCard, Settings, ShedulesList } from "../../index";

import styles from "./leftSideBlock.module.scss";

import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { createSchedule, fetchSchedule, fetchUserSchedules, updatePublicStatus } from "../../../redux/slices/schedules";
import { fetchUser } from "../../../redux/slices/user";

export const LeftSideBlock = () => {
  const dispatch = useDispatch<any>();

  // Settings
  const [openSettings, setOpenSettings] = useState(false); // By default the menu is closed
  const [selectedScheduleId, setSelectedScheduleId] = useState(''); 
  const [isPublic, setIsPublic] = useState(false);

  const handleBtnClick = async (id: string) => {
    setOpenSettings(true); // Open the settings panel
    setSelectedScheduleId(id); // Transfer the id of the selected schedule to the variable selectedScheduleId

    const scheduleData = await dispatch(fetchSchedule(id));

    if (scheduleData.payload && scheduleData.payload.isPublic !== undefined) {
      setIsPublic(scheduleData.payload.isPublic);
    }
  }

  const handleCancelClick = () => {
    setOpenSettings(false); // Close the settings panel
    setSelectedScheduleId(''); // Remove the id
  }


  // Getting information of current user
  const { user } = useAuth0(); // Get current logged in user 
  const [currentUser, setCurrentuser] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchUser(user?.sub)); // Looking for the id of the authorized user in the database
      setCurrentuser(data.payload); // If the user has been found, we pass his data to a variable 'currentUser'
    };
  
    fetchData(); // Call this function
  }, [user]);

  // Actions with schedules
  const [userSchedules, setUserSchedules] = useState<any[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        if (currentUser?._id) {
          const data = await dispatch(fetchUserSchedules(currentUser._id));
          const schedules = data.payload;
          setUserSchedules(schedules);
        }
  
      } catch (error) {
        console.error(error);
      }
    };
    fetchSchedules();
  }, [currentUser]);
  
  // Creating schedule
  const navigate = useNavigate();

  const scheduleName = 'New schedule';
  const author = currentUser?._id;

  const onClickCreateSchedule = async () => {
    try {
      const data = await dispatch(createSchedule({
        scheduleName,
        author,
      })) // Route to create a schedule
      
      const _id = data.payload._id; // Getting schedule id to redirecting
      
      navigate(`/schedule/${_id}`); // Redirecting to schedule page

    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDeleteSchedule = () => {};

  const handleChangeAccess = async () => {
    try {
      await dispatch(updatePublicStatus(selectedScheduleId));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.leftSideCards}>
        <HomeMainCard
          name={currentUser?.name || 'User'}
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
            {userSchedules && userSchedules.map((obj) => {
              const date = new Date(obj.createdAt);
              const formattedDate = date.toLocaleDateString();
              return (
                <ShedulesList
                  key={obj._id}
                  scheduleName={obj.scheduleName} 
                  createdAt={formattedDate}
                  _id={obj._id}
                  handleButtonClick={() => handleBtnClick(obj._id)}
                />
              )
            })}
          </div>
        </div>
      </div>
      {openSettings ? (
        <Settings
          key={selectedScheduleId}
          id={selectedScheduleId}
          deleteSchedule={handleDeleteSchedule}
          changeAccess={handleChangeAccess}
          cancelButton={handleCancelClick}
          buttonState={isPublic}
        />
      ) : null}
    </>
  )
}