// src/components/UserProfile.jsx
import React, { useEffect, useState } from "react";
import { getUserData, getUserStats } from "../../services/userService";
import styles from "./userProfile.module.css";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appeler le service pour récupérer les données de l'utilisateur
    const fetchData = async () => {
      try {
        const userData = await getUserData(userId);
        setUser(userData);
        const userStats = await getUserStats(userId);
        setStats(userStats);
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération des données");
      }
    };

    fetchData();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

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
              {/* {user.userInfos.lastName} */}
            </h1>
          </header>
          <p>Age: {user.userInfos.age}</p>
          <p>Calories: {stats ? stats.calorieCount : "Loading..."}</p>
          <p>Proteins: {stats ? stats.proteinCount : "Loading..."}</p>
          <p>Carbohydrates: {stats ? stats.carbohydrateCount : "Loading..."}</p>
          <p>Lipids: {stats ? stats.lipidCount : "Loading..."}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
