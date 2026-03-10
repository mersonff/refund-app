import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Home } from "./pages/Home"
import { NewRefund } from "./pages/NewRefund"
import { RefundDetails } from "./pages/RefundDetails"
import { Success } from "./pages/Success"
import "./styles/global.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewRefund />} />
          <Route path="/refund/:id" element={<RefundDetails />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
