import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../features/auth/presentation/pages/login_page.dart';
import '../features/auth/presentation/pages/signup_page.dart';
import '../features/home/presentation/pages/home_page.dart';
import '../features/pets/presentation/pages/pets_page.dart';
import '../features/pets/presentation/pages/pet_detail_page.dart';
import '../features/booking/presentation/pages/booking_page.dart';
import '../features/reports/presentation/pages/reports_page.dart';
import '../features/profile/presentation/pages/profile_page.dart';
// --- Nomes das rotas (use GoRouter.of(context).goNamed(...)) ---
abstract final class AppRoutes {
  static const String login = 'login';
  static const String signup = 'signup';
  static const String home = 'home';
  static const String pets = 'pets';
  static const String petDetail = 'pet-detail';
  static const String booking = 'booking';
  static const String reports = 'reports';
  static const String profile = 'profile';
}

// --- Paths das rotas ---
abstract final class AppPaths {
  static const String login = '/login';
  static const String signup = '/signup';
  static const String home = '/';
  static const String pets = '/pets';
  static const String petDetail = '/pets/:id';
  static const String booking = '/booking';
  static const String reports = '/reports';
  static const String profile = '/profile';
}

/// Configuração central do GoRouter.
/// O redirect checa a sessão Supabase para proteger rotas autenticadas.
final appRouter = GoRouter(
  initialLocation: AppPaths.home,
  debugLogDiagnostics: true,

  // --- Redirect global: protege rotas autenticadas ---
  redirect: (BuildContext context, GoRouterState state) {
    final session = Supabase.instance.client.auth.currentSession;
    final isAuthenticated = session != null;

    final isAuthRoute =
        state.matchedLocation == AppPaths.login ||
        state.matchedLocation == AppPaths.signup;

    if (!isAuthenticated && !isAuthRoute) {
      return AppPaths.login;
    }

    // Se já autenticado e tentando acessar login/signup, redireciona para home
    if (isAuthenticated && isAuthRoute) {
      return AppPaths.home;
    }

    return null;
  },

  // --- Loading state durante inicialização ---
  routerNeglect: false,

  routes: [
    // --- Auth ---
    GoRoute(
      path: AppPaths.login,
      name: AppRoutes.login,
      pageBuilder: (context, state) => const NoTransitionPage(
        child: LoginPage(),
      ),
    ),
    GoRoute(
      path: AppPaths.signup,
      name: AppRoutes.signup,
      pageBuilder: (context, state) => const MaterialPage(
        child: SignupPage(),
      ),
    ),

    // --- Shell com Bottom Navigation ---
    ShellRoute(
      builder: (context, state, child) => _MainShell(child: child),
      routes: [
        GoRoute(
          path: AppPaths.home,
          name: AppRoutes.home,
          pageBuilder: (context, state) => const NoTransitionPage(
            child: HomePage(),
          ),
        ),
        GoRoute(
          path: AppPaths.pets,
          name: AppRoutes.pets,
          pageBuilder: (context, state) => const NoTransitionPage(
            child: PetsPage(),
          ),
          routes: [
            GoRoute(
              path: ':id',
              name: AppRoutes.petDetail,
              pageBuilder: (context, state) {
                final petId = state.pathParameters['id']!;
                return MaterialPage(
                  child: PetDetailPage(petId: petId),
                );
              },
            ),
          ],
        ),
        GoRoute(
          path: AppPaths.booking,
          name: AppRoutes.booking,
          pageBuilder: (context, state) => const NoTransitionPage(
            child: BookingPage(),
          ),
        ),
        GoRoute(
          path: AppPaths.reports,
          name: AppRoutes.reports,
          pageBuilder: (context, state) => const NoTransitionPage(
            child: ReportsPage(),
          ),
        ),
        GoRoute(
          path: AppPaths.profile,
          name: AppRoutes.profile,
          pageBuilder: (context, state) => const NoTransitionPage(
            child: ProfilePage(),
          ),
        ),
      ],
    ),
  ],

  // --- Error page ---
  errorBuilder: (context, state) => Scaffold(
    appBar: AppBar(title: const Text('Página não encontrada')),
    body: Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.error_outline, size: 64, color: Colors.grey),
          const SizedBox(height: 16),
          Text(
            'Ops! Esta página não existe.',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SizedBox(height: 8),
          TextButton(
            onPressed: () => context.go(AppPaths.home),
            child: const Text('Voltar ao início'),
          ),
        ],
      ),
    ),
  ),
);

/// Shell principal com Bottom Navigation Bar.
/// Gerencia a navegação entre as 5 abas principais.
class _MainShell extends StatelessWidget {
  const _MainShell({required this.child});

  final Widget child;

  static const _tabs = [
    _TabItem(
      path: AppPaths.home,
      label: 'Feed',
      icon: Icons.home_outlined,
      activeIcon: Icons.home,
    ),
    _TabItem(
      path: AppPaths.pets,
      label: 'Meu Pet',
      icon: Icons.pets_outlined,
      activeIcon: Icons.pets,
    ),
    _TabItem(
      path: AppPaths.booking,
      label: 'Agendar',
      icon: Icons.calendar_today_outlined,
      activeIcon: Icons.calendar_today,
    ),
    _TabItem(
      path: AppPaths.reports,
      label: 'Boletins',
      icon: Icons.assignment_outlined,
      activeIcon: Icons.assignment,
    ),
    _TabItem(
      path: AppPaths.profile,
      label: 'Perfil',
      icon: Icons.person_outline,
      activeIcon: Icons.person,
    ),
  ];

  int _currentIndex(BuildContext context) {
    final location = GoRouterState.of(context).matchedLocation;
    for (int i = 0; i < _tabs.length; i++) {
      if (location.startsWith(_tabs[i].path)) return i;
    }
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    final currentIndex = _currentIndex(context);

    return Scaffold(
      body: child,
      bottomNavigationBar: NavigationBar(
        selectedIndex: currentIndex,
        onDestinationSelected: (index) {
          context.go(_tabs[index].path);
        },
        destinations: _tabs
            .map(
              (tab) => NavigationDestination(
                icon: Icon(tab.icon),
                selectedIcon: Icon(tab.activeIcon),
                label: tab.label,
              ),
            )
            .toList(),
      ),
    );
  }
}

class _TabItem {
  const _TabItem({
    required this.path,
    required this.label,
    required this.icon,
    required this.activeIcon,
  });

  final String path;
  final String label;
  final IconData icon;
  final IconData activeIcon;
}
