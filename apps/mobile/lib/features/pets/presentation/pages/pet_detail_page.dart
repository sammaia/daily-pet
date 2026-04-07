import 'package:flutter/material.dart';

/// Placeholder da tela de Detalhe do Pet.
/// Implementação real: perfil expandido de um pet específico,
/// galeria, boletins, vacinas e histórico de reservas.
class PetDetailPage extends StatelessWidget {
  const PetDetailPage({super.key, required this.petId});

  final String petId;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Pet #$petId')),
      body: Center(
        child: Text('Detalhe do Pet: $petId'),
      ),
    );
  }
}
