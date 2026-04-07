import 'package:supabase_flutter/supabase_flutter.dart';

/// Cliente Supabase centralizado.
/// Todas as datasources devem usar este getter em vez de
/// chamar Supabase.instance.client diretamente.
class SupabaseDataSource {
  const SupabaseDataSource();

  /// Acesso ao cliente Supabase inicializado.
  SupabaseClient get client => Supabase.instance.client;

  /// Sessão do usuário autenticado. Null se não autenticado.
  Session? get currentSession => client.auth.currentSession;

  /// Usuário autenticado. Null se não autenticado.
  User? get currentUser => client.auth.currentUser;

  /// Verifica se existe sessão ativa.
  bool get isAuthenticated => currentSession != null;

  /// Stream de mudanças de estado de autenticação.
  Stream<AuthState> get authStateChanges => client.auth.onAuthStateChange;

  /// Realtime client para subscriptions.
  RealtimeClient get realtime => client.realtime;

  /// Storage client para upload/download de arquivos.
  SupabaseStorageClient get storage => client.storage;
}
