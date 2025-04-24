import React from "react";
import { useParams } from "react-router-dom";
import useUserActivity from "../../utils/useUserActivity";

const Activity = () => {
  const { userId } = useParams();
  const { activity, loading, error } = useUserActivity(userId);

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
    </div>
  );
};

export default Activity;
