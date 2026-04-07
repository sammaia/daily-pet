import 'package:flutter/material.dart';

/// Placeholder da tela Home (Feed).
/// Implementação real: timeline de atividades do pet com Supabase Realtime,
/// pull-to-refresh, infinite scroll e skeleton screens.
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: null,
      body: Center(
        child: Text('Feed do Pet'),
      ),
    );
  }
}
