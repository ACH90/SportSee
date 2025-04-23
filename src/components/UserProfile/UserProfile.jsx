import { useParams } from "react-router-dom";
import useUserData from "../../utils/useUserData";
import styles from "./userProfile.module.css";

const UserProfile = () => {
  const { userId } = useParams();
  const { user, stats, loading, error } = useUserData(userId);

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
          <p>Age: {user.userInfos.age}</p>
          <p>Calories: {stats.calorieCount}</p>
          <p>Proteins: {stats.proteinCount}</p>
          <p>Carbohydrates: {stats.carbohydrateCount}</p>
          <p>Lipids: {stats.lipidCount}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
