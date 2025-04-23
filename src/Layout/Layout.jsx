// src/components/Layout.jsx
import React from "react";
import styles from "./Layout.module.css";
import Logo from "/src/assets/SportSee_logo.png";
import Nav from "/src/assets/nav-l.png";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.topHeader}>
        <img src={Logo} alt="Logo" />
        <nav className={styles.topNav}>
          <ul className={styles.menu}>
            <li>Accueil</li>
            <li>Profil</li>
            <li>Réglage</li>
            <li>Communauté</li>
          </ul>
        </nav>
      </header>
      <div className={styles.mainContent}>
        <nav className={styles.sideNav}>
          <img src={Nav} alt="Nav-bar" className="nav" />
        </nav>
        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
