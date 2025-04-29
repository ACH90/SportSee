import { useState, useEffect } from "react";
import { fetchUserData } from "../utils/dataLoader"; // Import de la fonction fetchUserData

/**
 * Hook personnalisé pour récupérer les sessions moyennes d'un utilisateur via l'API ou le mock.
 *
 * @param {number} userId - ID de l'utilisateur.
 * @returns {{ averageSessions: Array, loading: boolean, error: string|null }} - Données des sessions moyennes, état de chargement et erreur éventuelle.
 */

const useUserAverageSessions = (userId) => {
  const [averageSessions, setAverageSessions] = useState([]); // Renommé en "averageSessions"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAverageSessionsData = async () => {
      try {
        const data = await fetchUserData("average", userId); // Récupération des données d'activité moyenne
        if (data && Array.isArray(data.sessions)) {
          setAverageSessions(data.sessions); // Assurez-vous que les données sont au bon format
        } else {
          throw new Error("Données moyennes mal formatées");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getAverageSessionsData();
    }
  }, [userId]);

  return { averageSessions, loading, error }; // On renvoie "averageSessions" directement
};

export default useUserAverageSessions;
