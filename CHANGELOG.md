# Changelog — PetCare

Todas as mudanças significativas neste projeto serão documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), e o versionamento segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

## Unreleased (Em Desenvolvimento)

### Added
- Base de projeto com monorepo (web + mobile)
- Dashboard web inicial (Next.js 16)
- App mobile inicial (Flutter)
- Supabase PostgreSQL local
- Autenticação com Supabase Auth
- Asaas payment gateway integration (placeholder)

### Changed
- TBD

### Deprecated
- TBD

### Removed
- TBD

### Fixed
- TBD

### Security
- TBD

---

## [0.1.0] — 23 de Fevereiro de 2026

### Added
- Scaffold inicial do projeto PetCare
- CLAUDE.md com contexto arquitetural
- README.md com instruções de setup
- CONTRIBUTING.md com padrões de código
- CHANGELOG.md para versionamento
- .gitignore para Node.js, Flutter, Next.js
- .env.example com variáveis necessárias
- Estrutura monorepo: apps/web, apps/mobile, supabase/
- CI/CD placeholder (TBD)
- Documentation structure: docs/

---

## [Versões Anteriores]

Não há versões anteriores. Este é o início do projeto PetCare.

---

### Notas de Desenvolvimento

#### Release Notes Template

Ao criar nova versão, use este template:

```markdown
## [X.Y.Z] — YYYY-MM-DD

### Added
- Descrição da feature 1
- Descrição da feature 2

### Changed
- O que mudou na feature existente

### Deprecated
- O que vai ser removido em versão futura

### Removed
- O que foi removido nesta versão

### Fixed
- O que foi corrigido (bugs)

### Security
- Se houver patches de segurança

### Links
- [PR #123](https://github.com/org/petcare/pull/123)
- [Issue #456](https://github.com/org/petcare/issues/456)
```

#### Como Fazer Release

1. Atualizar CHANGELOG.md movendo "Unreleased" para nova versão
2. Bumpar versão em `apps/web/package.json` e `apps/mobile/pubspec.yaml`
3. Criar tag git: `git tag v0.2.0`
4. Push tag: `git push origin v0.2.0`
5. GitHub Actions dispara build e deployment automático

---

Mantido por: PetCare Dev Team
Última atualização: 23 de fevereiro de 2026
