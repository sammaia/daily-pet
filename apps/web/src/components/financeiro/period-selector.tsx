'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PeriodSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const periods = [
  { value: '7d', label: '7 dias' },
  { value: '30d', label: '30 dias' },
  { value: '90d', label: '3 meses' },
  { value: '12m', label: '12 meses' },
];

export function PeriodSelector({ value, onChange, className }: PeriodSelectorProps) {
  return (
    <div className={cn('flex bg-gray-100 rounded-lg p-0.5', className)}>
      {periods.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            value === p.value
              ? 'bg-white shadow-sm text-gray-900'
              : 'text-gray-500 hover:text-gray-700',
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
