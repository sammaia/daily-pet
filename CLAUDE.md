# PetCare — Plataforma SaaS para Creches Caninas

## Visão Geral

PetCare é uma plataforma que conecta tutores de cachorros a creches caninas. Tutores agendam, acompanham e pagam via app mobile. Creches gerenciam operação, pets, boletins diários e finanças via dashboard web. Sistema de pagamentos integrado com Asaas (Pix, boleto, cartão, recorrência, split).

## Stack Tecnológico

### Frontend Web
- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **UI:** Tailwind CSS + Lucide React (ícones)
- **Forms:** React Hook Form + @hookform/resolvers
- **Validação:** Zod
- **Hospedagem:** Vercel

### Mobile
- **Framework:** Flutter (Dart)
- **State Management:** Riverpod
- **Navegação:** GoRouter
- **HTTP:** Dio

### Backend
- **Runtime:** Node.js (Next.js API Routes)
- **Database:** Supabase PostgreSQL com RLS
- **Auth:** Supabase Auth (JWT)
- **Storage:** Supabase Storage
- **Realtime:** Supabase Realtime
- **API Pagamentos:** Asaas (v3) — Pix, boleto, cartão, recorrência, split

### DevOps
- **Infraestrutura:** Supabase Cloud
- **Hosting Web:** Vercel
- **CI/CD:** GitHub Actions (TBD)
- **Versionamento:** Git + GitHub

## Estrutura do Monorepo

```
petcare/
├── apps/
│   ├── web/                    # Dashboard web + landing (Next.js)
│   │   ├── src/
│   │   │   ├── app/            # Next.js App Router
│   │   │   ├── components/     # React components
│   │   │   ├── hooks/          # React hooks customizados
│   │   │   ├── lib/            # Utilitários (cn, supabase client, etc)
│   │   │   ├── types/          # TypeScript types + database.ts gerado
│   │   │   └── middleware.ts   # Auth middleware
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.js
│   │   └── next.config.js
│   │
│   └── mobile/                 # App tutor (Flutter)
│       ├── lib/
│       │   ├── features/       # Clean Architecture
│       │   ├── providers/      # Riverpod providers
│       │   └── main.dart
│       ├── pubspec.yaml
│       └── analysis_options.yaml
│
├── supabase/
│   ├── migrations/             # SQL migrations (.sql)
│   ├── functions/              # Edge Functions (TBD)
│   └── config.toml
│
├── docs/                       # Documentação
│   ├── API.md
│   ├── DATABASE.md
│   ├── WEBHOOKS.md
│   └── CONTRIBUTING.md
│
├── .claude/
│   └── agent-memory/
│       └── petcare-docs-keeper/  # Memória da documentação
│
├── .github/
│   └── workflows/              # CI/CD (TBD)
│
├── CLAUDE.md                   # Este arquivo
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── .gitignore
├── .env.example
└── .editorconfig
```

## Convenções de Código

### Geral
- **Database:** snake_case (tabelas, colunas, enums, functions)
- **TypeScript/JavaScript:** camelCase (variáveis, funções, propriedades)
- **React Components:** PascalCase (nomes de componentes e arquivos)
- **Flutter/Dart:** camelCase (funções, variáveis), PascalCase (classes)
- **Arquivos Web:** kebab-case (ex: `user-profile.tsx`, `api-key.ts`)
- **Arquivos Flutter:** snake_case (ex: `user_profile_screen.dart`)
- **Branches git:** kebab-case (ex: `feature/booking-flow`, `fix/payment-webhook`)
- **Commits:** imperative mood em inglês (ex: "Add user authentication", "Fix payment validation")

### TypeScript / JavaScript

- **Server Components por padrão** no Next.js, "use client" apenas quando necessário (interação, hooks de browser)
- **Validação com Zod** em todos os endpoints e forms
- **React Hook Form** para gerenciamento de formulários
- **cn()** helper para classes Tailwind condicionais:
  ```typescript
  import { cn } from "@/lib/utils"

  className={cn(
    "px-4 py-2 rounded",
    disabled && "opacity-50 cursor-not-allowed"
  )}
  ```
- **Supabase Clients:**
  - Server-side: `createServerClient()` em Server Components / Route Handlers
  - Client-side: `createBrowserClient()` em Client Components
- **Error Handling:** Sempre retornar `{ error: string, code: string }` em APIs
- **Timeouts:** APIs devem ter timeout de 30s
- **Logs:** usar `console.error()` apenas para erros críticos

### Flutter / Dart

- **Clean Architecture:** features/ → presentation/, providers/, repositories/
- **Riverpod** para state management (não BLoC)
- **GoRouter** para navegação
- **const constructors** sempre que possível (melhor performance)
- **Null Safety:** usar ! apenas quando 100% certo
- **Testes:** test/ espelhando estrutura lib/
- **Freezed** para immutability (TBD se for usar)

### Backend (API Routes)

- **Validação de Request:** usar Zod schemas
- **Autenticação:** verificar `Authorization: Bearer <token>` header
- **CORS:** configurado em middleware
- **Rate Limiting:** planejar após v1
- **Logging:** usar `console.log()` estruturado (JSON quando possível)
- **Tratamento de Erro:** sempre return `{ error: string, code: string, statusCode: number }`

## Banco de Dados

### Princípios
- UUIDs como primary keys (gerado pelo Supabase)
- RLS (Row Level Security) habilitado em TODAS as tabelas públicas
- Timestamps automáticos: `created_at`, `updated_at` (via triggers)
- Enums para valores fixos (ex: booking_status, payment_method, pet_gender)
- Foreign keys com ON DELETE CASCADE/RESTRICT apropriado
- Indexes em colunas frequentemente filtradas

### Tabelas Principais
<!-- TODO: Ler migrations reais e atualizar -->
- **users** — Tutores e admins
- **daycares** — Creches (unidades)
- **pets** — Cachorros cadastrados
- **bookings** — Agendamentos
- **report_cards** — Boletins diários
- **payments** — Registros de pagamento
- **transactions** — Transações financeiras (via Asaas)

### RLS Policies
- Tutores: veem apenas seus próprios dados e de seus pets
- Admins de creche: veem dados de sua creche
- Owners de creche: acesso total à sua creche
- Funcionários: acesso restrito conforme role

### Helper Functions (SQL)
- `is_creche_member(uuid)` — verifica se user é membro da creche
- `is_creche_admin(uuid)` — verifica se user é admin
- `is_creche_owner(uuid)` — verifica se user é owner

## Variáveis de Ambiente

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Asaas (Pagamentos)
```
NEXT_PUBLIC_ASAAS_ENVIRONMENT=sandbox
ASAAS_API_KEY=your-asaas-api-key-here
ASAAS_WEBHOOK_TOKEN=your-webhook-verification-token
```

### App
```
NEXT_PUBLIC_APP_URL=https://app.petcare.com.br
NEXT_PUBLIC_APP_ENVIRONMENT=production
```

### Firebase (Push Notifications)
```
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxx@your-project.iam.gserviceaccount.com
```

**Nunca commitar .env com valores reais. Usar .env.example com valores fictícios.**

## Comandos Úteis

### Desenvolvimento Web
```bash
cd apps/web

# Start dev server (port 3000)
npm run dev

# Build para produção
npm run build

# Start production server
npm start

# Lint com ESLint
npm run lint

# Format código (TBD)
npm run format
```

### Desenvolvimento Mobile
```bash
cd apps/mobile

# Rodar no emulador/dispositivo
flutter run

# Build Android APK
flutter build apk --release

# Build iOS
flutter build ios --release

# Gerar código Riverpod/Freezed
dart run build_runner build

# Lint + Format
dart fix --apply
dart format lib/ test/
```

### Supabase
```bash
# Start Supabase local
supabase start

# Reset banco + rodar todas migrations
supabase db reset

# Criar migration
supabase migration new create_users_table

# Gerar tipos TypeScript (web)
supabase gen types typescript --local > apps/web/src/types/database.ts

# Push migrations pro remoto
supabase db push

# Ver logs Supabase
supabase functions logs
```

### Git & Deploy
```bash
# Deploy web (automático via Vercel após merge em main)
# Ou trigger manual via Vercel dashboard

# Ver migrations aplicadas
git log supabase/migrations/

# Check Vercel deployment status
vercel status
```

## Decisions de Arquitetura

### Por que Asaas e não Stripe?
- Stripe não suporta Pix nativamente (apenas via Pagar.me)
- Asaas tem melhor suporte a boleto + recorrência em Real
- Webhook mais confiável para nosso use case
- Split de pagamento nativo (creche + PetCare)

### Por que Supabase e não Firebase?
- RLS nativo para segurança de dados (crucial em creche/pet)
- PostgreSQL oferece mais flexibilidade para queries complexas
- Edge Functions para lógica server-side customizada
- Pricing mais previsível (pay-as-you-go não penaliza startups)

### Por que Flutter e não React Native?
- Performance melhor em UI pesada (boletins, fotos)
- Widget tree mais simples que JSX
- Null Safety obrigatório (menos bugs)
- Hot Reload mais rápido que Fast Refresh

### Por que Next.js App Router?
- Server Components reduzem bundle JavaScript
- API Routes integradas (sem servidor separado)
- Zero-config deployment em Vercel
- Melhor suporte a Streaming de dados

## Agentes Disponíveis

Cada agente possui especialização e memória persistente:

- **petcare-architect** — Decisões arquiteturais, planejamento de features complexas, trade-offs
- **petcare-frontend** — Desenvolvimento Next.js, componentes React, Tailwind, forms
- **petcare-backend** — API Routes, lógica de negócio, queries Supabase
- **petcare-mobile-dev** — App Flutter, Riverpod, navegação, integração API
- **supabase-petcare-db** — Migrations SQL, RLS policies, triggers, Edge Functions
- **asaas-payment-integrator** — Integração Asaas, webhooks, split, recorrência
- **petcare-qa-reviewer** — Testes, verificação de qualidade, checklist
- **petcare-docs-keeper** — Documentação (você está aqui), READMEs, changelogs, guides

## Fluxo de Delegação de Trabalho

1. **Iniciar feature complexa:** Consultar `petcare-architect` para validar design
2. **Implementar frontend:** `petcare-frontend` + `petcare-qa-reviewer`
3. **Implementar backend:** `petcare-backend` + testes
4. **Implementar mobile:** `petcare-mobile-dev`
5. **Mudanças de schema:** `supabase-petcare-db` + atualizar documentação com `petcare-docs-keeper`
6. **Integrar pagamentos:** `asaas-payment-integrator` (sempre seguir este agente)
7. **Antes de deploy:** `petcare-qa-reviewer` rodando suite completa
8. **Após merge main:** `petcare-docs-keeper` atualiza CHANGELOG.md

## Padrões de Dados (Glossário)

| Termo | Definição | Exemplo |
|-------|-----------|---------|
| **Tutor** | Dono do pet, cliente final | João Silva (dono de Fluffy) |
| **Pet** | Cachorro cadastrado no sistema | Fluffy (Golden Retriever, 3 anos) |
| **Creche** | Unidade/estabelecimento | Creche PetCare Centro (Belo Horizonte) |
| **Booking** | Agendamento de dia na creche | 25/02/2026 — Fluffy na Creche Centro |
| **Report Card** | Boletim diário do pet | Fluffy: comeu bem, brincou 2h, descansou |
| **Payment** | Pagamento de booking | R$ 80,00 via Pix em 25/02/2026 |
| **Transaction** | Registro financeiro (Asaas) | Pix receivido, split: 80% creche, 20% PetCare |
| **Split** | Divisão de pagamento | Creche recebe 80%, PetCare fica com 20% |
| **Subscription** | Plano mensal (TBD) | Plano Ilimitado 20 dias/mês por R$ 299 |

## Verificação de Código

Antes de mergear PRs, validar:

- [ ] Tipos TypeScript corretos, sem `any`
- [ ] Zod schemas para todas as inputs (API routes, forms)
- [ ] Supabase RLS policy checklist (user é admin? dono? pode ver esse dado?)
- [ ] Tratamento de erro em todos os try/catch
- [ ] Variáveis de ambiente usadas corretamente (não hardcoded)
- [ ] README/docs atualizado se feature é user-facing
- [ ] Migrations criadas (se mudança de schema)
- [ ] Tests passam (antes de rodar `petcare-qa-reviewer`)
- [ ] Sem console.logs em produção (exceto errors críticos)
- [ ] Rate limiting, timeout, logging implementado (se API)

## Recursos Internos

- **Documentação:** /docs/
- **Migrations:** /supabase/migrations/
- **GitHub:** https://github.com/your-org/petcare
- **Vercel:** https://vercel.com/dashboard
- **Supabase:** https://app.supabase.com/

## Changelog
Veja CHANGELOG.md para histórico de mudanças.

---

**Última atualização:** 23 de fevereiro de 2026
**Mantido por:** petcare-docs-keeper
