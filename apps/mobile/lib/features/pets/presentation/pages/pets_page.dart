import 'package:flutter/material.dart';

/// Placeholder da tela de Pets.
/// Implementação real: perfil completo do pet, galeria de fotos lazy-loaded,
/// histórico de boletins com gráficos de evolução.
class PetsPage extends StatelessWidget {
  const PetsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: null,
      body: Center(
        child: Text('Perfil do Pet'),
      ),
    );
  }
}
