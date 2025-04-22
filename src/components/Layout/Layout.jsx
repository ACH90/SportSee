// src/components/Layout.jsx
import React from "react";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.topHeader}>
        <h1>Mon App Sportive</h1>
      </header>
      <div className={styles.mainContent}>
        <nav className={styles.sideNav}>
          <ul>
            <li>Accueil</li>
            <li>Profil</li>
            <li>Réglages</li>
            <li>Communauté</li>
          </ul>
        </nav>
        <main className={styles.pageContent}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
