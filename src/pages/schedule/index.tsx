import { useState, useCallback, useEffect, useRef } from "react";
import { Topbar, EventCard, EditEvent } from "../../components/index";
import { scheduleHead } from "../../constants";

import styles from "./schedule.module.scss";

export const Schedule = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const editScheduleRef = useRef<any>(null);
  const [eventId, setEventId] = useState();

  const handleClickOutside = useCallback(
    (event: any) => {
      if (
        isVisible &&
        editScheduleRef.current &&
        !editScheduleRef.current.innerRef.current.contains(event.target)
      ) {
        setIsVisible(false);
        console.log("clicked");
      }
    },
    [isVisible]
  );

  const onClickCancelPanel = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsVisible(false);
  }

  const handleBtnClick = useCallback((id: any) => {
    setIsVisible((prevVisible) => !prevVisible);
    setEventId(id);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const scheduleData = [
    {
      _id: "1",
      eventName: "Програмні та інструментальні засоби web-дизайну (пр, 14.09, 12.10, 9.11, 7.12)",
      eventTime: "11:10",
      eventColor: "pink",
      rowNum: 1, 
      colNum: 1,
    },
    {
      _id: "2",
      eventName: "Важное событие 2",
      eventTime: "14:30",
      eventColor: "blue",
      rowNum: 4, 
      colNum: 3,
    },
  ];

  return (
    <main>
      <div className={styles.container}>
        <Topbar pageName={"New schedule"} />

        <section className={styles.scheduleInner}>
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
                  const cellData = scheduleData.find(
                    (data) => data.rowNum === rowIndex + 1 && data.colNum === colIndex + 1
                  );

                  return (
                    <EventCard
                      key={cellData?._id || ""}
                      _id={cellData?._id || ""}
                      eventName={cellData?.eventName || ""}
                      eventTime={cellData?.eventTime || ""}
                      eventColor={cellData?.eventColor || ""}
                      rowNum={rowIndex + 1}
                      colNum={colIndex + 1}
                      btnClick={() => handleBtnClick(cellData?._id)}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {isVisible && (
            <div className="edit-schedule-container">
              <EditEvent 
                _id={eventId}
                ref={editScheduleRef} 
                defaultScheduleName={"New Schedule"}
                defaultEventName={"ec"}
                defaultEventTime="11:10"
                defaultEventColor="#ff0000"
                cancelPanel={onClickCancelPanel}
              />
            </div>
          )}
        </section>
        <div className={styles.backHomeBtn}>
            <a href="/home">Back home</a>
          </div>
      </div>
    </main>
  );
};
