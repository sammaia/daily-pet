/// Validadores de formulário do DailyPet.
/// Retornam String? — null significa válido, String é a mensagem de erro.
abstract final class Validators {
  // --- Email ---
  static String? email(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Informe seu e-mail';
    }
    final emailRegex = RegExp(
      r'^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$',
    );
    if (!emailRegex.hasMatch(value.trim())) {
      return 'E-mail inválido';
    }
    return null;
  }

  // --- Senha ---
  static String? password(String? value) {
    if (value == null || value.isEmpty) {
      return 'Informe sua senha';
    }
    if (value.length < 8) {
      return 'A senha deve ter pelo menos 8 caracteres';
    }
    return null;
  }

  static String? confirmPassword(String? value, String password) {
    if (value == null || value.isEmpty) {
      return 'Confirme sua senha';
    }
    if (value != password) {
      return 'As senhas não coincidem';
    }
    return null;
  }

  // --- Nome ---
  static String? name(String? value, {String fieldName = 'Nome'}) {
    if (value == null || value.trim().isEmpty) {
      return 'Informe $fieldName';
    }
    if (value.trim().length < 2) {
      return '$fieldName deve ter pelo menos 2 caracteres';
    }
    if (value.trim().length > 100) {
      return '$fieldName deve ter no máximo 100 caracteres';
    }
    return null;
  }

  // --- Telefone (BR) ---
  static String? phone(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Informe seu telefone';
    }
    final digits = value.replaceAll(RegExp(r'\D'), '');
    if (digits.length < 10 || digits.length > 11) {
      return 'Telefone inválido';
    }
    return null;
  }

  // --- CPF ---
  static String? cpf(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Informe seu CPF';
    }
    final digits = value.replaceAll(RegExp(r'\D'), '');
    if (digits.length != 11) {
      return 'CPF inválido';
    }
    if (!_isValidCpf(digits)) {
      return 'CPF inválido';
    }
    return null;
  }

  // --- Requerido genérico ---
  static String? required(String? value, {String fieldName = 'Este campo'}) {
    if (value == null || value.trim().isEmpty) {
      return '$fieldName é obrigatório';
    }
    return null;
  }

  // --- Data ---
  static String? date(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Informe a data';
    }
    final dateRegex = RegExp(r'^\d{2}/\d{2}/\d{4}$');
    if (!dateRegex.hasMatch(value.trim())) {
      return 'Data inválida (use dd/mm/aaaa)';
    }
    return null;
  }

  // --- Peso do pet (kg) ---
  static String? petWeight(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Informe o peso';
    }
    final weight = double.tryParse(value.replaceAll(',', '.'));
    if (weight == null) {
      return 'Peso inválido';
    }
    if (weight <= 0 || weight > 150) {
      return 'Peso deve estar entre 0,1 e 150 kg';
    }
    return null;
  }

  // --- Helpers privados ---
  static bool _isValidCpf(String digits) {
    if (RegExp(r'^(\d)\1{10}$').hasMatch(digits)) return false;

    int sum = 0;
    for (int i = 0; i < 9; i++) {
      sum += int.parse(digits[i]) * (10 - i);
    }
    int remainder = (sum * 10) % 11;
    if (remainder == 10 || remainder == 11) remainder = 0;
    if (remainder != int.parse(digits[9])) return false;

    sum = 0;
    for (int i = 0; i < 10; i++) {
      sum += int.parse(digits[i]) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder == 10 || remainder == 11) remainder = 0;
    if (remainder != int.parse(digits[10])) return false;

    return true;
  }
}
