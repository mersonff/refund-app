export interface Receipt {
  id: string
  originalFilename: string
  filename: string
  extname: string
  path: string
  refundId: string | null
  createdAt: string
  updatedAt: string
}

export interface Refund {
  id: string
  title: string
  category: string
  value: number
  deletedAt: string | null
  createdAt: string
  updatedAt: string
  receipt: Receipt | null
}

export interface PaginationMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string | null
  previousPageUrl: string | null
}

export interface RefundsResponse {
  refunds: {
    meta: PaginationMeta
    data: Refund[]
  }
}

export type RefundCategory = "food" | "transport" | "hosting" | "services" | "other"

export const CATEGORY_LABELS: Record<RefundCategory, string> = {
  food: "Alimentação",
  transport: "Transporte",
  hosting: "Hospedagem",
  services: "Serviços",
  other: "Outros",
}
