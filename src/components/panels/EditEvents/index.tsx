import { useImperativeHandle, useRef, useState, forwardRef, useEffect } from "react";
import styles from "./editEvents.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateSchedule } from "../../../redux/slices/schedules";
import { createEvent, updateEvent } from "../../../redux/slices/event";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUser } from "../../../redux/slices/user";

interface EditEventProps {
  scheduleData: any;
  cancelPanel: (ev: any) => void;
  currentEventData?: any;
  rowNum?: number;
  colNum?: number;
}

export const EditEvent = forwardRef(
  ({
    scheduleData,
    currentEventData,
    cancelPanel, 
    rowNum,
    colNum,
  }: EditEventProps, ref: React.Ref<any>) => {
    const innerRef = useRef(null);
    useImperativeHandle(ref, () => ({
      innerRef,
    }));

    //
    const { user } = useAuth0();
    const currentUser = useSelector((state: any) => state.user.user.items);

    useEffect(() => {
      const fetchUserData = async () => {
        if (user && user.sub) {
          await dispatch(fetchUser(user.sub));
        }
      }

      fetchUserData();
    }, [user])

    // Udate schedule/create event
    const dispatch = useDispatch<any>();

    const isEdit = Boolean(currentEventData?._id);
    
    const [scheduleName, setScheduleName] = useState(scheduleData?.scheduleName);
    const [eventName, setEventName] = useState(currentEventData?.eventName);
    const [eventTime, setEventTime] = useState(currentEventData?.eventTime);
    const [eventColor, setEventColor] = useState(currentEventData?.eventColor);

    const parentId = scheduleData._id;

    const onSubmit = async (ev: React.FormEvent) => {
      ev.preventDefault();

      const scheduleParams = {
        scheduleName,
      };

      await dispatch(updateSchedule({ id: scheduleData._id, params: scheduleParams })); // Updating the schedule

      const params = {
        eventName,
        eventTime,
        eventColor,
        rowNum,
        colNum,
        parentId,
      };

      // Determine whether content exists in the selected cell
      isEdit 
        ? await dispatch(updateEvent({ id: currentEventData?._id, params: params, currentUser: currentUser._id })) // If there is data
        : await dispatch(createEvent({ params: params, currentUser: currentUser._id, parentId: parentId })); // if there is no data

      window.location.reload(); // Reload the page after saving
    }

  return (
    <div className={styles.panel}>
      <div className={styles.panelBg}>
        <form className={styles.panelInner} ref={innerRef} onSubmit={onSubmit}>
          <div className={styles.inputItems}>
            <input
              className={styles.scheduleNameInput}
              type="text"
              value={scheduleName}
              onChange={(e: any) => setScheduleName(e.target.value)}
            />
          </div>
          <hr className={styles.inputsLine} />
          <div className={styles.inputItems}>
            <div className={styles.inputItem}>
              <span className={styles.inputText}>Name of the event</span>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter name of the event..."
                value={eventName}
                onChange={(e: any) => setEventName(e.target.value)}
              />
            </div>
            <div className={styles.inputItem}>
              <span className={styles.inputText}>Event time</span>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter event time (ex. 11:10)..."
                value={eventTime}
                onChange={(e: any) => setEventTime(e.target.value)}
              />
            </div>
            <div className={styles.inputItem}>
              <span className={styles.inputText}>Select event color</span>
              <input 
                className={styles.selectColor} 
                type="color"
                value={eventColor}
                onChange={(e: any) => setEventColor(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.buttons}>
            <button type="button" onClick={cancelPanel}>Cancel</button>
            <button type="submit" className={styles.saveBtn}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
});