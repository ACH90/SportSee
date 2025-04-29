import React from "react";
import { useParams } from "react-router-dom";
import useUserMain from "/src/hooks/useUserMain";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import styles from "./Score.module.css";

/**
 * Composant `Score` – Affiche le score de l'utilisateur sous forme de graphique radial.
 *
 * Ce composant récupère les données de score de l'utilisateur via le hook `useUserMain`, qui utilise l'ID utilisateur extrait
 * des paramètres de l'URL. Il affiche un graphique radial représentant le score de l'utilisateur par rapport à son objectif
 * avec des valeurs allant de 0 à 100%.
 *
 * - Le score est affiché sous forme de cercle avec un remplissage dynamique représentant la progression de l'utilisateur.
 * - Un texte au centre du graphique affiche le score en pourcentage ainsi qu'une légende indiquant "de votre objectif".
 * - Un cercle blanc est affiché en arrière-plan pour compléter le graphique.
 * - Le composant gère l'état de chargement et d'erreur.
 *
 * @component
 */

const Score = () => {
  const { userId } = useParams();
  const { data: user, loading, error } = useUserMain(userId); // juste userId ici

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  const score = user.todayScore ?? user.score;
  return (
    <div className={styles.scoreContainer}>
      {/* <ResponsiveContainer width={200} height={200}> */}
      <RadialBarChart
        innerRadius="70%" // Cercle intérieur (plus creusé)
        outerRadius="95%" // Cercle extérieur
        data={score} // on passe ici une data adaptée
        startAngle={90}
        endAngle={450}
        width={258}
        height={263}
      >
        {/* Texte "Score" */}
        <text x="10%" y="10%" fontSize="1.2rem" fontWeight={500} fill="#20253A">
          Score
        </text>

        {/* Cercle blanc complet */}
        <RadialBar
          background
          data={[{ value: 1 }]} // 100%
          dataKey="value"
          barSize={10}
          fill="#FFFFFF"
          isAnimationActive={false}
        />

        {/* Arc rouge dynamique */}
        <RadialBar
          data={[{ value: score }]} // ici score réel (ex: 0.12)
          dataKey="value"
          barSize={50}
          cornerRadius={10}
          fill="#FF0000"
          isAnimationActive={false}
        />

        {/* Texte au centre */}
        <text
          textAnchor="middle"
          fontSize="1.érem"
          fontWeight={500}
          fill="#74798C"
        >
          <tspan
            x="50%"
            y="47%"
            fontSize="2rem"
            fontWeight={700}
            fill="#282D30"
          >
            {Math.round(score * 100)}%
          </tspan>
          <tspan x="50%" y="57%">
            de votre
          </tspan>
          <tspan x="50%" y="67%">
            objectif
          </tspan>
        </text>
      </RadialBarChart>
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default Score;
