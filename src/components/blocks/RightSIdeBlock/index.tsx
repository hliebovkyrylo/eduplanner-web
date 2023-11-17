import { useEffect } from "react";

import styles from "./rightSideBlock.module.scss";

import { StrangerScheduleCard } from "../../index";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../redux/slices/user";

export const RightSideBlock = () => {
  const dispatch = useDispatch<any>();
  const { user } = useAuth0();
  
  useEffect(() => {
    const fetchData = async () => {
      if (user && user.sub) {
        try {
          // Passing user.sub to the request
          const response = await dispatch(fetchUser(user.sub));
          console.log(response);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [user, user?.sub]);

  const currentUser = useSelector((state: any) => state.user.user.items)

  return (
    <div className={styles.rightSideCard}>
      <div className={styles.recentlyText}>Have access to</div>
      <div className={styles.schedulesItems}>
        {currentUser?.allowedAccess?.map((schedule: any) => (
          <StrangerScheduleCard 
            key={schedule._id}
            id={schedule._id}
            scheduleName={schedule.scheduleName}
            owner={schedule.authorUsername || 'username'}
            isPublic={schedule.isPublic}
          />
        ))}
      </div>
    </div>
  )
}