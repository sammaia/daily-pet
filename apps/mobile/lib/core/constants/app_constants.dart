/// Constantes gerais do DailyPet.
abstract final class AppConstants {
  // --- App Info ---
  static const String appName = 'DailyPet';
  static const String appVersion = '1.0.0';

  // --- Paginação ---
  static const int defaultPageSize = 20;
  static const int feedPageSize = 15;
  static const int galleryPageSize = 30;

  // --- Cache ---
  /// Tempo de cache padrão para dados da API
  static const Duration defaultCacheDuration = Duration(minutes: 5);
  static const Duration feedCacheDuration = Duration(minutes: 2);
  static const Duration profileCacheDuration = Duration(minutes: 15);

  // --- Imagens ---
  /// Qualidade de compressão para upload de imagens (0-100)
  static const int imageUploadQuality = 80;
  static const int maxImageSizeMb = 5;
  static const int imageMaxWidth = 1920;
  static const int imageMaxHeight = 1920;

  // --- Touch ---
  /// Tamanho mínimo de área tátil (44dp conforme HIG / Material)
  static const double minTouchTarget = 44.0;

  // --- Animações ---
  static const Duration animationFast = Duration(milliseconds: 150);
  static const Duration animationNormal = Duration(milliseconds: 300);
  static const Duration animationSlow = Duration(milliseconds: 500);

  // --- Timeout de rede ---
  static const Duration networkTimeout = Duration(seconds: 30);
  static const Duration uploadTimeout = Duration(seconds: 120);

  // --- Notificações ---
  static const String notificationChannelId = 'dailypet_notifications';
  static const String notificationChannelName = 'DailyPet';
  static const String notificationChannelDescription =
      'Notificações sobre seu pet na creche';

  // --- Storage Keys (flutter_secure_storage) ---
  static const String storageKeyAuthToken = 'auth_token';
  static const String storageKeyRefreshToken = 'refresh_token';
  static const String storageKeyUserId = 'user_id';
  static const String storageKeySelectedPetId = 'selected_pet_id';

  // --- Deep Link Scheme ---
  static const String deepLinkScheme = 'dailypet';
  static const String universalLinkDomain = 'app.dailypet.com.br';
}
