import { useParams } from "react-router-dom";
import useUserActivity from "/src/hooks/useUserActivity";
import styles from "./Activity.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/**
 * Composant `Activity` – Affiche l'activité physique quotidienne de l'utilisateur sous forme de graphique à barres.
 *
 * Les données sont récupérées via le hook `useUserActivity` en fonction de l'ID utilisateur extrait de l'URL.
 *
 * Utilise Recharts pour afficher :
 * - Le poids (en kg)
 * - Les calories brûlées (en kCal)
 *
 * Affiche un état de chargement ou d'erreur en fonction de la requête.
 *
 * @component
 */

const Activity = () => {
  const { userId } = useParams(); // Récupération de l'ID utilisateur depuis les paramètres de l'URL
  const { activity, loading, error } = useUserActivity(userId); // Hook pour récupérer les données d'activité

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div
        className={styles.activityContainer}
        style={{ width: "835px", height: "320px", backgroundColor: "#F0F0F0" }}
      >
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <h2>Activité quotidienne</h2>
          <BarChart
            data={activity}
            barGap={12}
            margin={{ top: 50, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* Afficher le numéro du jour sur l'axe X horizontal */}
            <XAxis
              dataKey="day"
              tickFormatter={(day) => new Date(day).getDate()}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              hide
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                paddingBottom: "40px", // ← pousse le BarChart vers le bas
                fontSize: "1rem",
              }}
            />
            {/* Poids (kg) */}
            <Bar
              yAxisId="left"
              dataKey="kilogram"
              unit="kg"
              name="Poids (kg)"
              fill="#282D30"
              radius={[10, 10, 0, 0]}
              barSize={7}
            />
            {/* Calories brûlées */}
            <Bar
              yAxisId="right"
              dataKey="calories"
              unit="kCal"
              name="Calories brûlées (kCal)"
              fill="#E60000"
              radius={[10, 10, 0, 0]}
              barSize={7}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={styles.customTooltip}
        style={{ transform: "translateY(-50px)" }}
      >
        {payload.map(({ value, unit }, index) => (
          <p key={index}>
            {value}
            {unit}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default Activity;
