import { useEffect, useState } from "react";
import { fetchUserData } from "../utils/dataLoader";

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
