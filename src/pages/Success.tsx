import { useNavigate } from "react-router-dom"
import { CheckCircle } from "@phosphor-icons/react"
import { Header } from "../components/Header"
import styles from "./Success.module.css"

export function Success() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.content}>
            <h1 className={styles.title}>Solicitação enviada!</h1>

            <CheckCircle size={110} weight="regular" className={styles.icon} />

            <p className={styles.message}>
              Agora é apenas aguardar! Sua solicitação será analisada e, em
              breve, o setor financeiro irá entrar em contato com você.
            </p>
          </div>

          <button className={styles.button} onClick={() => navigate("/new")}>
            Nova solicitação
          </button>
        </div>
      </main>
    </div>
  )
}
