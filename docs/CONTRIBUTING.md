# Guia de Contribuição — PetCare

Bem-vindo ao projeto PetCare! Este documento descreve como contribuir com código, documentação e ideias.

## Código de Conduta

Somos uma comunidade respeitosa. Esperamos que todos os contribuidores se comportem de forma profissional e inclusiva.

## Como Começar

1. Faça fork do repositório
2. Crie uma branch local (`git checkout -b feature/sua-feature`)
3. Commite suas mudanças
4. Faça push para seu fork
5. Abra uma Pull Request

## Fluxo de Branches

Utilizamos **Git Flow** modificado:

```
main (production)
 ├── hotfix/* (bugs críticos)
 │
develop (staging)
 ├── feature/* (features novas)
 ├── fix/* (bugs não-críticos)
 ├── docs/* (documentação)
 ├── refactor/* (refatoração)
 └── test/* (testes)
```

### Nomenclatura de Branches

Use a convenção: `type/short-description`

- `feature/booking-payment-flow` — nova funcionalidade
- `fix/payment-webhook-timeout` — correção de bug
- `refactor/user-schema` — refatoração sem mudança de comportamento
- `docs/database-schema` — apenas documentação
- `test/booking-e2e` — adição de testes
- `hotfix/auth-security` — fix crítico em produção

**Regra:** Use kebab-case em todos os nomes de branches.

## Convenções de Commit

Seguimos **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos Válidos

- **feat** — Nova funcionalidade
- **fix** — Correção de bug
- **docs** — Alterações em documentação
- **style** — Formatação, sem mudança de lógica (espaços, semicolons)
- **refactor** — Refatoração de código
- **perf** — Melhoria de performance
- **test** — Adição ou atualização de testes
- **chore** — Build, deps, CI/CD, etc

### Exemplos

```bash
# Nova feature
git commit -m "feat(booking): add recurring booking support

- Add subscription_id to bookings table
- Implement monthly recurrence logic
- Add cancellation handling

Closes #123"

# Bug fix
git commit -m "fix(auth): prevent double login on fast clicks

- Add loading state to login button
- Debounce form submission"

# Documentação
git commit -m "docs: update database schema guide"

# Refatoração
git commit -m "refactor(api): extract payment validation to utils"
```

## Padrões de Código

### TypeScript / React (Web)

- **Sem `any`** — sempre tipar corretamente
- **Server Components por padrão** — apenas "use client" quando necessário
- **Validação com Zod** em todos os endpoints e forms
- **React Hook Form** para forms complexos
- **Component Naming:** PascalCase + arquivo kebab-case
  ```typescript
  // File: user-profile-card.tsx
  export function UserProfileCard({ user }: Props) {
    return <div>...</div>
  }
  ```
- **Utilitários:** use a pasta `lib/` para funções compartilhadas
  ```typescript
  // lib/format-date.ts
  export function formatDate(date: Date): string { ... }

  // app/bookings/page.tsx
  import { formatDate } from "@/lib/format-date"
  ```

### Flutter / Dart

- **Estrutura Clean Architecture:** features/ → presentation, providers, repositories
- **Const constructors:** sempre que possível
- **Null Safety:** usar ! apenas quando 100% seguro
- **Nomes de arquivos:** snake_case
  ```dart
  // File: user_profile_screen.dart
  class UserProfileScreen extends StatelessWidget {
    const UserProfileScreen({Key? key}) : super(key: key);
    ...
  }
  ```
- **Riverpod para state:** não use BLoC
  ```dart
  final userProvider = FutureProvider((ref) async {
    return await ref.watch(supabaseRepositoryProvider).getUser();
  });
  ```

### SQL (Migrations)

- **snake_case** para todos os identificadores (tabelas, colunas, constraints)
- **UUIDs** como primary keys
- **NOT NULL** por padrão (nullable explicitamente)
- **Índices** em colunas frequentemente filtradas
- **Foreign keys** com política de deleção apropriada
- **Timestamps:** `created_at` e `updated_at` via triggers
- **Comentários** explicando lógica complexa

```sql
-- migrations/20260223_create_bookings_table.sql

CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  pet_id uuid NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
  creche_id uuid NOT NULL REFERENCES public.daycares(id) ON DELETE RESTRICT,

  booking_date date NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending'::booking_status,

  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),

  CONSTRAINT check_booking_date CHECK (booking_date >= CURRENT_DATE),
  UNIQUE(pet_id, booking_date)  -- Pet não pode ser agendado 2x mesmo dia
);

CREATE INDEX idx_bookings_tutor_id ON public.bookings(tutor_id);
CREATE INDEX idx_bookings_creche_id ON public.bookings(creche_id);
CREATE INDEX idx_bookings_booking_date ON public.bookings(booking_date);

COMMENT ON TABLE public.bookings IS 'Agendamentos de pets em creches';
COMMENT ON COLUMN public.bookings.status IS 'pending: aguardando pagamento, confirmed: pago, cancelled: cancelado';
```

## Testes

- **Testes unitários** em `test/` espelhando estrutura `lib/`
- **Testes de integração** para fluxos críticos (booking, pagamento)
- **E2E tests** para user journeys principais (TBD)

```bash
# Web tests
cd apps/web
npm run test

# Mobile tests
cd apps/mobile
flutter test
```

### Coverage Mínimo
- Features críticas: 80%+
- API routes: 90%+
- Utilitários: 70%+

## Code Review Checklist

Ao abrir uma PR, verifique:

### Código
- [ ] Sem `console.log` em produção (exceto errors críticos)
- [ ] Sem `any` em TypeScript
- [ ] Sem hardcoding de secrets ou URLs
- [ ] Nomes de variáveis claros
- [ ] Funções têm responsabilidade única
- [ ] Código removido/comentado foi deletado

### Testes
- [ ] Testes adicionados/atualizados
- [ ] Suite de testes passa (`npm test` ou `flutter test`)
- [ ] Coverage adequado

### Banco de Dados
- [ ] Migrations criadas (se schema mudou)
- [ ] RLS policies verificadas
- [ ] Nenhuma query sem índices em tabelas grandes
- [ ] Timestamps automáticos incluídos

### Segurança
- [ ] Validação de entrada com Zod
- [ ] Autenticação verificada
- [ ] RLS policies testadas (user vê apenas seus dados)
- [ ] Sem SQL injection (use parameterized queries)
- [ ] Sem XSS (escape HTML, use React's default)

### Performance
- [ ] Não há N+1 queries
- [ ] Images otimizadas (para web)
- [ ] Lazy loading implementado (se aplicável)
- [ ] Bundle size verificado (web)

### Documentação
- [ ] README atualizado (se user-facing)
- [ ] JSDoc em funções públicas
- [ ] CHANGELOG.md atualizado
- [ ] Variáveis de ambiente documentadas (se novas)

### Deploy
- [ ] Migrations podem rodar sem downtime
- [ ] Rollback strategy existe
- [ ] Env vars necessárias estão em `.env.example`

## Processo de Pull Request

1. **Criar PR** com template (autofill no GitHub)
2. **Descrever mudanças** — o que mudou e por quê
3. **Linkar issue** — `Closes #123` ou `Related to #123`
4. **Aguardar review** — pelo menos 2 aprovações
5. **Resolver comentários** — discuta se não concordar
6. **Merge** — squash com mensagem clara (não merge commit)

### Template de PR

```markdown
## Descrição
Descreva o que foi feito e por quê em 2-3 frases.

## Tipo de Mudança
- [ ] Nova funcionalidade
- [ ] Correção de bug
- [ ] Melhoria de documentação
- [ ] Refatoração

## Mudanças
- Item 1
- Item 2
- Item 3

## Testes
Como testar as mudanças:
1. Passo 1
2. Passo 2

## Checklist
- [ ] Código foi lintado
- [ ] Testes passam
- [ ] Documentação atualizada
- [ ] Sem breaking changes (ou versão bumped)

Closes #123
```

## Versionamento

Usamos **Semantic Versioning** (semver):

```
MAJOR.MINOR.PATCH
  ↑      ↑      ↑
  │      │      └─ Patch: bugs
  │      └────────── Minor: features (backward compatible)
  └─────────────── Major: breaking changes
```

Exemplos:
- `1.0.0` → v1.0.0 (release inicial)
- `1.0.1` → fix de bug
- `1.1.0` → nova feature
- `2.0.0` → breaking change

## Documentação

- **Inline comments** em código complexo (algoritmos, lógica de negócio)
- **JSDoc** em funções públicas (TypeScript)
- **README.md** em cada pasta raiz (apps/, supabase/)
- **Guides** em docs/ para fluxos complexos (booking, pagamento)
- **API.md** com todos os endpoints
- **DATABASE.md** com schema completo
- **Português** para docs internas, **Inglês** para código

## CI/CD

Checklist que roda automaticamente em cada PR:

- [ ] Linting (ESLint, Dart Analyzer)
- [ ] Type checking (TypeScript)
- [ ] Tests (Jest, Flutter Test)
- [ ] Build (Next.js, Flutter)
- [ ] Security scan (TBD)

Todas as checks devem passar antes de merge.

## Deployments

### Development
Push para branch `develop` → Deploy automático em staging.supabase.com

### Production
Push para branch `main` → Deploy automático em vercel.com

### Database
```bash
# Push migrations
supabase db push

# Ver status
supabase migration list
```

## Problemas Comuns

### "Minha branch está desatualizada com develop"
```bash
git fetch origin
git rebase origin/develop
# Resolve conflitos se necessário
git push --force-with-lease origin feature/minha-feature
```

### "Cometi no branch errado"
```bash
git reset --soft HEAD~1  # Desfaz commit, mantém changes
git checkout -b feature/nome-correto
git commit -m "..."
```

### "Quero descartar minhas mudanças"
```bash
git reset --hard origin/develop  # CUIDADO: perde tudo localmente
```

## Perguntas?

- Abra uma issue no GitHub
- Converse em GitHub Discussions
- Pergunte em #dev-help no Slack

---

Obrigado por contribuir! Sua ajuda é essencial para tornar PetCare melhor.

Mantido por: PetCare Dev Team
Última atualização: 23 de fevereiro de 2026
