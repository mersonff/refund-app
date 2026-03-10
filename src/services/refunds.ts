import { api } from "./api"
import type { Refund, RefundsResponse } from "../types/refund"

interface CreateRefundData {
  title: string
  category: string
  value: number
  receipt: string
}

export async function getRefunds(page = 1, search = ""): Promise<RefundsResponse["refunds"]> {
  const params: Record<string, string | number> = { page }
  if (search) params.q = search

  const { data } = await api.get<RefundsResponse>("/refunds", { params })
  return data.refunds
}

export async function getRefund(id: string): Promise<Refund> {
  const { data } = await api.get<{ refund: Refund }>(`/refunds/${id}`)
  return data.refund
}

export async function createRefund(refundData: CreateRefundData): Promise<Refund> {
  const { data } = await api.post<{ refund: Refund }>("/refunds", refundData)
  return data.refund
}

export async function deleteRefund(id: string): Promise<void> {
  await api.delete(`/refunds/${id}`)
}
