import 'package:flutter/material.dart';

/// Placeholder da tela de Agendamento.
/// Implementação real: calendário visual para reserva de dias,
/// gestão do plano ativo e seleção de datas com feedback visual.
class BookingPage extends StatelessWidget {
  const BookingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: null,
      body: Center(
        child: Text('Agendamento'),
      ),
    );
  }
}
