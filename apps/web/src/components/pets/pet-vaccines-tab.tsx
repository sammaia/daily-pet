import React from 'react';
import { Badge } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { vaccineStatusConfig } from '@/lib/utils/status';
import { formatDateShort } from '@/lib/utils/format';
import { Syringe, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Vaccine {
  id: string;
  name: string;
  appliedDate: string;
  expiryDate: string;
  status: string;
  veterinarian: string;
}

interface PetVaccinesTabProps {
  vaccines: Vaccine[];
}

export function PetVaccinesTab({ vaccines }: PetVaccinesTabProps) {
  const columns: Column<Vaccine>[] = [
    {
      key: 'name',
      label: 'Vacina',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <Syringe size={14} className="text-gray-400" />
          <span className="font-medium text-gray-900">{row.name}</span>
        </div>
      ),
    },
    {
      key: 'appliedDate',
      label: 'Aplicacao',
      render: (row) => <span>{formatDateShort(row.appliedDate)}</span>,
    },
    {
      key: 'expiryDate',
      label: 'Vencimento',
      sortable: true,
      render: (row) => <span>{formatDateShort(row.expiryDate)}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const cfg = vaccineStatusConfig[row.status] || { label: row.status, variant: 'neutral' as const };
        return <Badge variant={cfg.variant} dot>{cfg.label}</Badge>;
      },
    },
    { key: 'veterinarian', label: 'Veterinario' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Controle de vacinacao</p>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Plus size={14} /> Registrar Vacina
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={vaccines}
        keyExtractor={(r) => r.id}
        emptyMessage="Nenhuma vacina registrada"
      />
    </div>
  );
}
