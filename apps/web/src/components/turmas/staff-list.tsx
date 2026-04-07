import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  shift: string;
  avatar?: string;
}

interface StaffListProps {
  staff: StaffMember[];
}

export function StaffList({ staff }: StaffListProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-4">Equipe de Servico</h3>
      <div className="space-y-3">
        {staff.map((s) => (
          <div key={s.id} className="flex items-center gap-3">
            <Avatar name={s.name} src={s.avatar} size="sm" statusColor="green" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{s.name}</p>
              <p className="text-xs text-gray-500">{s.role}</p>
            </div>
            <Badge variant="info" size="sm">{s.shift}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
