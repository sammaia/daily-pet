'use client';

import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { formatCurrency, formatDateShort } from '@/lib/utils/format';

export interface SubscriptionRow {
  id: string;
  tutorName: string;
  planName: string;
  amount: number;
  status: 'active' | 'paused' | 'cancelled';
  nextBilling: string;
}

const statusConfig = {
  active: { label: 'Active', variant: 'success' as const },
  paused: { label: 'Paused', variant: 'warning' as const },
  cancelled: { label: 'Cancelled', variant: 'danger' as const },
};

interface SubscriptionsTableProps {
  subscriptions: SubscriptionRow[];
}

export function SubscriptionsTable({ subscriptions }: SubscriptionsTableProps) {
  const columns: Column<SubscriptionRow>[] = [
    {
      key: 'tutorName',
      label: 'Owner',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <Avatar name={row.tutorName} size="xs" />
          <span className="font-medium text-gray-900">{row.tutorName}</span>
        </div>
      ),
    },
    { key: 'planName', label: 'Plan' },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (row) => <span className="font-medium">{formatCurrency(row.amount)}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const cfg = statusConfig[row.status];
        return <Badge variant={cfg.variant} dot>{cfg.label}</Badge>;
      },
    },
    {
      key: 'nextBilling',
      label: 'Next Billing',
      render: (row) => <span className="text-sm">{formatDateShort(row.nextBilling)}</span>,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={subscriptions}
      keyExtractor={(r) => r.id}
      emptyMessage="No subscriptions found"
    />
  );
}
