import React from 'react';
import { AlertTriangle, Syringe, FileWarning, Receipt } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Alert {
  id: string;
  type: 'vaccine' | 'report' | 'payment';
  message: string;
  count?: number;
}

const mockAlerts: Alert[] = [
  { id: '1', type: 'vaccine', message: 'Vacinas vencendo em 7 dias', count: 3 },
  { id: '2', type: 'report', message: 'Boletins pendentes de ontem', count: 2 },
  { id: '3', type: 'payment', message: 'Faturas atrasadas', count: 1 },
];

const alertConfig = {
  vaccine: { icon: Syringe, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', iconColor: 'text-amber-500' },
  report: { icon: FileWarning, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', iconColor: 'text-blue-500' },
  payment: { icon: Receipt, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', iconColor: 'text-red-500' },
};

export function AlertsPanel() {
  if (mockAlerts.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={16} className="text-amber-500" />
        <h3 className="font-semibold text-gray-800">Alertas</h3>
      </div>
      <div className="space-y-2.5">
        {mockAlerts.map((alert) => {
          const cfg = alertConfig[alert.type];
          const Icon = cfg.icon;
          return (
            <div
              key={alert.id}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg border',
                cfg.bg,
                cfg.border,
              )}
            >
              <Icon size={16} className={cfg.iconColor} />
              <span className={cn('flex-1 text-sm font-medium', cfg.text)}>{alert.message}</span>
              {alert.count && (
                <span className={cn('text-xs font-bold', cfg.text)}>{alert.count}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
