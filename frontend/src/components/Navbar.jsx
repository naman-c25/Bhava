import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate("/");
  };

  // Function to check if link is active
  const isActive = (path) => {
    // Don't mark Products as active on home page
    if (path === "/" && location.pathname === "/") {
      return false;
    }
    return location.pathname === path;
  };

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.container}>
        <div className={styles.row} style={{ alignItems: "center" }}>
          <div className={styles.col3}>
            <div 
              className={styles.brandContainer} 
              onClick={handleLogoClick} 
              style={{ cursor: "pointer" }}
            >
              <img src="/logo(3).png" alt="Bhava Logo" className={styles.logo} />
              <h2 className={styles.heading}>
                BHAVA
                <span className={styles.dotsBhava}>
                  <span className={styles.dotName}></span>
                  <span className={styles.dotName}></span>
                </span>
                              </h2>
            </div>
          </div>
          <div className={styles.col9}>
            <ul className={`${styles.nav} justify-content-end align-items-center`}>
              <li className={styles.navItem}>
                <Link
                  className={`${styles.navLink} ${isActive("/products") ? styles.navLinkActive : ""}`}
                  to="/products"
                >
                  Products
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link 
                  className={`${styles.navLink} ${isActive("/knowledge") ? styles.navLinkActive : ""}`} 
                  to="/knowledge"
                >
                  Bhakti
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link 
                  className={`${styles.navLink} ${isActive("/services") ? styles.navLinkActive : ""}`} 
                  to="/services"
                >
                  Services
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link 
                  className={`${styles.navLink} ${isActive("/app") ? styles.navLinkActive : ""}`} 
                  to="/app"
                >
                  App
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link 
                  className={`${styles.navLink} ${isActive("/community") ? styles.navLinkActive : ""}`} 
                  to="/community"
                >
                  Community
                </Link>
              </li>
              <li className={styles.navItem}>
                <button className={styles.btnGetStarted} onClick={() => navigate("/auth")}>Get Started</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;