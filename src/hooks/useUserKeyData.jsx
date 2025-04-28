import { useState, useEffect } from "react";
import { fetchUserData } from "../utils/dataLoader";

const useUserKeyData = (userId) => {
  const [stats, setStats] = useState(null); // État pour stocker les statistiques
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchUserData("main", userId); // Récupération des données de type "main" (statistiques)
        setStats(data.keyData); // Stockage des données dans l'état
      } catch (err) {
        setError(err.message); // Gestion des erreurs
      } finally {
        setLoading(false); // Fin du chargement
      }
    };
    if (userId) {
      getStats(); // Appel à la fonction pour récupérer les statistiques
    }
  }, [userId]); // Dépendance sur userId pour recharger les données si nécessaire

  return { stats, loading, error };
};

export default useUserKeyData;
