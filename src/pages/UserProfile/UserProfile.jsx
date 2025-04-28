import { useParams } from "react-router-dom";
import styles from "./userProfile.module.css";
import useUserMain from "/src/hooks/useUserMain"; // doit retourner uniquement les données "main"
//Composants graphiques
import Activity from "/src/components/Activity/Activity.jsx";
import AverageSessions from "../../components/AverageSessions/AverageSessions";
import Performance from "../../components/Performance/Performance";
import Score from "../../components/Score/Score";
import KeyData from "../../components/KeyData/KeyData";

const UserProfile = () => {
  const { userId } = useParams();
  const { data: user, loading, error } = useUserMain(userId); // juste userId ici

  console.log(user);
  console.log("userId:", userId);
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.userProfile}>
      <div className={styles.gridContainer}>
        <div className={styles.gridUserInfos}>
          <h1>
            Bonjour{" "}
            <span className={styles.userName}>{user.userInfos.firstName}</span>
          </h1>
          <h2>Félicitation ! Vous avez explosé vos objectifs hier 👏</h2>
        </div>
        <div className={styles.gridActivity}>
          <Activity />
        </div>
        <div className={styles.gridKeyData}>
          <KeyData />
        </div>
        <div className={styles.gridAverageSessions}>
          <AverageSessions />
        </div>
        <div className={styles.gridPerformance}>
          <Performance />
        </div>
        <div className={styles.gridScore}>
          <Score />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
