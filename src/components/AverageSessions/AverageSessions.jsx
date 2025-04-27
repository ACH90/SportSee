import { useParams } from "react-router-dom";
import useUserAverageSessions from "/src/hooks/useUserAverageSessions"; // Hook pour récupérer les données d'activité moyenne
import {
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AverageSessions = () => {
  const { userId } = useParams(); // Récupération de l'ID utilisateur depuis les paramètres de l'URL
  const { averageSessions, loading, error } = useUserAverageSessions(userId); // Hook pour récupérer les données d'activité moyenne

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Activité moyenne</h2>
      {averageSessions.length > 0 ? (
        <ResponsiveContainer width={258} height={263}>
          <LineChart
            width={200}
            height={200}
            data={averageSessions}
            style={{ background: "#ff0101", borderRadius: "0.5rem" }}
            margin={{ top: 70, right: 20, bottom: 10, left: 20 }}
          >
            <defs>
              <linearGradient id="line-gradient">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="30%" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="100%" />
              </linearGradient>
            </defs>
            <text
              x="10%"
              y="15%"
              fontSize="1rem"
              fontWeight={500}
              width={100}
              fill="#ffffff"
              opacity={0.5}
            >
              Durée moyenne des
              <tspan x="10%" y="24%">
                sessions
              </tspan>
            </text>
            <Line
              type="natural"
              dataKey="sessionLength"
              dot={false}
              stroke="url(#line-gradient)"
              unit={"min"}
              strokeWidth={2}
              activeDot={{
                stroke: "#ffffff",
                strokeOpacity: "50%",
                strokeWidth: 6,
              }}
            />
            <YAxis hide domain={["dataMin - 15", "dataMax + 10"]} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              stroke="#ffffff"
              opacity={0.5}
              fontSize="1.2rem"
              fontWeight={500}
            />
            <Tooltip
            // content={<AverageCustomTooltip />}
            // cursor={<AverageCustomCursor />}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <li>Aucune donnée d'activité moyenne disponible</li>
      )}
    </div>
  );
};

export default AverageSessions;
