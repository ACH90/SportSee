import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUserActivity from "/src/hooks/useUserActivity";
import { fetchUserData } from "../../utils/dataLoader"; // Import de la fonction fetchUserData
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
} from "recharts";
const Activity = () => {
  const { userId } = useParams(); // Récupération de l'ID utilisateur depuis les paramètres de l'URL
  const { activity, loading, error } = useUserActivity(userId); // Hook pour récupérer les données d'activité
  const [stats, setStats] = useState(null); // État pour stocker les statistiques
  const [statsLoading, setStatsLoading] = useState(true); // Indicateur de chargement pour les statistiques
  const [statsError, setStatsError] = useState(null); // Gestion des erreurs pour les statistiques

  // Utilisation de useEffect pour récupérer les données statistiques
  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchUserData("main", userId); // Récupération des données de type "main" (statistiques)
        setStats(data.keyData); // Stockage des données dans l'état
      } catch (err) {
        setStatsError(err.message); // Gestion des erreurs
      } finally {
        setStatsLoading(false); // Fin du chargement
      }
    };
    console.log("activity", activity);
    if (userId) {
      getStats(); // Appel à la fonction pour récupérer les statistiques
    }
  }, [userId]); // Dépendance sur userId pour recharger les données si nécessaire

  if (loading || statsLoading) return <div>Chargement...</div>; // Si les données sont encore en cours de chargement
  if (error || statsError) return <div>{error || statsError}</div>; // Si une erreur survient

  return (
    <div>
      <h2>Activité quotidienne</h2>
      <h3>BARCHART</h3>
      <div
        style={{ width: "750px", height: "300px", backgroundColor: "#F0F0F0" }}
      >
        <ResponsiveContainer width={"100%"} height={250}>
          <BarChart
            data={activity}
            barGap={12}
            barSize={8}
            margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
            width={702}
            height={250}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* Afficher le numéro du jour sur l'axe X */}
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
            <Tooltip />
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
              name="Poids (kg)"
              fill="#282D30"
              radius={[10, 10, 0, 0]}
              barSize={7}
            />
            {/* Calories brûlées */}
            <Bar
              yAxisId="right"
              dataKey="calories"
              name="Calories brûlées (kCal)"
              fill="#E60000"
              radius={[10, 10, 0, 0]}
              barSize={7}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2>Chiffres clés</h2>
      <ul>
        <li>Calories: {stats.calorieCount}</li>
        <li>Proteins: {stats.proteinCount}</li>
        <li>Carbohydrates: {stats.carbohydrateCount}</li>
        <li>Lipids: {stats.lipidCount}</li>
      </ul>
    </div>
  );
};

export default Activity;
