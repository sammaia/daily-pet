# Memória — PetCare Docs Keeper

## Projeto PetCare

**Tipo:** SaaS — Plataforma de creche para cachorros (DailyPet)
**Stack:** Next.js 16 (web) + Flutter (mobile) + Supabase + Asaas
**Monorepo:** /Users/samanthamaia/development/devlup/petcare/

### Estrutura Confirmada
- apps/web/ — Next.js 16 + TypeScript + Tailwind + Supabase SSR
- apps/mobile/ — Flutter
- supabase/migrations/ — SQL migrations
- docs/ — Documentação técnica
- .claude/agent-memory/ — Memória dos agentes

### Stack Web Confirmado
- Next.js 16.1.6
- React 19.2.3
- @supabase/supabase-js 2.97.0
- @supabase/ssr 0.8.0
- React Hook Form + Zod (validação)
- Tailwind CSS
- Lucide React (ícones)
- Date-fns 4.1.0

### Variáveis de Ambiente
Locais em .env.local:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_ASAAS_ENVIRONMENT (sandbox/production)
- ASAAS_API_KEY
- ASAAS_WEBHOOK_TOKEN
- NEXT_PUBLIC_APP_URL
- FIREBASE_* (para push notifications)

### Convenções Confirmadas
- DB: snake_case
- TypeScript/JS: camelCase
- React components: PascalCase (file: kebab-case)
- Dart: snake_case (files), PascalCase (classes)
- Branches: kebab-case, tipo/descrição
- Commits: Conventional Commits (feat, fix, docs, etc)

### Termos de Negócio
- **tutor** = dono do pet
- **pet** = cachorro
- **creche** = unidade de daycare
- **booking** = agendamento
- **report_card** = boletim diário
- **payment/transaction** = pagamento via Asaas
- **split** = divisão de pagamento (creche vs PetCare)

### Agentes Especializados
1. petcare-architect — design/decisions
2. petcare-frontend — Next.js + React
3. petcare-backend — API Routes + Supabase
4. petcare-mobile-dev — Flutter
5. supabase-petcare-db — SQL/migrations/RLS
6. asaas-payment-integrator — pagamentos
7. petcare-qa-reviewer — testes/QA
8. petcare-docs-keeper — docs (você)

### Arquivos Raiz Criados (23/02/2026)
- CLAUDE.md — Contexto técnico completo para agentes
- README.md — Setup local + overview
- CONTRIBUTING.md — Padrões de código + fluxo de branches
- CHANGELOG.md — Versionamento SemVer
- .gitignore — Node + Flutter + Next
- .env.example — Variáveis necessárias (sem valores reais)
- .editorconfig — Consistência IDE
- docs/README.md — Índice de documentação

### Próximos Documentos (TODO)
- docs/API.md — Endpoints REST (ler apps/web/src/app/api/)
- docs/DATABASE.md — Schema + RLS (ler supabase/migrations/)
- docs/WEBHOOKS.md — Asaas webhooks
- docs/ARCHITECTURE.md — Decisões de design
- docs/DEPLOYMENT.md — CI/CD + deploy

## User Preferences

- Idioma: PT para docs internas, EN para código
- Sem emojis em documentação
- Absolute paths only
- Verificação rigorosa de código antes de documentar
- Exemplos práticos em todos os docs
