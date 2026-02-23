# DailyPet Mobile — Agent Memory

## Stack
- Framework: Flutter (Dart)
- App path: /Users/samanthamaia/development/devlup/petcare/apps/mobile/
- App name: dailypet | Org: com.dailypet
- Flutter 3.38.9 / Dart 3.10.8

## Dependências principais
- Navegação: go_router ^14.0.0
- Estado: flutter_riverpod ^2.6.1 + riverpod_annotation ^2.6.1
- Backend: supabase_flutter ^2.0.0
- HTTP: dio ^5.0.0
- Imagens: cached_network_image ^3.0.0 + image_picker ^1.0.0
- Push: firebase_core ^3.0.0 + firebase_messaging ^15.0.0
- Notifications locais: flutter_local_notifications ^17.0.0
- Gráficos: fl_chart ^0.68.0
- Storage seguro: flutter_secure_storage ^9.0.0
- Code gen: riverpod_generator + build_runner

## Arquitetura
Clean Architecture em features:
- lib/features/{feature}/presentation/pages/ — telas
- lib/features/{feature}/presentation/widgets/ — widgets da feature
- lib/features/{feature}/providers/ — Riverpod providers
- lib/core/theme/ — AppColors, AppTypography, AppTheme
- lib/core/constants/ — AppConstants, ApiConstants
- lib/core/extensions/ — BuildContextExtensions
- lib/core/utils/ — Validators
- lib/data/datasources/ — SupabaseDataSource
- lib/shared/widgets/ — AppButton, AppTextField, LoadingIndicator/Skeleton

## Roteamento (GoRouter)
- ShellRoute com NavigationBar (5 abas): /, /pets, /booking, /reports, /profile
- Rotas auth fora do shell: /login, /signup
- Redirect global: checa Supabase.instance.client.auth.currentSession
- Named routes via AppRoutes (abstract final class)
- Paths via AppPaths (abstract final class)
- /pets/:id → PetDetailPage(petId)

## Tema DailyPet
- Primary: #FF6B35 (laranja)
- Secondary: #004E89 (azul)
- Background: #FAFAFA | Surface: #FFFFFF
- useMaterial3: true
- Cantos: 8/12/16/24dp conforme elemento
- NavigationBar (Material 3) em vez de BottomNavigationBar

## Firebase
- NÃO inicializado ainda — comentado em main.dart
- TODO: adicionar google-services.json (Android) e GoogleService-Info.plist (iOS)

## Supabase
- URL/Key: placeholders em lib/core/constants/api_constants.dart
- Client centralizado: lib/data/datasources/supabase_datasource.dart

## Padrões Dart confirmados
- `abstract final class` para namespaces (AppColors, AppRoutes, etc.)
- `const` constructors em todos os widgets sem estado mutável
- Evitar múltiplos underscores em parâmetros descartados (lint)

## Detalhes → Ver
- architecture.md (quando criado)
