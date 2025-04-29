import { useParams } from "react-router-dom";
import useUserPerformance from "/src/hooks/useUserPerformance"; // Hook pour récupérer les données de performance
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/**
 * Composant `Performance` – Affiche les données de performance de l'utilisateur sous forme de graphique radar.
 *
 * Ce composant utilise le hook `useUserPerformance` pour récupérer les données de performance de l'utilisateur et les afficher sous
 * forme de graphique radar avec des axes représentant différentes mesures de performance (par exemple, force, endurance, etc.).
 * Les données sont formatées avant d'être passées au composant `RadarChart` de la bibliothèque `recharts`.
 *
 * - Le graphique est affiché si des données de performance sont disponibles.
 * - Un message de chargement est affiché pendant le chargement des données.
 * - Si les données sont indisponibles ou en cas d'erreur, un message d'erreur est montré.
 *
 * Le graphique comprend :
 * - Des axes représentant différentes catégories de performance.
 * - Un remplissage coloré sous le graphique pour visualiser les valeurs.
 * - Un tooltip pour afficher les informations des points du graphique.
 *
 * @component
 */

const Performance = () => {
  const { userId } = useParams(); // Récupération de l'ID utilisateur depuis les paramètres de l'URL
  const { performance, kind, loading, error } = useUserPerformance(userId); // Hook pour récupérer les données de performance

  // console.log("performance", performance);
  function formatData(data) {
    const formattedData = data.map((stat) => ({
      subject: kind[stat.kind], // on récupère le nom associé au chiffre
      value: stat.value, // la vraie valeur qu'on veut tracer sur le radar
    }));
    return formattedData;
  }

  const formattedData = formatData(performance);
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {formattedData.length > 0 ? (
        <div
          style={{
            backgroundColor: "#282D30",
            // padding: "20px",
            borderRadius: "10px",
            width: "258px",
          }}
        >
          {/* <ResponsiveContainer width="100%" height={263}> */}
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="70%"
            data={formattedData}
            width={258}
            height={263}
          >
            <PolarGrid gridType="polygon" radialLines={false} strokeWidth={2} />
            <PolarAngleAxis dataKey="subject" tick={<CustomizedTick />} />
            <PolarRadiusAxis axisLine={false} tick={false} tickLine={false} />
            <Radar
              name="Perf"
              dataKey="value"
              stroke="none"
              fill="rgba(255, 1, 1, 0.70)"
              fillOpacity={0.9}
            />
            <Tooltip />
          </RadarChart>
          {/* </ResponsiveContainer> */}
        </div>
      ) : (
        <p>Aucune donnée de performance disponible</p>
      )}
    </div>
  );
};

const CustomizedTick = ({ x, y, cx, cy, payload }) => {
  return (
    <text
      y={y + (y - cy) / 6} // Position verticale du texte
      x={x + (x - cx) / 5} // Position horizontale du texte
      textAnchor="middle"
      fill="#fff" // Couleur blanche pour le texte
      fontSize={12} // Taille de police
    >
      {payload.value}
    </text>
  );
};

export default Performance;
