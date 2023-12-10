import { useState, useCallback, useEffect, useRef }        from "react";
import { Topbar, EventCard, EditEvent, Loading, NoAccess } from "../../components/index";
import { scheduleHead }                                    from "../../constants";
import styles                                              from "./schedule.module.scss";
import { useParams }                                       from "react-router-dom";
import { useGetScheduleQuery }                             from "@redux/api/scheduleAPI";
import { useGetAllEventsQuery }                            from "@redux/api/eventAPI";
import { useGetUserQuery }                                 from "@redux/api/userAPI";
import { IUser }                                           from "@typings/user";
import { auth }                                            from "@hocs/auth";

export const Schedule = auth(() => {
  const { id }             = useParams();
  const scheduleId         = id as string;
  const { data: user }     = useGetUserQuery();
  const { 
    data: schedule, 
    isLoading, 
    isError 
  }                        = useGetScheduleQuery(scheduleId);
  const { data: events}    = useGetAllEventsQuery(scheduleId);
  const userMe             = user as IUser;

  // Click handler outside the panel
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const editScheduleRef           = useRef<any>(null);

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
    if (userMe?.id === schedule?.authorId) {
      setIsVisible((prevVisible) => !prevVisible);
      setCurrentEventData({ data: data, rowNum, colNum });
    }
  }, [user, schedule]);

  // Add an event handler when the component is mounted
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // Remove the event handler when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (isLoading) {
    return <Loading/>;
  }

  if (isError) {
    return <NoAccess />
  }

  return (
    <main>
      <div className={styles.container}>
        <Topbar pageName={schedule?.scheduleName || ''} />

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
                    _id={cellData?.id || ""}
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
        {userMe && (
          <div className={styles.backHomeBtn}>
            <a href="/">Back home</a>
          </div>
        )}
      </div>
    </main>
  );
});