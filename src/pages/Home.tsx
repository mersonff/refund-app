import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getRefunds } from "../services/refunds"
import { Header } from "../components/Header"
import { SearchBar } from "../components/SearchBar"
import { RefundCard } from "../components/RefundCard"
import { Pagination } from "../components/Pagination"
import styles from "./Home.module.css"

export function Home() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [searchInput, setSearchInput] = useState("")

  const { data, isLoading, isError } = useQuery({
    queryKey: ["refunds", page, search],
    queryFn: () => getRefunds(page, search),
  })

  function handleSearch() {
    setSearch(searchInput)
    setPage(1)
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.card}>
          <h2 className={styles.title}>Solicitações</h2>

          <div className={styles.searchWrapper}>
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSearch={handleSearch}
            />
          </div>

          {isLoading && <p className={styles.status}>Carregando...</p>}

          {isError && (
            <p className={styles.status}>Erro ao carregar reembolsos.</p>
          )}

          {data && data.data.length === 0 && (
            <p className={styles.status}>Nenhum reembolso encontrado.</p>
          )}

          <div className={styles.list}>
            {data?.data.map((refund) => (
              <RefundCard key={refund.id} refund={refund} />
            ))}
          </div>

          {data && (
            <Pagination
              currentPage={data.meta.currentPage}
              lastPage={data.meta.lastPage}
              onPageChange={setPage}
            />
          )}
        </div>
      </main>
    </div>
  )
}
