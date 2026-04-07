import 'package:flutter/material.dart';

/// Paleta de cores do DailyPet.
/// Inspirada em tons quentes e acolhedores que transmitem
/// carinho, confiança e alegria — a essência da relação tutor-pet.
abstract final class AppColors {
  // --- Primária ---
  /// Laranja vibrante: energia, entusiasmo, calor
  static const Color primary = Color(0xFFFF6B35);
  static const Color primaryLight = Color(0xFFFF9A6C);
  static const Color primaryDark = Color(0xFFCC4A1A);
  static const Color primaryContainer = Color(0xFFFFEDE6);

  // --- Secundária ---
  /// Azul escuro: confiança, profissionalismo, segurança
  static const Color secondary = Color(0xFF004E89);
  static const Color secondaryLight = Color(0xFF2E7AB5);
  static const Color secondaryDark = Color(0xFF003060);
  static const Color secondaryContainer = Color(0xFFE0EFFF);

  // --- Neutros ---
  static const Color background = Color(0xFFFAFAFA);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color surfaceVariant = Color(0xFFF5F5F5);
  static const Color outline = Color(0xFFE0E0E0);
  static const Color outlineVariant = Color(0xFFF0F0F0);

  // --- Texto ---
  static const Color textPrimary = Color(0xFF1A1A1A);
  static const Color textSecondary = Color(0xFF6B6B6B);
  static const Color textTertiary = Color(0xFF9E9E9E);
  static const Color textOnPrimary = Color(0xFFFFFFFF);
  static const Color textOnSecondary = Color(0xFFFFFFFF);

  // --- Semânticas ---
  static const Color error = Color(0xFFD32F2F);
  static const Color errorContainer = Color(0xFFFFEBEB);
  static const Color success = Color(0xFF2E7D32);
  static const Color successContainer = Color(0xFFE8F5E9);
  static const Color warning = Color(0xFFED6C02);
  static const Color warningContainer = Color(0xFFFFF3E0);
  static const Color info = Color(0xFF0288D1);
  static const Color infoContainer = Color(0xFFE1F5FE);

  // --- Status vacinas (semáforo) ---
  static const Color vaccineOk = Color(0xFF4CAF50);
  static const Color vaccineWarning = Color(0xFFFFC107);
  static const Color vaccineExpired = Color(0xFFF44336);

  // --- Score boletins ---
  static const Color scoreExcellent = Color(0xFF4CAF50);
  static const Color scoreGood = Color(0xFF8BC34A);
  static const Color scoreAverage = Color(0xFFFFC107);
  static const Color scorePoor = Color(0xFFFF5722);

  // --- Gradientes ---
  static const LinearGradient primaryGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [primary, primaryLight],
  );

  static const LinearGradient heroGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [Color(0x00000000), Color(0xCC000000)],
  );

  static const LinearGradient backgroundGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [Color(0xFFFFF5F0), Color(0xFFFAFAFA)],
  );
}
