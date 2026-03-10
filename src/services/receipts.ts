import { api } from "./api"
import type { Receipt } from "../types/refund"

export async function uploadReceipt(file: File): Promise<Receipt> {
  const formData = new FormData()
  formData.append("receiptFile", file)

  const { data } = await api.post<{ receipt: Receipt }>("/receipts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return data.receipt
}

export async function getReceipt(id: string): Promise<Receipt> {
  const { data } = await api.get<{ receipt: Receipt }>(`/receipts/${id}`)
  return data.receipt
}

export async function deleteReceipt(id: string): Promise<void> {
  await api.delete(`/receipts/${id}`)
}

export function getReceiptDownloadUrl(id: string): string {
  return `http://localhost:3333/receipts/download/${id}`
}
