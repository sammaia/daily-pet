export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'amber';

// Booking status
export const bookingStatusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  pending: { label: 'Pending', variant: 'warning' },
  confirmed: { label: 'Confirmed', variant: 'info' },
  checked_in: { label: 'Checked In', variant: 'success' },
  checked_out: { label: 'Checked Out', variant: 'neutral' },
  cancelled: { label: 'Cancelled', variant: 'danger' },
  no_show: { label: 'No Show', variant: 'danger' },
};

// Payment status
export const paymentStatusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  pending: { label: 'Pending', variant: 'warning' },
  confirmed: { label: 'Confirmed', variant: 'success' },
  received: { label: 'Received', variant: 'success' },
  overdue: { label: 'Overdue', variant: 'danger' },
  refunded: { label: 'Refunded', variant: 'neutral' },
  cancelled: { label: 'Cancelled', variant: 'danger' },
};

// Vaccine status
export const vaccineStatusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  valid: { label: 'Up to date', variant: 'success' },
  expiring_soon: { label: 'Expiring soon', variant: 'warning' },
  expired: { label: 'Expired', variant: 'danger' },
  missing: { label: 'Pending', variant: 'neutral' },
};

// Shift labels
export const shiftLabels: Record<string, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  full_day: 'Full Day',
};

// Payment method labels
export const paymentMethodLabels: Record<string, string> = {
  pix: 'Pix',
  boleto: 'Bank Slip',
  credit_card: 'Credit Card',
  debit_card: 'Debit Card',
};

// Report card score labels
export const scoreLabels: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
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
