# Roadmap de Documentação — PetCare

Este arquivo rastreia a documentação ainda a ser criada e atualizada.

## Documentação Crítica (PRIORIDADE ALTA)

### 1. API.md
**Status:** TODO
**Responsável:** petcare-backend
**Descrição:** Documentação de todos os endpoints da aplicação

**Seções necessárias:**
- Authentication endpoints (login, logout, signup)
- Booking endpoints (criar, listar, cancelar agendamentos)
- Pet endpoints (CRUD de pets)
- Creche endpoints (CRUD de creches, gestão de staff)
- Payment endpoints (criar pagamento, webhooks)
- Report Card endpoints (criar, atualizar boletins)
- User endpoints (perfil, editar dados)

**Formato:** OpenAPI 3.0 (YAML) + exemplos Markdown
**Localização:** docs/API.md
**Próximas ações:**
1. Ler apps/web/src/app/api/**/*.ts
2. Documentar cada rota com: método HTTP, path, params, body, responses, autenticação
3. Incluir exemplos de curl e fetch
4. Validar com qa-reviewer

---

### 2. DATABASE.md
**Status:** TODO
**Responsável:** supabase-petcare-db
**Descrição:** Schema completo do Supabase com RLS policies

**Seções necessárias:**
- Diagrama ER em Mermaid
- Tabelas (descrição, colunas, tipos, constraints)
- Enums (booking_status, pet_gender, user_role, etc)
- RLS Policies (por tabela, explicando quem pode ler/escrever)
- Índices (performance considerations)
- Triggers (created_at, updated_at, etc)
- Helper functions (is_creche_member, is_creche_admin, etc)

**Formato:** Markdown com Mermaid
**Localização:** docs/DATABASE.md
**Próximas ações:**
1. Ler supabase/migrations/*.sql
2. Extrair schema e diagramar
3. Documentar cada tabela + RLS
4. Criar guia de queries comuns

---

### 3. WEBHOOKS.md
**Status:** TODO
**Responsável:** asaas-payment-integrator
**Descrição:** Documentação de webhooks Asaas e handlers

**Seções necessárias:**
- Lista de webhook events (charge.paid, charge.failed, subscription.created, etc)
- URL do handler para cada webhook
- Payload de exemplo (JSON)
- Como validar assinatura (ASAAS_WEBHOOK_TOKEN)
- Lógica do handler (o que faz com cada evento)
- Tratamento de erros
- Retentativas da Asaas
- Testes de webhook

**Formato:** Markdown + JSON examples
**Localização:** docs/WEBHOOKS.md
**Próximas ações:**
1. Ler apps/web/src/app/api/webhooks/asaas/route.ts
2. Listar todos os eventos Asaas que recebemos
3. Documentar validação, parsing, db updates
4. Criar diagrama de fluxo de pagamento

---

## Documentação Importante (PRIORIDADE MÉDIA)

### 4. ARCHITECTURE.md
**Status:** TODO
**Descrição:** Decisões arquiteturais e fluxos de negócio

**Seções:**
- Tech Stack decisions (por que Next.js, Flutter, Supabase, Asaas)
- Fluxo de agendamento (booking flow) — Mermaid
- Fluxo de pagamento (payment flow) — Mermaid
- Fluxo de autenticação (auth flow) — Mermaid
- RLS strategy (como garantir segurança de dados)
- Error handling strategy
- Logging strategy
- Performance considerations

---

### 5. DEPLOYMENT.md
**Status:** TODO
**Descrição:** Como fazer deploy, CI/CD, ambientes

**Seções:**
- Environments (dev, staging, production)
- Vercel deployment (web)
- Supabase database deployment
- Secrets management
- Monitoring e alertas
- Rollback procedures
- Database migrations in production
- Zero-downtime deployment strategy

---

## Documentação Complementar (PRIORIDADE BAIXA)

### 6. SETUP_ADVANCED.md
Instruções de setup avançado (debugging, testes, local development customization)

### 7. SECURITY.md
Guia de segurança: RLS, autenticação, dados sensíveis, auditoria

### 8. PERFORMANCE.md
Performance optimization guide: caching, indexing, bundle analysis, mobile optimization

### 9. GLOSSARY.md
Glossário de termos de negócio + técnicos (tutor, pet, creche, booking, etc)

---

## Checklist de Criação de Documento

Ao criar um documento novo, verificar:

- [ ] Título claro em h1
- [ ] Overview em 1-2 parágrafos
- [ ] Seções bem hierarquizadas (h2, h3)
- [ ] Exemplos de código com language tags
- [ ] Diagramas Mermaid onde aplicável
- [ ] Links internos funcionais
- [ ] Nenhuma informação sensível (secrets, URLs reais)
- [ ] Português para conteúdo, Inglês para código
- [ ] Footer com "Mantido por: [agente]" e data
- [ ] Link adicionado em docs/README.md
- [ ] CLAUDE.md atualizado se mudança estrutural

## Como Colaborar

1. Escolha um documento do roadmap (TODO status)
2. Faça branch: `git checkout -b docs/nome-documento`
3. Crie/edite docs/[nome].md
4. Abra PR com template CONTRIBUTING.md
5. Aguarde aprovação de petcare-qa-reviewer
6. Merge + atualizar CHANGELOG.md

---

**Última atualização:** 23 de fevereiro de 2026
**Mantido por:** petcare-docs-keeper
