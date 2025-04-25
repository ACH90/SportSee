import { useState, useEffect } from "react";
import { fetchUserData } from "/src/utils/dataLoader"; // Import de la fonction fetchUserData

const useUserActivity = (userId) => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getActivityData = async () => {
      try {
        const data = await fetchUserData("activity", userId); // Utilisation de fetchUserData
        setActivity(data.sessions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getActivityData();
    }
  }, [userId]);

  return { activity, loading, error };
};

export default useUserActivity;
