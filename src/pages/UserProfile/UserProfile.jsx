import { useParams } from "react-router-dom";
import styles from "./userProfile.module.css";
import useUserMain from "/src/hooks/useUserMain"; // doit retourner uniquement les données "main"
//Composants graphiques
import Activity from "/src/components/Activity/Activity.jsx";
import AverageSessions from "../../components/AverageSessions/AverageSessions";
import Performance from "../../components/Performance/Performance";
import Score from "../../components/Score/Score";

const UserProfile = () => {
  const { userId } = useParams();
  const { data: user, loading, error } = useUserMain(userId); // juste userId ici

  console.log(user);
  console.log("userId:", userId);
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {user && (
        <div>
          <header>
            <h1>
              Bonjour{" "}
              <span className={styles.userName}>
                {user.userInfos.firstName}
              </span>
            </h1>
          </header>
          <Score />
          <Activity />

          <AverageSessions />

          <Performance />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
