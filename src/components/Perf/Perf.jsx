import { useParams } from "react-router-dom";
import useUserPerf from "../../utils/useUserPerf";

const Perf = () => {
  const { userId } = useParams();
  const { userPerf, loading, error } = useUserPerf(userId);

  if (loading) return <div>Chargement des performances...</div>;
  if (error) return <div>{error}</div>;

  if (!userPerf || !userPerf.data || !userPerf.kind) {
    return <div>Aucune donnée de performance disponible.</div>;
  }

  return (
    <div>
      <h2>Performances</h2>
      <ul>
        {userPerf.data.map((perf, index) => (
          <li key={index}>
            {userPerf.kind[perf.kind]} : {perf.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Perf;
