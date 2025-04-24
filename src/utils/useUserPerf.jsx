import { useEffect, useState } from "react";
import { getUserPerf } from "../services/userService";

const useUserPerf = (userId) => {
  const [userPerf, setUserPerf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPerf = async () => {
      try {
        const data = await getUserPerf(userId);
        setUserPerf(data);
      } catch (err) {
        setError("Erreur lors de la récupération des performances");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPerf();
  }, [userId]);
  return { userPerf, loading, error };
};

export default useUserPerf;
