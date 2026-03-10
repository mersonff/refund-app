import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { File as FileIcon } from "@phosphor-icons/react"
import { getRefund, deleteRefund } from "../services/refunds"
import { getReceiptDownloadUrl } from "../services/receipts"
import { CATEGORY_LABELS, type RefundCategory } from "../types/refund"
import { Header } from "../components/Header"
import { ConfirmModal } from "../components/ConfirmModal"
import styles from "./RefundDetails.module.css"

export function RefundDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { data: refund, isLoading, isError } = useQuery({
    queryKey: ["refund", id],
    queryFn: () => getRefund(id!),
    enabled: !!id,
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteRefund(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refunds"] })
      navigate("/")
    },
  })

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <p className={styles.status}>Carregando...</p>
        </main>
      </div>
    )
  }

  if (isError || !refund) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <p className={styles.status}>Erro ao carregar detalhes do reembolso.</p>
        </main>
      </div>
    )
  }

  const categoryLabel = CATEGORY_LABELS[refund.category as RefundCategory] || refund.category

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(refund.value)

  const receiptUrl = refund.receipt ? getReceiptDownloadUrl(refund.receipt.id) : ""

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.textSection}>
            <h2 className={styles.title}>Solicitação de reembolso</h2>
            <p className={styles.description}>
              Dados da despesa para solicitar reembolso.
            </p>
          </div>

          <div className={styles.form}>
            <div className={styles.field}>
              <span className={styles.label}>NOME DA SOLICITAÇÃO</span>
              <div className={styles.inputDisplay}>{refund.title}</div>
            </div>

            <div className={styles.row}>
              <div className={`${styles.field} ${styles.fieldFlex}`}>
                <span className={styles.label}>CATEGORIA</span>
                <div className={styles.inputDisplay}>{categoryLabel}</div>
              </div>

              <div className={styles.field} style={{ width: 154 }}>
                <span className={styles.label}>VALOR</span>
                <div className={styles.inputDisplay}>{formattedValue}</div>
              </div>
            </div>

            <div className={styles.actions}>
              <a
                href={receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.receiptLink}
              >
                <FileIcon size={18} weight="bold" />
                Abrir comprovante
              </a>

              <button
                className={styles.deleteButton}
                onClick={() => setShowDeleteModal(true)}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </main>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => deleteMutation.mutate()}
        title="Excluir solicitação"
        message="Tem certeza que deseja excluir essa solicitação? Essa ação é irreversível."
        confirmLabel="Confirmar"
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}
