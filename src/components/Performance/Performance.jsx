import { useParams } from "react-router-dom";
import useUserPerformance from "/src/hooks/useUserPerformance"; // Hook pour récupérer les données de performance
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const Performance = () => {
  const { userId } = useParams(); // Récupération de l'ID utilisateur depuis les paramètres de l'URL
  const { performance, loading, error } = useUserPerformance(userId); // Hook pour récupérer les données de performance

  function formatData(data) {
    // Fonction pour formater les données
    const formattedData = data.map((stat) => ({
      subject: stat.kind,
      kind: stat.value,
    }));
    return formattedData;
  }

  const formattedData = formatData(performance);
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Performance</h2>
      <div style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              name="Perf"
              dataKey="kind"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <ul>
        {performance.length > 0 ? (
          performance.map((stat, index) => (
            <li key={index}>
              {stat.kind}: {stat.value}
            </li>
          ))
        ) : (
          <li>Aucune donnée de performance disponible</li>
        )}
      </ul>
    </div>
  );
};

export default Performance;
