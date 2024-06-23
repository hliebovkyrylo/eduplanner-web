import { 
  useState, 
  useEffect, 
  useCallback 
}                              from "react";
import { 
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
  useGetAllUserSchedulesQuery, 
  useGetScheduleQuery, 
  useUpdateScheduleMutation
}                              from "@redux/api/scheduleAPI";
import { 
  HomeMainCard,
  Loading,
  Settings, 
  ShedulesList 
}                              from "@components/index";
import styles                  from "./leftSideBlock.module.scss";
import { useNavigate }         from "react-router-dom";
import { useGetUserQuery }     from "@redux/api/userAPI";
import { IUser }               from "@typings/user";

export const LeftSideBlock = () => {
  const [scheduleId, setScheduleId] = useState('');

  const { data: user, isLoading: isLoadingUser }           = useGetUserQuery();
  const { data: schedules, isLoading: isLoadingSchedules } = useGetAllUserSchedulesQuery();
  const { 
    data: schedule, 
    refetch: refetchSchedule  
  }                                 = useGetScheduleQuery(scheduleId);
  const [ createSchedule ]          = useCreateScheduleMutation();
  const [ updateSchedule ]          = useUpdateScheduleMutation();
  const [ deleteSchedule ]          = useDeleteScheduleMutation();

  const userMe                      = user as IUser;
  const navigate                    = useNavigate();

  // Settings
  const [openSettings, setOpenSettings]       = useState(false); // By default the menu is closed
  const [displayIsPublic, setDisplayIsPublic] = useState(schedule?.isPublic);
  const [updateDataFlag, setUpdateDataFlag]   = useState(false);

  useEffect(() => {
    setDisplayIsPublic(schedule?.isPublic);
  }, [schedule]);

  const handleOpenSettings = (scheduleId: string) => {
    setOpenSettings(true); // Open the settings panel
    setScheduleId(scheduleId); // Transfer the id of the selected schedule to the variable selectedScheduleId
  };

  const handleCancelClick = () => {
    setOpenSettings(false); // Close the settings panel
    setScheduleId(''); // Remove the id
  };
  
  // Creating schedule
  const onClickCreateSchedule = useCallback(async () => {
    const data = {
      scheduleName  : 'New schedule',
      authorId      : userMe?.id,
      authorUsername: userMe?.username,
    };

    const result = await createSchedule(data).unwrap()

    if (result) {
      navigate(`/schedule/${result.id}`)
    }
  }, [user, createSchedule]);

  // Delete schedule
  const handleDeleteSchedule = async () => {
    const confirmed  = window.confirm("Are you sure you want to delete this schedule?");

    if (confirmed) {
      await deleteSchedule(scheduleId);

      window.location.reload();
    }
  };

  const handleChangeAccess = useCallback(async () => {
    if (schedule) {
      const data = {
        scheduleName: schedule.scheduleName,
        isPublic    : !schedule.isPublic,
        scheduleId,
      };
  
      await updateSchedule(data).unwrap();
  
      setDisplayIsPublic(data.isPublic);
      setUpdateDataFlag(true);
    }
  }, [schedule, updateSchedule]);

  useEffect(() => {
    if (updateDataFlag) {
      refetchSchedule();
      setUpdateDataFlag(false);
    }
  }, [updateDataFlag])

  if (isLoadingUser || isLoadingSchedules) {
    return <Loading />
  }

  return (
    <>
      <div className={styles.leftSideCards}>
        <HomeMainCard
          name={userMe.name}
          clickBtn={onClickCreateSchedule} 
        />
        <div className={styles.schedulesCard}>
          <h3>Schedules</h3>
          <div className={styles.schedulesHead}>
            <span className={styles.scheduleHeadText}>Schedule name</span>
            <div className={styles.rightSideHeadtext}>
              <span className={styles.scheduleHeadText}>Updated at</span>
              <span className={[styles.scheduleHeadText, styles.lastHeadText].join(' ')}>Settings</span>
            </div>
            <span className={[styles.scheduleHeadText, styles.visibleOnPhones].join(' ')}>Settings</span>
          </div>
          <div className={styles.userSchedules}>
            {schedules && schedules.length > 0 ? (
              schedules.map((schedule) => {
                const date = new Date(schedule.updatedAt);
                const formattedDate = date.toLocaleDateString();
                return (
                  <ShedulesList
                    key={schedule.id}
                    scheduleName={schedule.scheduleName} 
                    updatedAt={formattedDate}
                    id={schedule.id}
                    handleButtonClick={() => handleOpenSettings(schedule.id)}
                  />
                );
              })
            ) : (
              <div className={styles.noSchedules}>You don't have a schedules</div>
            )}
          </div>
        </div>
      </div>
      {schedule && openSettings && (
        <Settings
          key={scheduleId}
          id={scheduleId}
          valueOfCol={schedule.numOfCol}
          valueOfRow={schedule.numOfRow}
          deleteSchedule={handleDeleteSchedule}
          changeAccess={handleChangeAccess}
          cancelButton={handleCancelClick}
          buttonState={displayIsPublic}
        />
      )}
    </>
  )
}