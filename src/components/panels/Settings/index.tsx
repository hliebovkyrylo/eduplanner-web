import { useRef, useState }          from "react";
import styles                        from "./Settings.module.scss";
import copy                          from "@icons/copy-solid.svg";
import check                         from "@icons/circle-check-solid.svg";
import lock                          from "@icons/lock-solid.svg";
import edit                          from "@icons/pen-to-square-solid.svg";
import trash                         from "@icons/trash-solid.svg";
import { CustomInput }               from "./InputSettings";
import { useUpdateScheduleMutation } from "@redux/api/scheduleAPI";

interface Props {
  id            : string | null;
  deleteSchedule: () => void;
  changeAccess  : () => void;
  cancelButton  : (ev: any) => void;
  buttonState   : Boolean | undefined;
  valueOfCol    : number;
  valueOfRow    : number;
}

export const Settings = ({
  id,
  deleteSchedule,
  changeAccess,
  cancelButton,
  valueOfCol,
  buttonState,
  valueOfRow,
}: Props) => {
  const [updateSchedule] = useUpdateScheduleMutation();

  const toggleAccess = () => {
    changeAccess();
  }

  // copy schedule link
  const inputRef                    = useRef<HTMLInputElement | null>(null);
  const [buttonCopy, setButtonCopy] = useState(true);

  const copyLink = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");

      setButtonCopy(!buttonCopy);
      setTimeout(() => {
        setButtonCopy(buttonCopy)
      }, 3000)
    }
  }

  const [activeButton, setActiveButton] = useState('access');
  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  }; 

  const [colValue, setColValue] = useState(valueOfCol);
  const [rowValue, setRowValue] = useState(valueOfRow);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (id) {
      const data = {
        numOfCol  : colValue,
        numOfRow  : rowValue,
        scheduleId: id,
      };
  
      await updateSchedule(data);

      window.location.reload();
    }
  };

  return (
    <>
      <div className={styles.blurBg} />
      <div className={styles.settings}>
        <div className={styles.leftSideBlock}>
          <button onClick={() => handleButtonClick('access')} className={[styles.editSchedule, activeButton === 'access' ? styles.active : null].join(' ')}>
            <img className={styles.btnIcon} src={lock} alt="Access" />
            <span className={styles.textBtn}>Access</span>
          </button>
          <button onClick={() => handleButtonClick('edit')} className={[styles.editSchedule, activeButton === 'edit' ? styles.active : null].join(' ')}>
            <img className={styles.btnIcon} src={edit} alt="Edit" />
            <span className={styles.textBtn}>Edit schedule</span>
          </button>
          <button className={styles.editSchedule} onClick={deleteSchedule}>
            <img className={styles.btnIcon} src={trash} alt="Delete" />
            <span className={styles.textBtn}>Delete schedule</span>
          </button>
        </div>
        <div className={styles.mainBlock}>
          {activeButton === 'access' && (
            <>
              <button className={styles.btnAccess} onClick={toggleAccess}>{buttonState ? 'Disable access via link' : 'Enable access via link'}</button>
              <div className={styles.linkItems}>
                {buttonState && (
                  <>
                    <input ref={inputRef} className={styles.inputLink} type="text" defaultValue={`https://eduplanner-iota.vercel.app/s/${id}`} readOnly />
                    <button onClick={copyLink}>
                      {buttonCopy ? (
                        <img className={styles.copyBtn} src={copy} alt="Copy" />
                      ) : (
                        <img className={styles.copyBtn} src={check} alt="Copyed" />
                      )}
                    </button>
                  </>
                )}
              </div>
            </>
          )}
          {activeButton === 'edit' && (
            <form onSubmit={handleSubmit}>
              <div className={styles.items}>
                <div className={styles.edit}>
                  <span className={styles.editText}>Amount of days:</span>
                  <CustomInput
                    value={colValue}
                    setValue={setColValue}
                    min={1}
                    max={7}
                  />
                </div>
                <div className={styles.edit}>
                  <span className={styles.editText}>Events per day:</span>
                  <CustomInput
                    value={rowValue}
                    setValue={setRowValue}
                    min={8}
                    max={99}
                  />
                </div>
              </div>
              <button type="submit" className={styles.editBtn}>Save</button>
            </form>
          )}
          <button className={styles.cancelBtn} onClick={cancelButton}>Cancel</button>
        </div>
      </div>
    </>
  )
}