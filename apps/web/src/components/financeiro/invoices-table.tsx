'use client';

import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { getStatusConfig, paymentMethodLabels } from '@/lib/utils/status';
import { formatCurrency, formatDateShort } from '@/lib/utils/format';

export interface InvoiceRow {
  id: string;
  tutorName: string;
  petName: string;
  amount: number;
  method: string;
  status: string;
  dueDate: string;
  paidDate?: string;
}

interface InvoicesTableProps {
  invoices: InvoiceRow[];
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
  const columns: Column<InvoiceRow>[] = [
    {
      key: 'tutorName',
      label: 'Tutor / Pet',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <Avatar name={row.tutorName} size="xs" />
          <div>
            <p className="font-medium text-gray-900 text-sm">{row.tutorName}</p>
            <p className="text-xs text-gray-500">{row.petName}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'amount',
      label: 'Valor',
      sortable: true,
      render: (row) => <span className="font-medium">{formatCurrency(row.amount)}</span>,
    },
    {
      key: 'method',
      label: 'Metodo',
      render: (row) => <span className="text-sm">{paymentMethodLabels[row.method] || row.method}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const cfg = getStatusConfig('payment', row.status);
        return <Badge variant={cfg.variant} dot>{cfg.label}</Badge>;
      },
    },
    {
      key: 'dueDate',
      label: 'Vencimento',
      sortable: true,
      render: (row) => <span className="text-sm">{formatDateShort(row.dueDate)}</span>,
    },
    {
      key: 'paidDate',
      label: 'Pagamento',
      render: (row) => <span className="text-sm text-gray-500">{row.paidDate ? formatDateShort(row.paidDate) : '—'}</span>,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={invoices}
      keyExtractor={(r) => r.id}
      emptyMessage="Nenhuma fatura encontrada"
    />
  );
}
