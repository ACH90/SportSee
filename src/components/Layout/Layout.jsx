// src/components/Layout.jsx
import React from "react";
import styles from "./Layout.module.css";
import Logo from "/src/assets/SportSee_logo.png";
import Nav from "/src/assets/nav-l.png";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.topHeader}>
        <img src={Logo} alt="" />
      </header>
      <div className={styles.mainContent}>
        <nav className={styles.sideNav}>
          <img src={Nav} alt="" />
        </nav>
        <main className={styles.pageContent}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
