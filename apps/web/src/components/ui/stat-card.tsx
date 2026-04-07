import React from 'react';
import { cn } from '@/lib/utils/cn';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg?: string;
  trend?: { value: number; label: string };
  className?: string;
}

export function StatCard({ label, value, icon, iconBg = 'bg-blue-100 text-blue-600', trend, className }: StatCardProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-5', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-1.5 text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              {trend.value >= 0 ? (
                <TrendingUp size={14} className="text-emerald-500" />
              ) : (
                <TrendingDown size={14} className="text-red-500" />
              )}
              <span
                className={cn(
                  'text-xs font-medium',
                  trend.value >= 0 ? 'text-emerald-600' : 'text-red-600',
                )}
              >
                {trend.value > 0 && '+'}
                {trend.value}%
              </span>
              <span className="text-xs text-gray-400">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={cn('rounded-lg p-2.5', iconBg)}>{icon}</div>
      </div>
    </div>
  );
}
