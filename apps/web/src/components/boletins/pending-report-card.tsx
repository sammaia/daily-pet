import React from 'react';
import { FileText, Clock } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

interface PendingReportCardProps {
  petName: string;
  petBreed: string;
  shift: string;
  checkInTime: string;
  onCreateReport: () => void;
}

export function PendingReportCard({ petName, petBreed, shift, checkInTime, onCreateReport }: PendingReportCardProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-dashed border-amber-300 p-4 hover:border-amber-400 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar name={petName} size="md" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900">{petName}</p>
          <p className="text-xs text-gray-500">{petBreed}</p>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
            <Clock size={12} />
            <span>{shift} — Check-in {checkInTime}</span>
          </div>
        </div>
        <Button size="sm" onClick={onCreateReport} className="gap-1.5 shrink-0">
          <FileText size={14} /> Criar Boletim
        </Button>
      </div>
    </div>
  );
}
