import React from "react";
import hhhLogo from "../../assets/logo/hhhLogo.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbarContainer}>
      <a className={styles.hhhLogo} href=".">
        <img
          style={{ height: "40px" }}
          src={hhhLogo}
          alt="Health Hustle Happiness Logo"
        />
        <p className={styles.hhhLogoText}>Health Hustle Happiness</p>
      </a>
    </nav>
  );
}
