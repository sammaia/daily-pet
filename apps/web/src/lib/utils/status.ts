export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'amber';

// Booking status
export const bookingStatusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  pending: { label: 'Pendente', variant: 'warning' },
  confirmed: { label: 'Confirmado', variant: 'info' },
  checked_in: { label: 'Check-in', variant: 'success' },
  checked_out: { label: 'Check-out', variant: 'neutral' },
  cancelled: { label: 'Cancelado', variant: 'danger' },
  no_show: { label: 'Faltou', variant: 'danger' },
};

// Payment status
export const paymentStatusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  pending: { label: 'Pendente', variant: 'warning' },
  confirmed: { label: 'Confirmado', variant: 'success' },
  received: { label: 'Recebido', variant: 'success' },
  overdue: { label: 'Atrasado', variant: 'danger' },
  refunded: { label: 'Estornado', variant: 'neutral' },
  cancelled: { label: 'Cancelado', variant: 'danger' },
};

// Vaccine status
export const vaccineStatusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  valid: { label: 'Em dia', variant: 'success' },
  expiring_soon: { label: 'Vencendo', variant: 'warning' },
  expired: { label: 'Vencida', variant: 'danger' },
  missing: { label: 'Pendente', variant: 'neutral' },
};

// Shift labels
export const shiftLabels: Record<string, string> = {
  morning: 'Manhã',
  afternoon: 'Tarde',
  full_day: 'Integral',
};

// Payment method labels
export const paymentMethodLabels: Record<string, string> = {
  pix: 'Pix',
  boleto: 'Boleto',
  credit_card: 'Cartão de Crédito',
  debit_card: 'Cartão de Débito',
};

// Report card score labels
export const scoreLabels: Record<number, string> = {
  1: 'Ruim',
  2: 'Regular',
  3: 'Bom',
  4: 'Muito Bom',
  5: 'Excelente',
};

export function getStatusConfig(
  type: 'booking' | 'payment' | 'vaccine',
  status: string,
): { label: string; variant: BadgeVariant } {
  const configs = {
    booking: bookingStatusConfig,
    payment: paymentStatusConfig,
    vaccine: vaccineStatusConfig,
  };
  return configs[type][status] ?? { label: status, variant: 'neutral' as BadgeVariant };
}
