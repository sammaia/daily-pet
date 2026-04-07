import React from 'react';
import Link from 'next/link';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';

interface PetCardProps {
  id: string;
  name: string;
  breed: string;
  age: string;
  tutorName: string;
  avatar?: string;
  vaccineStatus: 'valid' | 'expiring_soon' | 'expired' | 'missing';
  isActive?: boolean;
}

const vaccineConfig = {
  valid: { label: 'Vacinas em dia', variant: 'success' as const },
  expiring_soon: { label: 'Vencendo', variant: 'warning' as const },
  expired: { label: 'Vencida', variant: 'danger' as const },
  missing: { label: 'Pendente', variant: 'neutral' as const },
};

export function PetCard({ id, name, breed, age, tutorName, avatar, vaccineStatus, isActive }: PetCardProps) {
  const vCfg = vaccineConfig[vaccineStatus];

  return (
    <Link
      href={`/dashboard/pets/${id}`}
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all group"
    >
      <div className="flex items-start gap-4">
        <Avatar
          name={name}
          src={avatar}
          size="lg"
          statusColor={isActive ? 'green' : undefined}
          className="transition-transform group-hover:scale-105"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{name}</h4>
          <p className="text-sm text-gray-500 truncate">{breed} — {age}</p>
          <p className="text-xs text-gray-400 mt-1">Tutor: {tutorName}</p>
          <Badge variant={vCfg.variant} dot size="sm" className="mt-2">
            {vCfg.label}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
