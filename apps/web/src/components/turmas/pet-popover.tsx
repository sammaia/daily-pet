'use client';

import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';

interface PetPopoverProps {
  name: string;
  breed: string;
  tutorName: string;
  vaccineStatus: 'valid' | 'expiring_soon' | 'expired';
  notes?: string;
  children: React.ReactNode;
}

const statusConfig = {
  valid: { label: 'Vacinas OK', variant: 'success' as const },
  expiring_soon: { label: 'Vencendo', variant: 'warning' as const },
  expired: { label: 'Vencida', variant: 'danger' as const },
};

export function PetPopover({ name, breed, tutorName, vaccineStatus, notes, children }: PetPopoverProps) {
  const [show, setShow] = useState(false);
  const cfg = statusConfig[vaccineStatus];

  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-white rounded-xl border border-gray-200 shadow-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar name={name} size="sm" />
            <div>
              <p className="font-semibold text-sm text-gray-900">{name}</p>
              <p className="text-xs text-gray-500">{breed}</p>
            </div>
          </div>
          <div className="space-y-1.5 text-xs">
            <p className="text-gray-500">Tutor: <span className="text-gray-700 font-medium">{tutorName}</span></p>
            <Badge variant={cfg.variant} dot size="sm">{cfg.label}</Badge>
            {notes && <p className="text-gray-500 mt-2 pt-2 border-t border-gray-100">{notes}</p>}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-white border-r border-b border-gray-200 rotate-45" />
        </div>
      )}
    </div>
  );
}
