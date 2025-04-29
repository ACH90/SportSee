import { useState, useEffect } from "react";
import { fetchUserData } from "/src/utils/dataLoader"; // Import de la fonction fetchUserData

/**
 * Hook personnalisé pour récupérer les données d'activité (sessions) d'un utilisateur.
 *
 * Utilise `fetchUserData` pour charger les données depuis l'API ou les mocks,
 * puis retourne l'état de l'activité, le statut de chargement et une éventuelle erreur.
 *
 * @param {number} userId - L'identifiant de l'utilisateur pour lequel charger les données d'activité.
 * @returns {{ activity: Object[], loading: boolean, error: string|null }}
 * Un objet contenant :
 * - `activity` : un tableau de sessions d'activité de l'utilisateur.
 * - `loading` : un booléen indiquant si les données sont en cours de chargement.
 * - `error` : un message d'erreur si une erreur est survenue, sinon `null`.
 *
 * @example
 * const { activity, loading, error } = useUserActivity(12);
 */

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
