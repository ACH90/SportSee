import { useState, useEffect } from "react";
import { fetchUserData } from "../utils/dataLoader"; // Import de la fonction fetchUserData

const useUserPerformance = (userId) => {
  const [performance, setPerformance] = useState([]); // Renommé en "performance"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPerformanceData = async () => {
      try {
        const data = await fetchUserData("performance", userId); // Récupération des données de performance
        if (data && Array.isArray(data.data)) {
          setPerformance(data.data); // Assurez-vous que les données sont au bon format
        } else {
          throw new Error("Données de performance mal formatées");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getPerformanceData();
    }
  }, [userId]);

  return { performance, loading, error }; // On renvoie "performance" directement
};

export default useUserPerformance;
