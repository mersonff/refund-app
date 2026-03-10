import { MagnifyingGlass } from "@phosphor-icons/react"
import styles from "./SearchBar.module.css"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder="Pesquisar pelo nome"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        className={styles.input}
      />
      <button className={styles.searchButton} onClick={onSearch}>
        <MagnifyingGlass size={24} weight="bold" color="white" />
      </button>
    </div>
  )
}
