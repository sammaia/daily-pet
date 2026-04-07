'use client';

import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';

export interface PetRow {
  id: string;
  name: string;
  breed: string;
  age: string;
  tutorName: string;
  vaccineStatus: 'valid' | 'expiring_soon' | 'expired' | 'missing';
  totalBookings: number;
  avatar?: string;
}

const vaccineConfig = {
  valid: { label: 'Em dia', variant: 'success' as const },
  expiring_soon: { label: 'Vencendo', variant: 'warning' as const },
  expired: { label: 'Vencida', variant: 'danger' as const },
  missing: { label: 'Pendente', variant: 'neutral' as const },
};

interface PetTableProps {
  pets: PetRow[];
  onRowClick?: (pet: PetRow) => void;
}

export function PetTable({ pets, onRowClick }: PetTableProps) {
  const columns: Column<PetRow>[] = [
    {
      key: 'name',
      label: 'Pet',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={row.name} src={row.avatar} size="sm" />
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.breed}</p>
          </div>
        </div>
      ),
    },
    { key: 'age', label: 'Idade' },
    { key: 'tutorName', label: 'Tutor', sortable: true },
    {
      key: 'vaccineStatus',
      label: 'Vacinas',
      render: (row) => {
        const cfg = vaccineConfig[row.vaccineStatus];
        return <Badge variant={cfg.variant} dot>{cfg.label}</Badge>;
      },
    },
    { key: 'totalBookings', label: 'Agendamentos', sortable: true },
  ];

  return (
    <DataTable
      columns={columns}
      data={pets}
      keyExtractor={(r) => r.id}
      onRowClick={onRowClick}
      emptyMessage="Nenhum pet encontrado"
    />
  );
}
