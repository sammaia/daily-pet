import React from 'react';
import { cn } from '@/lib/utils/cn';

interface AvailabilityMeterProps {
  used: number;
  total: number;
  className?: string;
}

export function AvailabilityMeter({ used, total, className }: AvailabilityMeterProps) {
  const pct = total > 0 ? (used / total) * 100 : 0;
  const color = pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-amber-500' : 'bg-emerald-500';
  const textColor = pct >= 90 ? 'text-red-600' : pct >= 70 ? 'text-amber-600' : 'text-emerald-600';

  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Vagas</span>
        <span className={cn('text-sm font-bold', textColor)}>
          {used}/{total}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all', color)}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      <p className="text-xs text-gray-500">{total - used} vagas disponiveis</p>
    </div>
  );
}
