import 'package:flutter/material.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';

/// Extension methods úteis no BuildContext para reduzir boilerplate.
extension BuildContextExtensions on BuildContext {
  // --- Theme ---
  ThemeData get theme => Theme.of(this);
  ColorScheme get colorScheme => Theme.of(this).colorScheme;
  TextTheme get textTheme => Theme.of(this).textTheme;

  // --- Cores DailyPet (atalhos) ---
  Color get primaryColor => AppColors.primary;
  Color get secondaryColor => AppColors.secondary;
  Color get backgroundColor => AppColors.background;
  Color get surfaceColor => AppColors.surface;
  Color get textPrimaryColor => AppColors.textPrimary;
  Color get textSecondaryColor => AppColors.textSecondary;

  // --- Tipografia DailyPet (atalhos) ---
  TextStyle get petNameStyle => AppTypography.petName;
  TextStyle get scoreValueStyle => AppTypography.scoreValue;
  TextStyle get timestampStyle => AppTypography.timestamp;

  // --- MediaQuery ---
  MediaQueryData get mediaQuery => MediaQuery.of(this);
  Size get screenSize => MediaQuery.sizeOf(this);
  double get screenWidth => MediaQuery.sizeOf(this).width;
  double get screenHeight => MediaQuery.sizeOf(this).height;
  EdgeInsets get padding => MediaQuery.paddingOf(this);
  EdgeInsets get viewInsets => MediaQuery.viewInsetsOf(this);
  double get statusBarHeight => MediaQuery.paddingOf(this).top;
  double get bottomBarHeight => MediaQuery.paddingOf(this).bottom;
  bool get isKeyboardOpen => MediaQuery.viewInsetsOf(this).bottom > 0;

  // --- Responsividade ---
  bool get isSmallScreen => screenWidth < 375;
  bool get isMediumScreen => screenWidth >= 375 && screenWidth < 414;
  bool get isLargeScreen => screenWidth >= 414;

  // --- Navegação ---
  NavigatorState get navigator => Navigator.of(this);
  void pop<T>([T? result]) => Navigator.of(this).pop(result);
  bool canPop() => Navigator.of(this).canPop();

  // --- Overlay / Feedback ---
  void showSnackBar(
    String message, {
    SnackBarAction? action,
    Duration duration = const Duration(seconds: 3),
    Color? backgroundColor,
  }) {
    ScaffoldMessenger.of(this).showSnackBar(
      SnackBar(
        content: Text(message),
        action: action,
        duration: duration,
        backgroundColor: backgroundColor,
      ),
    );
  }

  void showErrorSnackBar(String message) {
    showSnackBar(message, backgroundColor: AppColors.error);
  }

  void showSuccessSnackBar(String message) {
    showSnackBar(message, backgroundColor: AppColors.success);
  }

  void hideKeyboard() {
    final currentFocus = FocusScope.of(this);
    if (!currentFocus.hasPrimaryFocus && currentFocus.focusedChild != null) {
      FocusManager.instance.primaryFocus?.unfocus();
    }
  }
}
