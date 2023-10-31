import React, { useState } from "react";

import axios from "../axios";

import styles from "./createSchelude/createSchedule.module.scss";
import plus from "../assets/icons/plus-solid.svg";

import { useNavigate, useParams } from "react-router-dom";
export const UpdateSchedulePage: React.FC = () => {
  const [groupName, setGroupName] = useState("");
  const [showSecondWeek, setShowSecondWeek] = useState(false);
  const isAuth = useState;
  const navigate = useNavigate();
  const { id } = useParams();

  const [firstWeekInputs, setFirstWeekInputs] = useState<{ day: string, pairs: { pairNumber: number, pairTitle: string }[] }[]>([
    { day: "monday", pairs: [{ pairNumber: 1, pairTitle: "" }] },
    { day: "tuesday", pairs: [{ pairNumber: 1, pairTitle: "" }] },
    { day: "wednesday", pairs: [{ pairNumber: 1, pairTitle: "" }] },
    { day: "thursday", pairs: [{ pairNumber: 1, pairTitle: "" }] },
    { day: "friday", pairs: [{ pairNumber: 1, pairTitle: "" }] },
  ]);

  const [secondWeekInputs, setSecondWeekInputs] = useState<{ day: string, pairs: { pairNumber: number, pairTitle: string }[] }[]>([
    { day: "mondaySecond", pairs: [{ pairNumber: 1, pairTitle: "" }] },
    { day: "tuesdaySecond", pairs: [{ pairNumber: 1, pairTitle: "" }] },
    { day: "wednesdaySecond", pairs: [{ pairNumber: 1, pairTitle: "" }] },
    { day: "thursdaySecond", pairs: [{ pairNumber: 1, pairTitle: "" }] },
    { day: "fridaySecond", pairs: [{ pairNumber: 1, pairTitle: "" }] },
  ]);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/schedule/${id}`);
  
        console.log('Fetched data:', response.data);
  
        setGroupName(response.data.groupName);
  
        const firstWeekData = Object.keys(response.data.schedule).filter(key => key.endsWith('day')).map(day => ({
          day,
          pairs: response.data.schedule[day].map((pair: any, index: any) => ({ pairNumber: index + 1, pairTitle: pair.pairTitle }))
        }));
  
        setFirstWeekInputs(firstWeekData);
  
        const secondWeekData = Object.keys(response.data.schedule).filter(key => key.endsWith('Second')).map(day => ({
          day,
          pairs: response.data.schedule[day].map((pair: any, index: any) => ({ pairNumber: index + 1, pairTitle: pair.pairTitle }))
        }));
  
        setSecondWeekInputs(secondWeekData);
      } catch (error) {
        console.error('Failed to fetch existing data:', error);
      }
    };
  
    fetchData();
  }, [id]);

  const addInput = (dayIndex: number, isSecondWeek: boolean) => {
    const updatedInputs = isSecondWeek ? [...secondWeekInputs] : [...firstWeekInputs];
    const day = updatedInputs[dayIndex];
  
    if (day.pairs.length >= 6) return; 
  
    const newPair = { pairNumber: day.pairs.length + 1, pairTitle: "" };
    day.pairs.push(newPair);
  
    if (isSecondWeek) {
      setSecondWeekInputs(updatedInputs);
    } else {
      setFirstWeekInputs(updatedInputs);
    }
  };

  const handleInputChange = (dayIndex: number, pairIndex: number, value: string, isSecondWeek: boolean) => {
    const updatedInputs = isSecondWeek ? [...secondWeekInputs] : [...firstWeekInputs];
    updatedInputs[dayIndex].pairs[pairIndex].pairTitle = value;
    if (isSecondWeek) {
      setSecondWeekInputs(updatedInputs);
    } else {
      setFirstWeekInputs(updatedInputs);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      groupName,
      schedule: {
        ...firstWeekInputs.reduce((acc, day) => ({ ...acc, [day.day]: day.pairs }), {}),
        ...secondWeekInputs.reduce((acc, day) => ({ ...acc, [day.day]: day.pairs }), {}),
      },
    };

    try {
      const response = await axios.patch(`/schedule/update/${id}`, data);
      console.log('Data sended:', response.data);
    } catch (error) {
      console.error('Failed to send data:', error);
    }

    navigate('/');
  };

  if (!isAuth) {
    navigate("/");
    return null;
  }

  return (
    <div className={styles.createSchedule}>
      <div className={styles.schedule__head}>
        <h1>Edit your schedule</h1>
        <button className={styles.scheduleBtn} onClick={() => setShowSecondWeek(!showSecondWeek)}>
          {showSecondWeek ? "Second week" : "First week"}
        </button>
      </div>
      <form className={styles.createForm} onSubmit={handleSubmit}>
        <div className={styles.schedule_inputs}>
          <div>
            <span className={styles.day}>Name of Group</span>
            <input
              type="text"
              placeholder="Enter your name of group"
              className={[styles.input, styles.firstInput].join(" ")}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          {(showSecondWeek ? secondWeekInputs : firstWeekInputs).map((day, dayIndex) => (
            <div className={styles.schedule_day} key={dayIndex}>
              <span className={styles.day}>{daysOfWeek[dayIndex]}</span>
              {day.pairs.map((pair, pairIndex) => (
                <div key={pairIndex}>
                  <input
                    placeholder={`Name of pair ${pair.pairNumber}`}
                    className={styles.input}
                    type="text"
                    value={pair.pairTitle ? pair.pairTitle : ''}
                    onChange={(e) => handleInputChange(dayIndex, pairIndex, e.target.value, showSecondWeek)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addInput(dayIndex, showSecondWeek)}
                className={styles.plusBtn}
              >
                <img className={styles.plus} src={plus} alt="" />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.buttons}>
          <a className={styles.btn1} href="/">
            Back home
          </a>
          <button type="submit" className={[styles.plusBtn, styles.btn2].join(" ")}>
            Create schedule
          </button>
        </div>
      </form>
    </div>
  );
};
