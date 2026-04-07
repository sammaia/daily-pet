import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../core/theme/app_theme.dart';
import 'router.dart';

/// Raiz da aplicação DailyPet.
/// Configura MaterialApp.router com tema, GoRouter e localização.
class App extends ConsumerWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp.router(
      title: 'DailyPet',
      debugShowCheckedModeBanner: false,

      // --- Tema ---
      theme: AppTheme.light,
      // darkTheme: AppTheme.dark, // TODO: implementar tema escuro
      themeMode: ThemeMode.light,

      // --- Navegação ---
      routerConfig: appRouter,

      // --- Localização ---
      locale: const Locale('pt', 'BR'),
    );
  }
}
