'use client';

import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { getStatusConfig, shiftLabels } from '@/lib/utils/status';
import { formatTime } from '@/lib/utils/format';

export interface BookingRow {
  id: string;
  petName: string;
  petBreed: string;
  tutorName: string;
  shift: string;
  status: string;
  checkInTime?: string;
  checkOutTime?: string;
  notes?: string;
}

interface BookingTableProps {
  bookings: BookingRow[];
  onRowClick?: (booking: BookingRow) => void;
  isLoading?: boolean;
}

export function BookingTable({ bookings, onRowClick, isLoading }: BookingTableProps) {
  const columns: Column<BookingRow>[] = [
    {
      key: 'petName',
      label: 'Pet',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={row.petName} size="sm" />
          <div>
            <p className="font-medium text-gray-900">{row.petName}</p>
            <p className="text-xs text-gray-500">{row.petBreed}</p>
          </div>
        </div>
      ),
    },
    { key: 'tutorName', label: 'Owner', sortable: true },
    {
      key: 'shift',
      label: 'Shift',
      render: (row) => (
        <span className="text-sm">{shiftLabels[row.shift] || row.shift}</span>
      ),
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
      key: 'checkInTime',
      label: 'Check-in',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.checkInTime || '—'}</span>
      ),
    },
    {
      key: 'checkOutTime',
      label: 'Check-out',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.checkOutTime || '—'}</span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={bookings}
      keyExtractor={(r) => r.id}
      onRowClick={onRowClick}
      isLoading={isLoading}
      emptyMessage="No bookings found"
    />
  );
}
