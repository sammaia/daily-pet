# PetCare — Plataforma SaaS para Creches Caninas

Plataforma que conecta tutores de cachorros a creches caninas. Tutores agendam, acompanham e pagam via app mobile. Creches gerenciam operação, pets, boletins diários e finanças via dashboard web.

## Características

- Dashboard web para gerenciamento de creches
- App mobile para tutores agendar e acompanhar pets
- Sistema integrado de pagamentos com Asaas (Pix, boleto, cartão)
- Boletins diários com fotos e observações
- Notificações push em tempo real
- Autenticação segura com Supabase Auth

## Pré-requisitos

- **Node.js** 18.0 ou superior
- **npm** ou **yarn** (package managers)
- **Flutter** 3.x (para desenvolvimento mobile)
- **Supabase CLI** para gerenciar banco de dados local
- **Git**

### Instalação dos Pré-requisitos

```bash
# Verificar versões
node --version    # v18.0.0 ou superior
npm --version     # 9.0.0 ou superior

# Instalar Flutter (macOS com Homebrew)
brew install flutter

# Instalar Supabase CLI
brew install supabase/tap/supabase
```

## Setup Local

### 1. Clonar Repositório

```bash
git clone https://github.com/your-org/petcare.git
cd petcare
```

### 2. Instalar Dependências

#### Web
```bash
cd apps/web
npm install
```

#### Mobile
```bash
cd apps/mobile
flutter pub get
```

### 3. Configurar Variáveis de Ambiente

Copiar `.env.example` para `.env.local` em cada aplicação:

```bash
# Na raiz do projeto (Supabase + Asaas globais)
cp .env.example .env.local

# Editar e adicionar suas chaves (veja instruções em .env.example)
```

### 4. Inicializar Banco de Dados Local

```bash
# Iniciar Supabase local
supabase start

# Rodar migrations
supabase db reset
```

Supabase estará disponível em `http://localhost:54321`

### 5. Rodar Aplicações

#### Web (Dashboard)
```bash
cd apps/web
npm run dev
```
Acesso: http://localhost:3000

#### Mobile
```bash
cd apps/mobile
flutter run
```

## Estrutura do Projeto

```
petcare/
├── apps/
│   ├── web/            # Dashboard web (Next.js)
│   └── mobile/         # App tutor (Flutter)
├── supabase/
│   └── migrations/     # SQL migrations
├── docs/
│   ├── API.md         # Documentação de endpoints
│   ├── DATABASE.md    # Schema do banco
│   ├── WEBHOOKS.md    # Webhooks do Asaas
│   └── CONTRIBUTING.md # Guia de contribuição
├── CLAUDE.md          # Contexto para agentes IA
├── README.md          # Este arquivo
├── CHANGELOG.md       # Histórico de mudanças
└── .env.example       # Template de variáveis de ambiente
```

## Scripts do Package.json

### Web (apps/web/)

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (port 3000) |
| `npm run build` | Build para produção |
| `npm start` | Inicia servidor de produção |
| `npm run lint` | Executa ESLint |

### Mobile (apps/mobile/)

| Comando | Descrição |
|---------|-----------|
| `flutter run` | Rodar no emulador/dispositivo |
| `flutter build apk --release` | Build Android APK |
| `flutter build ios --release` | Build iOS |
| `dart run build_runner build` | Gerar código (Riverpod, Freezed) |
| `dart fix --apply` | Lint automático |

## Desenvolvimento

Para detalhes sobre conventions de código, decisões arquiteturais e fluxos de trabalho, veja:

- **CLAUDE.md** — Contexto técnico completo
- **docs/CONTRIBUTING.md** — Guia de contribuição
- **docs/API.md** — Documentação de endpoints
- **docs/DATABASE.md** — Schema do banco de dados

## Variáveis de Ambiente Essenciais

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Asaas (Pagamentos)
ASAAS_API_KEY=your-api-key
ASAAS_WEBHOOK_TOKEN=your-webhook-token

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_ENVIRONMENT=development
```

Veja `.env.example` para configuração completa.

## Deploy

### Web (Vercel)

1. Push para main branch
2. Vercel dispara build automaticamente
3. Preview URL gerada em cada PR

```bash
# Deploy manual (se necessário)
vercel deploy --prod
```

### Banco de Dados (Supabase)

```bash
# Push migrations para produção
supabase db push
```

### Mobile (App Stores)

TBD — Processo de submission para Google Play e App Store

## Troubleshooting

### Erro: "Cannot find module @supabase/ssr"
```bash
cd apps/web
npm install
```

### Supabase não conecta
```bash
# Verificar se containers estão rodando
supabase status

# Reiniciar
supabase stop
supabase start
```

### Flutter pub get falhando
```bash
flutter clean
flutter pub get
```

## Contribuindo

Leia [CONTRIBUTING.md](./docs/CONTRIBUTING.md) para padrões de código, fluxo de branches e processo de PR.

## Changelog

Veja [CHANGELOG.md](./CHANGELOG.md) para histórico de mudanças.

## Contato

- GitHub Issues para bugs
- Discussões em GitHub para features
- Email: dev@petcare.com.br (TBD)

## Licença

TBD

---

Mantido por: PetCare Dev Team
Última atualização: 23 de fevereiro de 2026
