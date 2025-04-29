import { useState, useEffect } from "react";
import { fetchUserData } from "../utils/dataLoader";

/**
 * Hook personnalisé pour récupérer les données clés (keyData) d'un utilisateur via l'API ou le mock.
 *
 * @param {number} userId - ID de l'utilisateur.
 * @returns {{ stats: object|null, loading: boolean, error: string|null }} - Données statistiques (keyData), état de chargement et erreur éventuelle.
 */

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
