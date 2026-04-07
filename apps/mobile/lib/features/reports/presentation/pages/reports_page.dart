import 'package:flutter/material.dart';

/// Placeholder da tela de Boletins.
/// Implementação real: lista de boletins com scores por categoria
/// (socialização, obediência, energia, alimentação), fotos do dia
/// e indicadores visuais de desempenho.
class ReportsPage extends StatelessWidget {
  const ReportsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: null,
      body: Center(
        child: Text('Boletins'),
      ),
    );
  }
}
