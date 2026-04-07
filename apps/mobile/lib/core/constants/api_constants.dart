/// Constantes de API do DailyPet.
/// URLs e chaves são placeholders — substituir por variáveis de ambiente
/// via dart-define ou .env antes de build.
abstract final class ApiConstants {
  // --- Supabase ---
  /// Substituir pela URL real do projeto Supabase
  static const String supabaseUrl = 'https://ysghafnemiwhehfwcvgb.supabase.co';

  /// Substituir pela anon key real do projeto Supabase
  static const String supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzZ2hhZm5lbWl3aGVoZndjdmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NjM4MDEsImV4cCI6MjA4NzQzOTgwMX0.fktoXkybP_le4Q87YoSlHLf7Z0vwmm3yz0W2lyMGEvE';

  // --- Supabase Realtime Channels ---
  static const String realtimeChannelFeed = 'feed';
  static const String realtimeChannelChat = 'chat';
  static const String realtimeChannelNotifications = 'notifications';

  // --- Supabase Storage Buckets ---
  static const String bucketPetPhotos = 'pet-photos';
  static const String bucketVaccines = 'vaccines';
  static const String bucketReportPhotos = 'report-photos';
  static const String bucketAvatars = 'avatars';

  // --- Supabase Tables ---
  static const String tableTutors = 'tutors';
  static const String tablePets = 'pets';
  static const String tableReservations = 'reservations';
  static const String tableReportCards = 'report_cards';
  static const String tableVaccines = 'vaccines';
  static const String tableActivities = 'activities';
  static const String tableMessages = 'messages';
  static const String tableNotifications = 'notifications';
  static const String tablePayments = 'payments';

  // --- Asaas (pagamentos) ---
  /// Substituir pela URL base da API Asaas (sandbox ou produção)
  static const String asaasBaseUrl = 'https://sandbox.asaas.com/api/v3';
  static const String asaasApiKey = 'YOUR_ASAAS_API_KEY';
}
