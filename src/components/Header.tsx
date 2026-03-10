import { useNavigate, useLocation } from "react-router-dom"
import logoSvg from "../assets/logo.svg"
import styles from "./Header.module.css"

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <header className={styles.header}>
      <button className={styles.logo} onClick={() => navigate("/")}>
        <img src={logoSvg} alt="refund" className={styles.logoImg} />
      </button>

      <nav className={styles.nav}>
        <button
          className={`${styles.navLink} ${isHome ? styles.navLinkActive : ""}`}
          onClick={() => navigate("/")}
        >
          Solicitações de reembolso
        </button>
        <button
          className={styles.newButton}
          onClick={() => navigate("/new")}
        >
          Nova solicitação
        </button>
      </nav>
    </header>
  )
}
