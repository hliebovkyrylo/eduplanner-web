import styles    from "./homeMainCard.module.scss";
import homeImage from "@assets/otherImages/Group 11.png";

interface Props {
  clickBtn: () => void;
  name    : string | undefined;
}

export const HomeMainCard = ({ 
  clickBtn, 
  name 
}: Props) => {
  return (
    <div className={styles.mainCard}>
      <div>
        <h2>Home Page</h2>
        <h1 className={styles.userNameIncription}>{`Hello, ${name} 👋`}</h1>
        <button onClick={clickBtn} className={styles.createBtn}>Create Schedule</button>
      </div>
      <img className={styles.homeImage} src={homeImage} alt="Home image" />
    </div>
  )
}