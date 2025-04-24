import React from "react";
import { useParams } from "react-router-dom";
import useUserAverageSessions from "/src/utils/useUserAverageSessions";
const AverageSessions = () => {
  const { userId } = useParams();
  const { averageSessions, loading, error } = useUserAverageSessions(userId);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <h2>Sessions moyennes</h2>
      <ul>
        {averageSessions.map((session, index) => (
          <li key={index}>
            Jour {index + 1} — Duree: {session.sessionLength}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AverageSessions;
