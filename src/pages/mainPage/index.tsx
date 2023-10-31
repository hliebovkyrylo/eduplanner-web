import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScheduleButton, PairCard } from "../../components";

import styles from "./mainPage.module.scss";
import edit from "../../assets/icons/pen-to-square-solid.svg";
import deleteBtn from "../../assets/icons/trash-solid.svg";

import { deleteSchedule } from "../../redux/slices/schedules";
import { RootState } from "../../redux/store";
import { useAuth0 } from "@auth0/auth0-react";

export const MainPage = () => {
  const isAuth = useState();
  const { loginWithRedirect, logout } = useAuth0();
  

  const userData = useSelector((state: RootState) => state.auth.data);

  ////// passing data to elements //////
  const [scheduleItems] = useState<any>();

  const handleButtonClick = () => {
  };
  // getting data from server
  // useEffect(() => {
  //   axios.get(`/schedules/${id}`)
  //   .then((res => setScheludeItems(res.data)))
  //   .catch((error) => console.log(error))
  // }, [id]);

  ////// switch week schedule //////
  const [showSecondWeek, setShowSecondWeek] = useState(false);
  const toggleWeek = () => {
    setShowSecondWeek(!showSecondWeek);
  };

  ////// functionality //////
  const dispatch = useDispatch();
  const schedules = useSelector((state: RootState) => state.schedule.schedules);

  ////// logout //////
  // const onClickLogout = () => { 
  //   if (window.confirm('Are you sure you want to logout?')) {
  //     dispatch(logout());
  //     window.localStorage.removeItem('token');
  //   }
  // };

  ////// delete schedule //////
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      dispatch<any>(deleteSchedule(id));
      window.location.reload();
    }
  };

  // if (!scheduleItems) {
  //   return <div className={styles.loading}>Loading...</div>; 
  // }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {isAuth ? (
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className={[styles.signBtn, styles.logout].join(' ')}>Log out</button>
        ) : (
          <button onClick={() => loginWithRedirect()} className={styles.signBtn}>Log in</button>
        )}
        <div className={styles.menu}>
          <input type="checkbox" id={styles.check} />
          <label htmlFor={styles.check} className={styles.button}>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </label>
          {isAuth ? (
            <nav className={styles.nav}>
              {schedules.items.map((obj: any) => {
                return (
                  <div className={styles.btn}>
                    <ScheduleButton groupTitle={obj.groupName} _id={obj._id} onScheduleButtonClick={handleButtonClick} />
                    {userData ?._id === obj.user && (
                      <div className={styles.editButtons}>
                        <a className={styles.btnForEdit} href={`/schedules/${obj._id}/update`}><img className={styles.btnForEdit} src={edit} alt="" /></a>
                        <button onClick={() => handleDelete(obj._id)}><img className={styles.btnForEdit} src={deleteBtn} alt="" /></button>
                      </div>
                    )}
                    <div className={styles.btnCreate}>
                      <a className={styles.href} href={isAuth ? "/create" : "/login"}>Create your schedule</a>
                    </div>
                  </div>
                )
              })}
              <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className={styles.nav_btn}>Log out</button>
            </nav>
          ) : (
            <nav>
              {schedules.items.map((obj: any) => {
                return (
                  <div className={styles.btn}>
                    <ScheduleButton groupTitle={obj.groupName} _id={obj._id} onScheduleButtonClick={handleButtonClick} />
                    {userData ?._id === obj.user && (
                      <div className={styles.editButtons}>
                        <a className={styles.btnForEdit} href={`/schedules/${obj._id}/update`}><img className={styles.btnForEdit} src={edit} alt="" /></a>
                        <button onClick={() => handleDelete(obj._id)}><img className={styles.btnForEdit} src={deleteBtn} alt="" /></button>
                      </div>
                    )}
                    <div className={styles.btnCreate}>
                      <a className={styles.href} href={isAuth ? "/create" : "/login"}>Create your schedule</a>
                    </div>
                  </div>
                )
              })}
              <div className={styles.nav_btn}>
                <button onClick={() => loginWithRedirect()} className={styles.a}>Log in</button>
              </div>
              <button onClick={() => loginWithRedirect()} className={styles.signBtn}>Log in</button>
            </nav>
          )}       
        </div>	
        <div className={styles.sideBlock}>
          {schedules.items.map((obj: any) => {
            return (
              <div className={styles.btn}>
                <ScheduleButton groupTitle={obj.groupName} _id={obj._id} onScheduleButtonClick={handleButtonClick} />
                {userData ?._id === obj.user && (
                  <div className={styles.editButtons}>
                    <a className={styles.btnForEdit} href={`/schedules/${obj._id}/update`}><img className={styles.btnForEdit} src={edit} alt="" /></a>
                    <button onClick={() => handleDelete(obj._id)}><img className={styles.btnForEdit} src={deleteBtn} alt="" /></button>
                  </div>
                )}
              </div>
            )
          })}
          <div className={styles.btnCreate}>
            <a className={styles.href} href={isAuth ? "/create" : "/login"}>Create your schedule</a>
          </div>
          <button onClick={() => loginWithRedirect()} className={styles.signBtn}>Log in</button>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className={styles.nav_btn}>Log out</button>

        </div>
    
        <div className={styles.scheduleGrid}>
          <div className={styles.schelude__head}>
            <div className={styles.scheduleTitle}>{scheduleItems && scheduleItems.groupName}</div>
            <button className={styles.scheduleBtn} onClick={toggleWeek}>
              {showSecondWeek ? "Second week" : "First week"}
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
                      {scheduleItems && scheduleItems.schedule && scheduleItems.schedule.monday && scheduleItems.schedule.monday.map((pair: any, index: any) => (
                        <PairCard
                          key={index} 
                          pairNumber={pair.pairNumber}
                          pairTitle={pair.pairTitle} 
                          className={pair.pairTitle === '' ? styles.empty : styles.monday}
                        />
                      ))}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>ВТ</span>
                      {scheduleItems && scheduleItems.schedule && scheduleItems.schedule.tuesday && scheduleItems.schedule.tuesday.map((pair: any, index: any) => (
                        <PairCard
                          key={index} 
                          pairNumber={pair.pairNumber}
                          pairTitle={pair.pairTitle} 
                          className={pair.pairTitle === '' ? styles.empty : styles.tuesday}
                        />
                      ))}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>СР</span>
                      {scheduleItems && scheduleItems.schedule && scheduleItems.schedule.wednesday && scheduleItems.schedule.wednesday.map((pair: any, index: any) => (
                        <PairCard
                          key={index} 
                          pairNumber={pair.pairNumber}
                          pairTitle={pair.pairTitle} 
                          className={pair.pairTitle === '' ? styles.empty : styles.wednesday}
                        />
                      ))}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>ЧТ</span>
                      {scheduleItems && scheduleItems.schedule && scheduleItems.schedule.thursday && scheduleItems.schedule.thursday.map((pair: any, index: any) => (
                        <PairCard
                          key={index} 
                          pairNumber={pair.pairNumber}
                          pairTitle={pair.pairTitle} 
                          className={pair.pairTitle === '' ? styles.empty : styles.thursday}
                        />
                      ))}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>ПТ</span>
                      {scheduleItems && scheduleItems.schedule && scheduleItems.schedule.friday && scheduleItems.schedule.friday.map((pair: any, index: any) => (
                        <PairCard
                          key={index} 
                          pairNumber={pair.pairNumber}
                          pairTitle={pair.pairTitle}
                          className={pair.pairTitle === '' ? styles.empty : styles.friday}
                        />
                      ))}
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
                      {scheduleItems && scheduleItems.schedule && scheduleItems.schedule.mondaySecond && scheduleItems.schedule.mondaySecond.map((pair: any, index: any) => (
                        <PairCard
                          key={index} 
                          pairNumber={pair.pairNumber}
                          pairTitle={pair.pairTitle} 
                          className={pair.pairTitle === '' ? styles.empty : styles.monday}
                        />
                      ))}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>ВТ</span>
                    {scheduleItems && scheduleItems.schedule && scheduleItems.schedule.tuesdaySecond && scheduleItems.schedule.tuesdaySecond.map((pair: any, index: any) => (
                        <PairCard
                          key={index} 
                          pairNumber={pair.pairNumber}
                          pairTitle={pair.pairTitle} 
                          className={pair.pairTitle === '' ? styles.empty : styles.tuesday}
                        />
                      ))}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>СР</span>
                      {scheduleItems && scheduleItems.schedule && scheduleItems.schedule.wednesdaySecond && scheduleItems.schedule.wednesdaySecond.map((pair: any, index: any) => (
                        <PairCard
                          key={index} 
                          pairNumber={pair.pairNumber}
                          pairTitle={pair.pairTitle} 
                          className={pair.pairTitle === '' ? styles.empty : styles.wednesday}
                        />
                      ))}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>ЧТ</span>
                      {scheduleItems && scheduleItems.schedule && scheduleItems.schedule.thursdaySecond && scheduleItems.schedule.thursdaySecond.map((pair: any, index: any) => (
                        <PairCard
                          key={index} 
                          pairNumber={pair.pairNumber}
                          pairTitle={pair.pairTitle} 
                          className={pair.pairTitle === '' ? styles.empty : styles.thursday}
                        />
                      ))}
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.column}>
                    <span className={styles.day}>ПТ</span>
                      {scheduleItems && scheduleItems.schedule && scheduleItems.schedule.fridaySecond && scheduleItems.schedule.fridaySecond.map((pair: any, index: any) => (
                        <PairCard
                          key={index} 
                          pairNumber={pair.pairNumber}
                          pairTitle={pair.pairTitle} 
                          className={pair.pairTitle === '' ? styles.empty : styles.friday}
                        />
                      ))}
                  </div>
              </div>
          </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}