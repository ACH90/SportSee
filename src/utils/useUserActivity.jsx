import { useState, useEffect } from "react";
import { getUserActivity } from "../services/userService";

export default function useUserActivity(userId) {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await getUserActivity(userId);
        setActivity(data);
      } catch (err) {
        setError("Erreur lors de la récupération de l'activité");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [userId]);

  return { activity, loading, error };
}
