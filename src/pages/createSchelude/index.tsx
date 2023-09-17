import React, { useState } from "react";

import styles from "./createSchedule.module.scss";
import plus from "../../assets/icons/plus-solid.svg";

export const CreateSchedulePage: React.FC = () => {
  const [inputs, setInputs] = useState<string[][]>([[""], [""], [""], [""], [""]]);

  const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ"];

  const addInput = (e: React.MouseEvent<HTMLButtonElement>, dayIndex: number) => {
    e.preventDefault();
    const updatedInputs = [...inputs];
    if (updatedInputs[dayIndex].length < 6) {
      updatedInputs[dayIndex] = [...updatedInputs[dayIndex], ""];
      setInputs(updatedInputs);
    }
  };

  const handleInputChange = (dayIndex: number, index: number, value: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[dayIndex][index] = value;
    setInputs(updatedInputs);
  };

  const handleSubmit = () => {};

  return (
    <div className={styles.createSchedule}>
      <h1>Create your schedule</h1>
      <h3>*if for example there is no 1 pair then leave it half empty</h3>
      <form className={styles.createForm}>
        {inputs.map((inputList, dayIndex) => (
          <div key={dayIndex}>
            <span className={styles.day}>{daysOfWeek[dayIndex]}</span>
            {inputList.map((inputValue, index) => (
              <div key={index}>
                <input
                  placeholder={`Name of pair ${index + 1}`}
                  className={styles.input}
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleInputChange(dayIndex, index, e.target.value)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={(e) => addInput(e, dayIndex)}
              className={styles.plusBtn}
            >
              <img className={styles.plus} src={plus} alt="" />
            </button>
          </div>
        ))}
        <div className={styles.buttons}>
          <a className={styles.btn1} href="/">Back home</a>
          <button type="submit" className={[styles.plusBtn, styles.btn2].join(' ')}>Create schedule</button>
        </div>
      </form>
    </div>   
  );
};