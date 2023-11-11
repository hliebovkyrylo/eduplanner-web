import React, { useImperativeHandle, useRef } from "react";
import styles from "./editEvents.module.scss";

interface EditEventProps {
  _id?: string;
  cancelPanel: (ev: any) => void;
  defaultScheduleName: string;
  defaultEventName: string;
  defaultEventTime: string;
  defaultEventColor: string;
}

export const EditEvent = React.forwardRef(
  ({
    _id,
    cancelPanel, 
    defaultScheduleName,
    defaultEventName,
    defaultEventTime,
    defaultEventColor,
  }: EditEventProps, 
  ref: React.Ref<any>) => {
    const innerRef = useRef(null);

    useImperativeHandle(ref, () => ({
      innerRef,
    }));

  return (
    <div className={styles.panel}>
      <div className={styles.panelBg}>
        <form className={styles.panelInner} ref={innerRef} action="">
          <div className={styles.inputItems}>
            <input
              className={styles.scheduleNameInput}
              defaultValue={defaultScheduleName}
              type="text"
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
                defaultValue={defaultEventName}
              />
            </div>
            <div className={styles.inputItem}>
              <span className={styles.inputText}>Event time</span>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter event time (ex. 11:10)..."
                defaultValue={defaultEventTime}
              />
            </div>
            <div className={styles.inputItem}>
              <span className={styles.inputText}>Select event color</span>
              <input 
                className={styles.selectColor} 
                type="color" 
                defaultValue={defaultEventColor}
              />
            </div>
          </div>
          <div className={styles.buttons}>
            <button onClick={cancelPanel}>Cancel</button>
            <button className={styles.saveBtn}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
});