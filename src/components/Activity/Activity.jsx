import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUserActivity from "/src/hooks/useUserActivity";
import { fetchUserData } from "../../utils/dataLoader"; // Import de la fonction fetchUserData

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
      <ul>
        {activity.map((session, index) => (
          <li key={index}>
            Jour {index + 1} — Poids: {session.kilogram} kg, Calories:{" "}
            {session.calories} kcal
          </li>
        ))}
      </ul>

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
