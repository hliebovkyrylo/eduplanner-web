import React, { useState } from "react";

import styles from "./createSchedule.module.scss";
import plus from "../../assets/icons/plus-solid.svg";

export const CreateSchedulePage: React.FC = () => {
  const [inputs, setInputs] = useState<{ pairNumber: number, pairs: string[] }[]>(
    Array.from({ length: 5 }, () => ({ pairNumber: 1, pairs: [""] }))
  );

  const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ"];

  const addInput = (e: React.MouseEvent<HTMLButtonElement>, dayIndex: number) => {
    e.preventDefault();
    const updatedInputs = [...inputs];
    const updatedDay = { ...updatedInputs[dayIndex] };
    if (updatedDay.pairs.length < 6) {
      updatedDay.pairs.push("");
      updatedDay.pairNumber += 1;
      updatedInputs[dayIndex] = updatedDay;
      setInputs(updatedInputs);
    }
  };

  const handleInputChange = (dayIndex: number, pairIndex: number, value: string) => {
    const updatedInputs = [...inputs];
    const updatedDay = { ...updatedInputs[dayIndex] };
    updatedDay.pairs[pairIndex] = value;
    updatedInputs[dayIndex] = updatedDay;
    setInputs(updatedInputs);
  };

  const handleSubmit = () => {};

  return (
    <div className={styles.createSchedule}>
      <h1>Create your schedule</h1>
      <form className={styles.createForm}>
        {inputs.map((day, dayIndex) => (
          <div key={dayIndex}>
            <span className={styles.day}>{daysOfWeek[dayIndex]}</span>
            {day.pairs.map((inputValue, pairIndex) => (
              <div key={pairIndex}>
                <input
                  placeholder={`Name of pair ${pairIndex + 1}`}
                  className={styles.input}
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleInputChange(dayIndex, pairIndex, e.target.value)}
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
