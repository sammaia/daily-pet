import 'package:flutter/material.dart';

/// Placeholder da tela de Login.
/// Implementação real: autenticação via Supabase Auth (email + senha).
class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text('Login'),
      ),
    );
  }
}
