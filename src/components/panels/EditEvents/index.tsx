import { 
  useImperativeHandle, 
  useRef, 
  useState, 
  forwardRef 
}                                    from "react";
import { 
  useCreateEventMutation, 
  useUpdateEventMutation 
}                                    from "@redux/api/eventAPI";
import styles                        from "./editEvents.module.scss";
import { useUpdateScheduleMutation } from "@redux/api/scheduleAPI";

interface EditEventProps {
  scheduleData     : any;
  cancelPanel      : (ev: any) => void;
  currentEventData?: any;
  rowNum           : any;
  colNum           : any;
};

export const EditEvent = forwardRef(
  ({
    scheduleData,
    currentEventData,
    cancelPanel, 
    rowNum,
    colNum,
  }: EditEventProps, ref: React.Ref<any>) => {
    const [schedule]    = useUpdateScheduleMutation();
    const [event]       = useCreateEventMutation();
    const [updateEvent] = useUpdateEventMutation();
    const isPublic      = scheduleData?.isPublic;
    const scheduleId    = scheduleData?.id;
    const eventId       = currentEventData?.id;

    const innerRef = useRef(null);
    useImperativeHandle(ref, () => ({
      innerRef,
    }));

    // Udate schedule/create event
    const isEdit = Boolean(currentEventData?.id);
    
    const [scheduleName, setScheduleName] = useState<string>(scheduleData?.scheduleName || '');
    const [eventName, setEventName]       = useState<string>(currentEventData?.eventName || '');
    const [eventTime, setEventTime]       = useState<string>(currentEventData?.eventTime || '');
    const [eventColor, setEventColor]     = useState<string>(currentEventData?.eventColor || '');

    const parentId = scheduleData.id;

    const onSubmit = async (ev: React.FormEvent) => {
      ev.preventDefault();

      const updateScheduleValues = {
        scheduleName,
        isPublic,
        scheduleId,
      };

      schedule(updateScheduleValues) // Updating the schedule

      const createValues = {
        eventName,
        eventTime,
        eventColor,
        rowNum,
        colNum,
        parentId,
      };

      const updateValues = {
        eventId,
        eventName,
        eventTime,
        eventColor,
      };

      // Determine whether content exists in the selected cell
      isEdit 
        ? await updateEvent(updateValues) // If there is data
        : await event(createValues) // if there is no data

      window.location.reload(); 
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
                maxLength={76}
                onChange={(e: any) => setEventName(e.target.value)}
              />
            </div>
            <div className={styles.inputItem}>
              <span className={styles.inputText}>Event time</span>
              <input
                className={styles.input}
                type="time"
                placeholder="Enter event time..."
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