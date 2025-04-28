import { useParams } from "react-router-dom";
import useUserKeyData from "../../hooks/useUserKeyData";
//Composants graphiques
import Calories from "/src/assets/calories-icon.png";
import Proteines from "/src/assets/protein-icon.png";
import Carbs from "/src/assets/carbs-icon.png";
import Lipids from "/src/assets/fat-icon.png";
//Styles
import styles from "./KeyData.module.css";

const KeyData = () => {
  const { userId } = useParams(); // Récupération de l'ID utilisateur depuis les paramètres de l'URL
  const { stats, loading, error } = useUserKeyData(userId); // Hook pour récupérer les données de performance

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className={styles.keyData}>
        <ul>
          <li>
            <img src={Calories} alt="calories" />
            <div className={styles.results}>
              <span className={styles.nutriNumber}>{stats.calorieCount}g</span>
              <span className={styles.nutriments}>Calories</span>
            </div>
          </li>
          <li>
            <img src={Proteines} alt="proteines" />
            <div className={styles.results}>
              <span className={styles.nutriNumber}>{stats.proteinCount}g</span>
              <span className={styles.nutriments}>Proteines</span>
            </div>
          </li>
          <li>
            <img src={Carbs} alt="carbohydrates" />
            <div className={styles.results}>
              <span className={styles.nutriNumber}>
                {stats.carbohydrateCount}g
              </span>
              <span className={styles.nutriments}>Glucides</span>
            </div>
          </li>
          <li>
            <img src={Lipids} alt="lipids" />
            <div className={styles.results}>
              <span className={styles.nutriNumber}>{stats.lipidCount}g</span>
              <span className={styles.nutriments}>Lipides</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default KeyData;
