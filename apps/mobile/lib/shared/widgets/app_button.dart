import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../core/theme/app_colors.dart';
import '../../core/constants/app_constants.dart';

/// Variantes de botão disponíveis no DailyPet.
enum AppButtonVariant { primary, secondary, outline, ghost, danger }

/// Botão customizado base do DailyPet.
/// Aplica haptic feedback, estados de loading e tamanho mínimo de toque.
class AppButton extends StatelessWidget {
  const AppButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.variant = AppButtonVariant.primary,
    this.isLoading = false,
    this.isFullWidth = true,
    this.icon,
    this.iconPosition = IconPosition.leading,
    this.size = AppButtonSize.medium,
    this.hapticFeedback = true,
  });

  final String label;
  final VoidCallback? onPressed;
  final AppButtonVariant variant;
  final bool isLoading;
  final bool isFullWidth;
  final Widget? icon;
  final IconPosition iconPosition;
  final AppButtonSize size;
  final bool hapticFeedback;

  @override
  Widget build(BuildContext context) {
    final height = switch (size) {
      AppButtonSize.small => 40.0,
      AppButtonSize.medium => 52.0,
      AppButtonSize.large => 60.0,
    };

    final textStyle = switch (size) {
      AppButtonSize.small => const TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.1,
        ),
      AppButtonSize.medium => const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.1,
        ),
      AppButtonSize.large => const TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.1,
        ),
    };

    final child = _buildChild(textStyle);

    return SizedBox(
      width: isFullWidth ? double.infinity : null,
      height: height,
      child: switch (variant) {
        AppButtonVariant.primary => _PrimaryButton(
            onPressed: _handlePress,
            child: child,
          ),
        AppButtonVariant.secondary => _SecondaryButton(
            onPressed: _handlePress,
            child: child,
          ),
        AppButtonVariant.outline => _OutlineButton(
            onPressed: _handlePress,
            child: child,
          ),
        AppButtonVariant.ghost => _GhostButton(
            onPressed: _handlePress,
            child: child,
          ),
        AppButtonVariant.danger => _DangerButton(
            onPressed: _handlePress,
            child: child,
          ),
      },
    );
  }

  Widget _buildChild(TextStyle textStyle) {
    if (isLoading) {
      return const SizedBox(
        width: 20,
        height: 20,
        child: CircularProgressIndicator(
          strokeWidth: 2.5,
          valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
        ),
      );
    }

    if (icon == null) {
      return Text(label, style: textStyle);
    }

    final children = iconPosition == IconPosition.leading
        ? [icon!, const SizedBox(width: 8), Text(label, style: textStyle)]
        : [Text(label, style: textStyle), const SizedBox(width: 8), icon!];

    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: children,
    );
  }

  VoidCallback? get _handlePress {
    if (isLoading || onPressed == null) return null;
    return () {
      if (hapticFeedback) {
        HapticFeedback.lightImpact();
      }
      onPressed!();
    };
  }
}

enum IconPosition { leading, trailing }

enum AppButtonSize { small, medium, large }

// --- Implementações privadas de cada variante ---

class _PrimaryButton extends StatelessWidget {
  const _PrimaryButton({required this.onPressed, required this.child});
  final VoidCallback? onPressed;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primary,
        foregroundColor: AppColors.textOnPrimary,
        disabledBackgroundColor: AppColors.outline,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        minimumSize: const Size(AppConstants.minTouchTarget, AppConstants.minTouchTarget),
      ),
      child: child,
    );
  }
}

class _SecondaryButton extends StatelessWidget {
  const _SecondaryButton({required this.onPressed, required this.child});
  final VoidCallback? onPressed;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.secondary,
        foregroundColor: AppColors.textOnSecondary,
        disabledBackgroundColor: AppColors.outline,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        minimumSize: const Size(AppConstants.minTouchTarget, AppConstants.minTouchTarget),
      ),
      child: child,
    );
  }
}

class _OutlineButton extends StatelessWidget {
  const _OutlineButton({required this.onPressed, required this.child});
  final VoidCallback? onPressed;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return OutlinedButton(
      onPressed: onPressed,
      style: OutlinedButton.styleFrom(
        foregroundColor: AppColors.primary,
        side: const BorderSide(color: AppColors.primary, width: 1.5),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        minimumSize: const Size(AppConstants.minTouchTarget, AppConstants.minTouchTarget),
      ),
      child: child,
    );
  }
}

class _GhostButton extends StatelessWidget {
  const _GhostButton({required this.onPressed, required this.child});
  final VoidCallback? onPressed;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: onPressed,
      style: TextButton.styleFrom(
        foregroundColor: AppColors.primary,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        minimumSize: const Size(AppConstants.minTouchTarget, AppConstants.minTouchTarget),
      ),
      child: child,
    );
  }
}

class _DangerButton extends StatelessWidget {
  const _DangerButton({required this.onPressed, required this.child});
  final VoidCallback? onPressed;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.error,
        foregroundColor: Colors.white,
        disabledBackgroundColor: AppColors.outline,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        minimumSize: const Size(AppConstants.minTouchTarget, AppConstants.minTouchTarget),
      ),
      child: child,
    );
  }
}
