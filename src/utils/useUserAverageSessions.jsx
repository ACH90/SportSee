import { useState, useEffect } from "react";
import { getUserAverageSessions } from "../services/userService";

const useUserAverageSessions = (userId) => {
  const [averageSessions, setAverageSessions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAverageSessions = async () => {
      try {
        const data = await getUserAverageSessions(userId);
        setAverageSessions(data);
      } catch (err) {
        setError("Erreur lors de la récupération des sessions moyennes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAverageSessions();
  }, [userId]);
  return { averageSessions, loading, error };
};

export default useUserAverageSessions;
