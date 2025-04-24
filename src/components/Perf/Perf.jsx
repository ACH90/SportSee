import { useParams } from "react-router-dom";
import useUserPerf from "../../utils/useUserPerf";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const Perf = () => {
  const { userId } = useParams();
  const { userPerf, loading, error } = useUserPerf(userId);

  if (loading) return <div>Chargement des performances...</div>;
  if (error) return <div>{error}</div>;

  if (!userPerf || !userPerf.data || !userPerf.kind) {
    return <div>Aucune donnée de performance disponible.</div>;
  }
  console.log(userPerf.kind);
  console.log(userPerf.data);
  const formattedData = userPerf.data.map((item) => ({
    subject: userPerf.kind[item.kind],
    value: item.value,
  }));
  return (
    <div>
      <h2>Performances</h2>
      <ul>
        {formattedData.map((perf, index) => (
          <li key={index}>
            {perf.subject} : {perf.value}
          </li>
        ))}
      </ul>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar
            name="Perf"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Perf;
