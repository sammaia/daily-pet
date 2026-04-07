import React from 'react';
import { Badge } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { getStatusConfig, shiftLabels } from '@/lib/utils/status';
import { formatDateShort } from '@/lib/utils/format';

interface BookingHistory {
  id: string;
  date: string;
  shift: string;
  status: string;
  checkIn?: string;
  checkOut?: string;
}

interface PetHistoryTabProps {
  bookings: BookingHistory[];
}

export function PetHistoryTab({ bookings }: PetHistoryTabProps) {
  const columns: Column<BookingHistory>[] = [
    {
      key: 'date',
      label: 'Data',
      sortable: true,
      render: (row) => <span className="font-medium">{formatDateShort(row.date)}</span>,
    },
    {
      key: 'shift',
      label: 'Turno',
      render: (row) => <span>{shiftLabels[row.shift] || row.shift}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const cfg = getStatusConfig('booking', row.status);
        return <Badge variant={cfg.variant} dot>{cfg.label}</Badge>;
      },
    },
    {
      key: 'checkIn',
      label: 'Check-in',
      render: (row) => <span className="text-gray-500">{row.checkIn || '—'}</span>,
    },
    {
      key: 'checkOut',
      label: 'Check-out',
      render: (row) => <span className="text-gray-500">{row.checkOut || '—'}</span>,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={bookings}
      keyExtractor={(r) => r.id}
      emptyMessage="Nenhum agendamento encontrado"
    />
  );
}
