# Refund System

Sistema de solicitação de reembolsos corporativos.

## Stack

- React 19 + TypeScript
- Vite
- React Router DOM
- TanStack React Query
- React Hook Form + Zod
- Phosphor Icons
- CSS Modules

## Pré-requisitos

- Node.js 20+
- [refund-api](https://github.com/mersonff/refund-api) rodando em `http://localhost:3333`

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Listagem de solicitações com busca e paginação |
| `/new` | Nova solicitação de reembolso |
| `/refund/:id` | Detalhes da solicitação |
| `/success` | Confirmação de envio |
