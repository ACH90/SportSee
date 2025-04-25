import { useParams } from "react-router-dom";
import useUserAverageSessions from "/src/hooks/useUserAverageSessions"; // Hook pour récupérer les données d'activité moyenne

const AverageSessions = () => {
  const { userId } = useParams(); // Récupération de l'ID utilisateur depuis les paramètres de l'URL
  const { averageSessions, loading, error } = useUserAverageSessions(userId); // Hook pour récupérer les données d'activité moyenne

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Activité moyenne</h2>
      <ul>
        {averageSessions.length > 0 ? (
          averageSessions.map((session, index) => (
            <li key={index}>
              Jour {index + 1} — Durée: {session.sessionLength} min
            </li>
          ))
        ) : (
          <li>Aucune donnée d'activité moyenne disponible</li>
        )}
      </ul>
    </div>
  );
};

export default AverageSessions;
