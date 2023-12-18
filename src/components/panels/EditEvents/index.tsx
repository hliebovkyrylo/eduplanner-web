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
import { 
  useCreateExtraFieldMutation, 
  useDeleteExtraFieldMutation, 
  useGetAllExtraFieldsQuery 
}                                    from "@redux/api/extraFieldAPI";
import { useUpdateScheduleMutation } from "@redux/api/scheduleAPI";
import { Loading }                   from "@components/index";
import { useGetUserQuery }           from "@redux/api/userAPI";
import { IUser }                     from "@typings/user";
import plus                          from "@icons/plus-solid.svg";
import trashSolid                    from "@icons/trash-solid.svg";
import styles                        from "./editEvents.module.scss";

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
    const { data: user }              = useGetUserQuery();
    const [schedule]                  = useUpdateScheduleMutation();
    const [event]                     = useCreateEventMutation();
    const [updateEvent]               = useUpdateEventMutation();
    const [createExtraField]          = useCreateExtraFieldMutation();
    const { 
      data     : extraFields, 
      isLoading: isLoadingExtraFields,
      refetch  : refetchExtraFields,
    }                                 = useGetAllExtraFieldsQuery(currentEventData?.id || '');
    const [deleteExtraField]          = useDeleteExtraFieldMutation();
    const userMe                      = user as IUser;
    const isPublic                    = scheduleData?.isPublic;
    const scheduleId                  = scheduleData?.id;
    const eventId                     = currentEventData?.id;

    const innerRef = useRef(null);
    useImperativeHandle(ref, () => ({
      innerRef,
    }));

    const [isVisible, setIsVisible]             = useState(false);
    const [isVisibleButton, setIsVisibleButton] = useState(true);
    const onClickAddField = () => {
      if (extraFields === null || extraFields && extraFields.length < 5 ) {
        setIsVisible(true);
        setIsVisibleButton(false);
      }
    };

    // Udate schedule/create event
    const isEdit = Boolean(currentEventData?.id);
    
    const [scheduleName, setScheduleName] = useState<string>(scheduleData?.scheduleName || '');
    const [eventName, setEventName]       = useState<string>(currentEventData?.eventName || '');
    const [eventTime, setEventTime]       = useState<string>(currentEventData?.eventTime || '');
    const [eventColor, setEventColor]     = useState<string>(currentEventData?.eventColor || '');

    const [extraName, setExtraName]   = useState('');
    const [extraValue, setExtraValue] = useState('');

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

      isEdit ? await updateEvent(updateValues) : await event(createValues);

      const extraFieldData = {
        extraName,
        extraValue,
        eventId
      }

      if (extraName !== '' && extraValue !== '' && eventId) {
        await createExtraField(extraFieldData);
      }

      window.location.reload(); 
    };

    const onClickDeleteExtraField = async (extraFieldId: string) => {
      if (extraFieldId) await deleteExtraField(extraFieldId);

      refetchExtraFields();
    };

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
              readOnly={userMe.id !== scheduleData.authorId}
            />
          </div>
          <hr className={styles.inputsLine} />
          <div className={styles.inputItems}>
            <div className={styles.inputContent}>
              <h4 className={styles.fieldsName}>Basic fields</h4>
              <div className={styles.inputItem}>
                <span className={styles.inputText}>Name of the event</span>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Enter name of the event..."
                  value={eventName}
                  maxLength={50}
                  onChange={(e: any) => setEventName(e.target.value)}
                  readOnly={userMe.id !== scheduleData.authorId}
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
                  readOnly={userMe.id !== scheduleData.authorId}
                />
              </div>
              <div className={styles.inputItem}>
                <span className={styles.inputText}>Select event color</span>
                <input 
                  className={styles.selectColor} 
                  type="color"
                  value={eventColor}
                  onChange={(e: any) => setEventColor(e.target.value)}
                  disabled={userMe.id !== scheduleData.authorId}
                />
              </div>
            </div>
            {isEdit && (
              <>
                <h4>Extra fields</h4>
                <div className={[styles.inputContent, styles.inputContentExtra].join(' ')}>
                  {isLoadingExtraFields ? <Loading /> : (
                    <div>
                      {extraFields && extraFields.map((extraField) => (
                        <div className={styles.inputItemExtra}>
                          <input 
                            className={[styles.inputExtra, styles.inputExtraName].join(' ')} 
                            type="text"
                            key={extraField.id}
                            placeholder="Field name"
                            defaultValue={extraField.extraName}
                            readOnly
                          />
                          <div className={styles.inputValue}>
                            <input 
                              className={styles.inputExtra}  
                              type="text" 
                              placeholder="Field value"
                              key={extraField.extraValue}
                              defaultValue={extraField.extraValue}
                              readOnly
                            />
                            {userMe.id === scheduleData.authorId && (
                              <button 
                                type="button" 
                                onClick={() => {onClickDeleteExtraField(extraField.id)}} 
                                className={styles.deleteButton}>
                                <img className={styles.buttonImg} src={trashSolid} alt="btnDelete" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className={styles.inputItemExtra}>
                    {isVisible && (
                      <>
                        <input 
                          className={[styles.inputExtra, styles.inputExtraName].join(' ')} 
                          type="text"
                          key={'extraText'}
                          onChange={(e: any) => setExtraName(e.target.value)}
                          placeholder="Field name"
                        />
                        <input 
                          className={styles.inputExtra}  
                          key={'extraValue'}
                          type="text" 
                          onChange={(e: any) => setExtraValue(e.target.value)}
                          placeholder="Field value"
                        />
                      </>
                    )}
                  </div>   
                  {(userMe.id === scheduleData.authorId && extraFields && extraFields.length < 5 && isVisibleButton) && (
                    <button type="button" onClick={onClickAddField} className={styles.inputExtraBtn}>
                      <img className={styles.btnImage} src={plus} alt="plus" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
          <div className={styles.buttons}>
            <button type="button" onClick={cancelPanel}>Cancel</button>
            {userMe.id === scheduleData.authorId && (
              <button type="submit" className={styles.saveBtn}>Save</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
});