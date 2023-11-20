import { useEffect } from "react";

import styles from "./rightSideBlock.module.scss";

import { StrangerScheduleCard } from "../../index";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, removeStrangeSchedule } from "../../../redux/slices/user";

export const RightSideBlock = () => {
  const dispatch = useDispatch<any>();
  const { user } = useAuth0();
  
  useEffect(() => {
    const fetchData = async () => {
      if (user && user.sub) {
        try {
          // Passing user.sub to the request
          await dispatch(fetchUser(user.sub));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [user, user?.sub]);

  const currentUser = useSelector((state: any) => state.user.user.items)

  // Removing schedules available to me
  const handleRemoveScheduleWrapper = (scheduleId: string) => async (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    try {
      // Call handleRemoveSchedule, passing the schedule identifier
      await dispatch(removeStrangeSchedule({ userId: currentUser._id, scheduleId }));
    } catch (error) {
      console.error("Error removing schedule:", error);
    }
  };

  return (
    <div className={styles.rightSideCard}>
      <div className={styles.recentlyText}>Have access to</div>
      <div className={styles.schedulesItems}>
        {currentUser?.allowedAccess && currentUser.allowedAccess.length > 0 ? (
          currentUser.allowedAccess.map((schedule: any) => (
            <StrangerScheduleCard 
              key={schedule._id}
              id={schedule._id}
              scheduleName={schedule.scheduleName}
              owner={schedule.authorUsername || 'username'}
              removeSchedule={handleRemoveScheduleWrapper(schedule._id)}
              isPublic={schedule.isPublic}
            />
          ))
        ) : (
          <div className={styles.emptyAccessMessage}>No access available</div>
        )}
      </div>
    </div>
  );
}