'use client';

import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { ScoreDisplay } from '@/components/ui/score-display';
import { DataTable, type Column } from '@/components/ui/data-table';
import { formatDateShort } from '@/lib/utils/format';

export interface ReportRow {
  id: string;
  petName: string;
  date: string;
  feeding: number;
  behavior: number;
  socialization: number;
  energy: number;
  overall: number;
  caregiverName: string;
}

interface ReportsTableProps {
  reports: ReportRow[];
  onRowClick?: (report: ReportRow) => void;
}

export function ReportsTable({ reports, onRowClick }: ReportsTableProps) {
  const columns: Column<ReportRow>[] = [
    {
      key: 'petName',
      label: 'Pet',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <Avatar name={row.petName} size="xs" />
          <span className="font-medium text-gray-900">{row.petName}</span>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (row) => <span>{formatDateShort(row.date)}</span>,
    },
    {
      key: 'feeding',
      label: 'Feed.',
      render: (row) => <ScoreDisplay score={row.feeding} variant="dots" size="sm" />,
    },
    {
      key: 'behavior',
      label: 'Beh.',
      render: (row) => <ScoreDisplay score={row.behavior} variant="dots" size="sm" />,
    },
    {
      key: 'socialization',
      label: 'Soc.',
      render: (row) => <ScoreDisplay score={row.socialization} variant="dots" size="sm" />,
    },
    {
      key: 'overall',
      label: 'Overall',
      sortable: true,
      render: (row) => <ScoreDisplay score={row.overall} variant="stars" size="sm" />,
    },
    { key: 'caregiverName', label: 'Caregiver' },
  ];

  return (
    <DataTable
      columns={columns}
      data={reports}
      keyExtractor={(r) => r.id}
      onRowClick={onRowClick}
      emptyMessage="No report cards found"
    />
  );
}
