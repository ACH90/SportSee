import { useEffect, useState } from "react";
import { fetchUserData } from "../utils/dataLoader";

/**
 * Hook personnalisé pour récupérer les données principales d’un utilisateur (informations générales).
 *
 * @param {number} userId - ID de l'utilisateur.
 * @returns {{ data: object|null, loading: boolean, error: string|null }} - Données principales, état de chargement et message d’erreur éventuel.
 */

function useUserMain(userId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData("main", userId)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  return { data, loading, error };
}

export default useUserMain;
