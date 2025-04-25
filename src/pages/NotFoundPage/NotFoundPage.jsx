import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <div className={styles.h2Wrapper}>
        <h2>Oups! La page que vous demandez n'existe pas.</h2>
      </div>
      <Link to="/">
        <p>Retourner sur la page d’accueil</p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
