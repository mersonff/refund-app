import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { CloudArrowUp } from "@phosphor-icons/react"
import { uploadReceipt } from "../services/receipts"
import { createRefund } from "../services/refunds"
import { Header } from "../components/Header"
import styles from "./NewRefund.module.css"

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"]

const schema = z.object({
  title: z.string().min(1, "Nome da solicitação é obrigatório"),
  value: z.coerce.number().positive("Valor deve ser maior que zero"),
  category: z.string().min(1, "Categoria é obrigatória"),
})

type FormData = z.infer<typeof schema>

export function NewRefund() {
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState("")
  const [fileName, setFileName] = useState("")
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!file) throw new Error("Arquivo é obrigatório")

      const receipt = await uploadReceipt(file)
      return createRefund({
        title: data.title,
        value: data.value,
        category: data.category,
        receipt: receipt.id,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refunds"] })
      navigate("/success")
    },
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0]
    setFileError("")

    if (!selected) return

    if (!ACCEPTED_FILE_TYPES.includes(selected.type)) {
      setFileError("Formato inválido. Use JPG, PNG ou PDF.")
      return
    }

    if (selected.size > MAX_FILE_SIZE) {
      setFileError("Arquivo muito grande. Máximo 2MB.")
      return
    }

    setFile(selected)
    setFileName(selected.name)
  }

  function onSubmit(data: FormData) {
    if (!file) {
      setFileError("Recibo é obrigatório")
      return
    }
    mutation.mutate(data)
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.textSection}>
            <h2 className={styles.title}>Nova solicitação de reembolso</h2>
            <p className={styles.description}>
              Dados da despesa para solicitar reembolso.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.field}>
              <label className={styles.label}>NOME DA SOLICITAÇÃO</label>
              <input
                type="text"
                className={styles.input}
                {...register("title")}
              />
              {errors.title && (
                <span className={styles.error}>{errors.title.message}</span>
              )}
            </div>

            <div className={styles.row}>
              <div className={`${styles.field} ${styles.fieldFlex}`}>
                <label className={styles.label}>CATEGORIA</label>
                <select className={styles.select} {...register("category")}>
                  <option value="">Selecione</option>
                  <option value="food">Alimentação</option>
                  <option value="hosting">Hospedagem</option>
                  <option value="transport">Transporte</option>
                  <option value="services">Serviços</option>
                  <option value="other">Outros</option>
                </select>
                {errors.category && (
                  <span className={styles.error}>{errors.category.message}</span>
                )}
              </div>

              <div className={styles.field} style={{ width: 154 }}>
                <label className={styles.label}>VALOR</label>
                <input
                  type="number"
                  step="0.01"
                  className={styles.input}
                  placeholder="0,00"
                  {...register("value")}
                />
                {errors.value && (
                  <span className={styles.error}>{errors.value.message}</span>
                )}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>COMPROVANTE</label>
              <div className={styles.fileWrapper}>
                <input
                  type="text"
                  className={styles.fileInput}
                  placeholder="Nome do arquivo.pdf"
                  value={fileName}
                  readOnly
                />
                <label className={styles.uploadButton}>
                  <CloudArrowUp size={24} weight="bold" color="white" />
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
              </div>
              {fileError && <span className={styles.error}>{fileError}</span>}
            </div>

            {mutation.isError && (
              <p className={styles.error}>
                Erro ao criar reembolso. Tente novamente.
              </p>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
