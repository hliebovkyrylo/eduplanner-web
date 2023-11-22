import { useState, useCallback, useEffect, useRef } from "react";
import { Topbar, EventCard, EditEvent, Loading, NoAccess } from "../../components/index";
import { scheduleHead } from "../../constants";

import styles from "./schedule.module.scss";

import { useNavigate, useParams } from "react-router-dom";
import { fetchSchedule } from "../../redux/slices/schedules";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvents } from "../../redux/slices/event";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUser } from "../../redux/slices/user";

export const Schedule = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const editScheduleRef = useRef<any>(null);
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentuser] = useState<any>();

  const { id } = useParams();
  const scheduleId = id;
  const dispatch = useDispatch<any>();

  const schedule = useSelector((state: any) => state.schedule.schedules.items);
  const events = useSelector((state: any) => state.event.events.items);
  const scheduleState = useSelector((state: any) => state.schedule.schedules.status);
  const eventsState = useSelector((state: any) => state.event.events.status);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const userResponse = await dispatch(fetchUser(user?.sub));

          await dispatch(fetchSchedule({ id: scheduleId, userId: userResponse.payload?._id }));
          await dispatch(fetchAllEvents({ id: scheduleId, userId: userResponse.payload?._id }));
          setCurrentuser(userResponse.payload);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  // Click handler outside the panel
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      // Check that the click was the left mouse button
      if (event.button === 0) {
        // Check the visibility of the panel and click outside it
        if (
          isVisible &&
          editScheduleRef.current &&
          !editScheduleRef.current.innerRef.current.contains(event.target as Node)
        ) {
          setIsVisible(false); // Hide the panel
        }
      }
    },
    [isVisible]
  );

  // Panel cancellation handler
  const onClickCancelPanel = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsVisible(false); // Hide the panel when canceling
  }

  // Button click handler
  const [currentEventData, setCurrentEventData] = useState<{ data?: any; rowNum?: number; colNum?: number }>({});

  const handleBtnClick = useCallback(({ data, rowNum, colNum }: { data?: any; rowNum: number; colNum: number }) => {
    if (currentUser && currentUser._id && schedule.author && currentUser._id === schedule.author) {
      setIsVisible((prevVisible) => !prevVisible);
      setCurrentEventData({ data: data, rowNum, colNum });
    }
  }, [currentUser, schedule]);

  // Add an event handler when the component is mounted
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // Remove the event handler when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (scheduleState === 'error' || eventsState === 'error') {
    return <NoAccess />;
  }

  if (!user) {
    navigate('/')
  }

  if (!schedule || eventsState === 'loading') {
    return <Loading/>;
  }

  return (
    <main>
      <div className={styles.container}>
        <Topbar pageName={schedule.scheduleName} />

        <section className={styles.scheduleInner} ref={editScheduleRef}>
          <div className={styles.scheduleHead}>
            {scheduleHead.map((day) => (
              <span className={styles.day} key={day.value}>
                {day.value}
              </span>
            ))}
          </div>

          <div className={styles.schedule}>
          {Array.from({ length: 6 }).map((_, colIndex) => (
            <div className={styles.scheduleRow} key={colIndex}>
              {Array.from({ length: 8 }).map((_, rowIndex) => {
                const eventArray = Array.isArray(events) ? events : [];
                
                const cellData = eventArray.find(
                  (data: any) => data.rowNum === rowIndex + 1 && data.colNum === colIndex + 1
                );

                return (
                  <EventCard
                    key={`${rowIndex + 1}-${colIndex + 1}`}
                    _id={cellData?._id || ""}
                    eventName={cellData?.eventName || ""}
                    eventTime={cellData?.eventTime || ""}
                    eventColor={cellData?.eventColor || ""}
                    rowNum={rowIndex + 1}
                    colNum={colIndex + 1}
                    btnClick={() => handleBtnClick({ data: cellData, rowNum: rowIndex + 1, colNum: colIndex + 1 })}
                  />
                );
              })}
            </div>
          ))}
          </div>

          {isVisible && (
            <div className="edit-schedule-container">
              <EditEvent 
                scheduleData={schedule}
                currentEventData={currentEventData.data}
                ref={editScheduleRef} 
                rowNum={currentEventData.rowNum}
                colNum={currentEventData.colNum}
                cancelPanel={onClickCancelPanel}
              />
            </div>
          )}
        </section>
        {isAuthenticated && (
          <div className={styles.backHomeBtn}>
            <a href="/home">Back home</a>
          </div>
        )}
      </div>
    </main>
  );
};