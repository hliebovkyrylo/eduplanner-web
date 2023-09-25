import {useState} from "react";

import { ScheduleButton, PairCard } from "../../components";

import styles from "./mainPage.module.scss";

export const MainPage = () => {
  const [showSecondWeek, setShowSecondWeek] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  // switch week schedule
  const toggleWeek = () => {
    setShowSecondWeek(!showSecondWeek);
  };

  // style for button
  const handleButtonClick = (btnIndex: number) => {
    setActiveButton(btnIndex);
  };

  const handleScheduleButtonClick = (scheduleId: string) => {
    setSelectedScheduleId(scheduleId);
  }

  const isAuth = false;

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {isAuth ? (
          <button className={styles.signBtn}>Log out</button>
        ) : (
          <a className={styles.signBtn} href="#">Sign in</a>
        )}
        <div className={styles.menu}>
          <input type="checkbox" id={styles.check} />
          <label htmlFor={styles.check} className={styles.button}>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </label>
          {isAuth ? (
            <nav>
              {[...Array(2)].map((_, index) => {
                return (
                  <div>
                    <ScheduleButton onClick={() => handleButtonClick} className={index === activeButton ? styles.activeButton : ''} groupTitle={'Group 1'} _id={'sdfdsf'} onScheduleButtonClick={handleScheduleButtonClick} />
                  </div>
                )
              })}
              <button className={styles.nav_btn}>Log out</button>
            </nav>
          ) : (
            <nav>
              {[...Array(2)].map((_, index) => {
                return (
                  <div>
                    <ScheduleButton onClick={() => handleButtonClick} className={index === activeButton ? styles.activeButton : ''} groupTitle={'Group 1'} _id={'sdfdsf'} onScheduleButtonClick={handleScheduleButtonClick} />
                  </div>
                )
              })}
              <div className={styles.nav_btn}>
                <a className={styles.a} href="/auth/login">Login</a>
              </div>
            </nav>
          )}       
        </div>	
        <div className={styles.sideBlock}>
          {[...Array(2)].map((_, index) => {
            return (
              <ScheduleButton onClick={() => handleButtonClick} className={index === activeButton ? styles.activeButton : ''} groupTitle={'Group 1'} _id={'sdfdsf'} onScheduleButtonClick={handleScheduleButtonClick} />
            )
          })}
          <div className={styles.btnCreate}>
            <a className={styles.href} href="#">Створити свій розклад</a>
          </div>
        </div>
    
        <div className={styles.scheduleGrid}>
          <div className={styles.schelude__head}>
            <div className={styles.scheduleTitle}>{'Group 1'}</div>
            <button className={styles.scheduleBtn} onClick={toggleWeek}>
              {showSecondWeek ? "Другий тиждень" : "Перший тиждень"}
            </button>
          </div>
          {showSecondWeek ? null : (
            <div className={styles.week}>
              <hr className={[styles.horizontalLine, styles.first].join(' ')} />
              <hr className={[styles.horizontalLine, styles.second].join(' ')} />
              <hr className={[styles.horizontalLine, styles.third].join(' ')} />
              <hr className={[styles.horizontalLine, styles.fourth].join(' ')} />
              <hr className={[styles.horizontalLine, styles.fifth].join(' ')} />
              <div className={styles.scheludePair}>
                  <div className={styles.column}>
                    <span className={styles.day}>ПН</span>
                    {[...Array(6)].map(() => {
                      return (
                        <>
                          <PairCard 
                            pairNumber={1}
                            pairTitle={'Українська мова за професійним спрямуванням ())л'}
                            _id={"selectedScheduleId"}
                          />
                        </>
                      )
                    })}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>ВТ</span>
                    {[...Array(3)].map(() => {
                      return (
                        <PairCard 
                          pairNumber={1} 
                          pairTitle={'Math'} 
                          className={styles.tuesday}
                          _id={"selectedScheduleId"}
                        />
                      )
                    })}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>СР</span>
                    {[...Array(4)].map(() => {
                      return (
                        <PairCard 
                          pairNumber={1} 
                          pairTitle={'Math'} 
                          className={styles.wednesday}
                          _id={"selectedScheduleId"}
                        />
                      )
                    })}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>ЧТ</span>
                    {[...Array(1)].map(() => {
                      return (
                        <PairCard 
                          pairNumber={1} 
                          pairTitle={'Math'} 
                          className={styles.thursday}
                          _id={"selectedScheduleId"}
                        />
                      )
                    })}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>ПТ</span>
                    {[...Array(2)].map(() => {
                      return (
                        <PairCard 
                          pairNumber={1} 
                          pairTitle={'Math'} 
                          className={styles.friday}
                          _id={"selectedScheduleId"}
                        />
                      )
                    })}
                  </div>
              </div>
            </div>
          )}
          {showSecondWeek ? (
            <div className={styles.week}>
              <hr className={[styles.horizontalLine, styles.first].join(' ')} />
              <hr className={[styles.horizontalLine, styles.second].join(' ')} />
              <hr className={[styles.horizontalLine, styles.third].join(' ')} />
              <hr className={[styles.horizontalLine, styles.fourth].join(' ')} />
              <hr className={[styles.horizontalLine, styles.fifth].join(' ')} />
              <div className={styles.scheludePair}>
                  <div className={styles.column}>
                    <span className={styles.day}>ПН</span>
                    {[...Array(3)].map(() => {
                      return (
                        <>
                          <PairCard 
                            pairNumber={1}
                            pairTitle={'Українська мова за професійним спрямуванням ())л'}
                            _id={"selectedScheduleId"}
                          />
                        </>
                      )
                    })}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>ВТ</span>
                    {[...Array(1)].map(() => {
                      return (
                        <PairCard 
                          pairNumber={1} 
                          pairTitle={'Math'} 
                          className={styles.tuesday}
                          _id={"selectedScheduleId"}
                        />
                      )
                    })}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>СР</span>
                    {[...Array(5)].map(() => {
                      return (
                        <PairCard 
                          pairNumber={1} 
                          pairTitle={'Math'} 
                          className={styles.wednesday}
                          _id={"selectedScheduleId"}
                        />
                      )
                    })}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>ЧТ</span>
                    {[...Array(1)].map(() => {
                      return (
                        <PairCard 
                          pairNumber={1} 
                          pairTitle={'Math'} 
                          className={styles.thursday}
                          _id={"selectedScheduleId"}
                        />
                      )
                    })}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>ПТ</span>
                    {[...Array(2)].map(() => {
                      return (
                        <PairCard 
                          pairNumber={1} 
                          pairTitle={'Math'} 
                          className={styles.friday}
                          _id={"selectedScheduleId"}
                        />
                      )
                    })}
                  </div>
              </div>
          </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}