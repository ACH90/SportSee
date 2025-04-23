import { useEffect, useState } from "react";
import { getUserData, getUserStats } from "../services/userService";

export default function useUserData(userId) {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(userId);
        const userStats = await getUserStats(userId);
        setUser(userData);
        setStats(userStats);
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération des données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { user, stats, loading, error };
}
