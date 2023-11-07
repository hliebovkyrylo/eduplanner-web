import { useRef, useState } from "react";

import styles from "./Settings.module.scss";

import copy from "../../assets/icons/copy-solid.svg";
import check from "../../assets/icons/circle-check-solid.svg";
import lock from "../../assets/icons/lock-solid.svg";
import edit from "../../assets/icons/pen-to-square-solid.svg";
import trash from "../../assets/icons/trash-solid.svg";

interface Props {
  id: string | null;
  deleteSchedule: () => void;
  changeAccess: () => void;
  cancelButton: (ev: any) => void;
  buttonState: Boolean | undefined;
}

export const Settings = ({
  id,
  deleteSchedule,
  changeAccess,
  cancelButton,
  buttonState,
}: Props) => {
  const toggleAccess = () => {
    changeAccess();
  }

  // copy schedule link
  const inputRef = useRef<HTMLInputElement | null>(null);
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

  return (
    <>
      <div className={styles.blurBg} />
      <div className={styles.settings}>
        <div className={styles.leftSideBlock}>
          <button className={styles.editSchedule}>
            <img className={styles.btnIcon} src={lock} alt="Access" />
            <span className={styles.textBtn}>Access</span>
          </button>
          <a className={styles.editSchedule} href={`/schedule/${id}/update`}>
            <img className={styles.btnIcon} src={edit} alt="Edit" />
            <span className={styles.textBtn}>Edit schedule</span>
          </a>
          <button className={styles.editSchedule} onClick={deleteSchedule}>
            <img className={styles.btnIcon} src={trash} alt="Delete" />
            <span className={styles.textBtn}>Delete schedule</span>
          </button>
        </div>
        <div className={styles.mainBlock}>
          <button className={styles.btnAccess} onClick={toggleAccess}>{buttonState ? 'Disable access via link' : 'Enable access via link'}</button>
          <div className={styles.linkItems}>
            {buttonState ? (
              <>
                <input ref={inputRef} className={styles.inputLink} type="text" defaultValue={`https://schedule-frontend-pi.vercel.app/scheedule/${id}`} readOnly />
                <button onClick={copyLink}>
                  {buttonCopy ? (
                    <img className={styles.copyBtn} src={copy} alt="Copy" />
                  ) : (
                    <img className={styles.copyBtn} src={check} alt="Copyed" />
                  )}
                </button>
              </>
            ) : null}
          </div>
          <button className={styles.cancelBtn} onClick={cancelButton}>Cancel</button>
        </div>
      </div>
    </>
  )
}