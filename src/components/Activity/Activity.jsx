import React from "react";
import { useParams } from "react-router-dom";
import useUserActivity from "../../utils/useUserActivity";
import useUserData from "../../utils/useUserData";

const Activity = () => {
  const { userId } = useParams();
  const { activity, loading, error } = useUserActivity(userId);
  const { stats } = useUserData(userId);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <h2>Activité quotidienne</h2>
      <ul>
        {activity.map((session, index) => (
          <li key={index}>
            Jour {index + 1} — Poids: {session.kilogram}kg, Calories:{" "}
            {session.calories}kcal
          </li>
        ))}
      </ul>

      <h2>Chiffres cles</h2>
      <ul>
        <p>Calories: {stats.calorieCount}</p>
        <p>Proteins: {stats.proteinCount}</p>
        <p>Carbohydrates: {stats.carbohydrateCount}</p>
        <p>Lipids: {stats.lipidCount}</p>
      </ul>
    </div>
  );
};

export default Activity;
