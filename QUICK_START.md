# Quick Start — PetCare

Guia rápido para iniciar desenvolvimento no PetCare. Para instruções detalhadas, veja README.md.

## 1. Clonar e Instalar

```bash
git clone https://github.com/your-org/petcare.git
cd petcare

# Web dependencies
cd apps/web && npm install && cd ../..

# Mobile dependencies
cd apps/mobile && flutter pub get && cd ../..
```

## 2. Configurar Environment

```bash
# Copiar template
cp .env.example .env.local

# Editar com suas chaves (Supabase + Asaas)
nano .env.local
```

## 3. Iniciar Supabase Local

```bash
# Primeira vez
supabase start
supabase db reset

# Parar depois
supabase stop
```

## 4. Rodar Aplicações

### Terminal 1 — Web (http://localhost:3000)
```bash
cd apps/web
npm run dev
```

### Terminal 2 — Mobile
```bash
cd apps/mobile
flutter run
```

## Troubleshooting Rápido

| Erro | Solução |
|------|---------|
| "Cannot find module @supabase/ssr" | `cd apps/web && npm install` |
| Supabase não responde | `supabase stop && supabase start` |
| Flutter build fails | `flutter clean && flutter pub get` |
| Port 3000 em uso | `kill -9 $(lsof -t -i:3000)` ou mudar porta |

## Próximos Passos

1. Ler CLAUDE.md para entender stack
2. Ler docs/CONTRIBUTING.md para padrões de código
3. Ler docs/DOCUMENTATION_ROADMAP.md para tarefas de doc
4. Criar branch: `git checkout -b feature/sua-feature`
5. Desenvolver + commitar + abrir PR

---

Para mais detalhes: veja README.md e CLAUDE.md
