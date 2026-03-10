import { useNavigate } from "react-router-dom"
import {
  ForkKnife,
  Bed,
  PoliceCar,
  Wrench,
  Receipt,
} from "@phosphor-icons/react"
import { CATEGORY_LABELS, type Refund, type RefundCategory } from "../types/refund"
import styles from "./RefundCard.module.css"

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  food: ForkKnife,
  transport: PoliceCar,
  hosting: Bed,
  services: Wrench,
  other: Receipt,
}

interface RefundCardProps {
  refund: Refund
}

export function RefundCard({ refund }: RefundCardProps) {
  const navigate = useNavigate()

  const categoryLabel = CATEGORY_LABELS[refund.category as RefundCategory] || refund.category
  const Icon = CATEGORY_ICONS[refund.category] || Receipt

  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(refund.value)

  return (
    <button className={styles.row} onClick={() => navigate(`/refund/${refund.id}`)}>
      <div className={styles.item}>
        <div className={styles.icon}>
          <Icon size={18} weight="fill" />
        </div>
        <div className={styles.title}>
          <strong className={styles.name}>{refund.title}</strong>
          <span className={styles.category}>{categoryLabel}</span>
        </div>
      </div>
      <div className={styles.value}>
        <span className={styles.currency}>R$</span>
        <span className={styles.amount}>{formatted}</span>
      </div>
    </button>
  )
}
