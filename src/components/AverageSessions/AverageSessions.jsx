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

/**
 * Composant `AverageSessions` – Affiche la durée moyenne des sessions de l'utilisateur sous forme de graphique linéaire.
 *
 * Le composant récupère les données d'activité moyenne de l'utilisateur via le hook `useUserAverageSessions`.
 * Les données sont affichées dans un graphique en ligne (utilisant `Recharts`), où chaque ligne représente la durée moyenne d'une session par jour.
 *
 * Si les données sont en cours de chargement, un message de chargement est affiché. En cas d'erreur, un message d'erreur est montré.
 * Si les données ne sont pas disponibles, un message indiquant l'absence de données est affiché.
 *
 * Le graphique inclut :
 * - La durée des sessions (`sessionLength` en minutes) sur l'axe Y.
 * - Le jour de la semaine (`day`) sur l'axe X.
 * - Un dégradé de couleur pour la ligne du graphique.
 *
 * @component
 */

const AverageSessions = () => {
  const { userId } = useParams();
  const { averageSessions, loading, error } = useUserAverageSessions(userId);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
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
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <li>Aucune donnée d'activité moyenne disponible</li>
      )}
    </div>
  );
};

export default AverageSessions;
