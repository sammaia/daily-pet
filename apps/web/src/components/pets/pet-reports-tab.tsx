import React from 'react';
import { ScoreDisplay } from '@/components/ui/score-display';
import { DataTable, type Column } from '@/components/ui/data-table';
import { formatDateShort } from '@/lib/utils/format';

interface ReportEntry {
  id: string;
  date: string;
  feeding: number;
  behavior: number;
  socialization: number;
  energy: number;
  overall: number;
  caregiverName: string;
  notes?: string;
}

interface PetReportsTabProps {
  reports: ReportEntry[];
}

export function PetReportsTab({ reports }: PetReportsTabProps) {
  const columns: Column<ReportEntry>[] = [
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (row) => <span className="font-medium">{formatDateShort(row.date)}</span>,
    },
    {
      key: 'feeding',
      label: 'Feeding',
      render: (row) => <ScoreDisplay score={row.feeding} variant="dots" size="sm" />,
    },
    {
      key: 'behavior',
      label: 'Behavior',
      render: (row) => <ScoreDisplay score={row.behavior} variant="dots" size="sm" />,
    },
    {
      key: 'socialization',
      label: 'Socialization',
      render: (row) => <ScoreDisplay score={row.socialization} variant="dots" size="sm" />,
    },
    {
      key: 'energy',
      label: 'Energy',
      render: (row) => <ScoreDisplay score={row.energy} variant="dots" size="sm" />,
    },
    {
      key: 'overall',
      label: 'Overall',
      render: (row) => <ScoreDisplay score={row.overall} variant="stars" size="sm" />,
    },
    { key: 'caregiverName', label: 'Caregiver' },
  ];

  return (
    <DataTable
      columns={columns}
      data={reports}
      keyExtractor={(r) => r.id}
      emptyMessage="No report cards found"
    />
  );
}
