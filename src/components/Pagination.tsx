import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import styles from "./Pagination.module.css"

interface PaginationProps {
  currentPage: number
  lastPage: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, lastPage, onPageChange }: PaginationProps) {
  if (lastPage <= 1) return null

  return (
    <div className={styles.pagination}>
      <button
        className={styles.navButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <CaretLeft size={24} weight="bold" color="white" />
      </button>

      <span className={styles.pageInfo}>
        {currentPage}/{lastPage}
      </span>

      <button
        className={styles.navButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        <CaretRight size={24} weight="bold" color="white" />
      </button>
    </div>
  )
}
