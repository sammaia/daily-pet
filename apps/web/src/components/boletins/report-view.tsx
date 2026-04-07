import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { ScoreDisplay } from '@/components/ui/score-display';
import { formatDateShort } from '@/lib/utils/format';

interface ReportViewProps {
  petName: string;
  date: string;
  caregiverName: string;
  feeding: number;
  behavior: number;
  socialization: number;
  energy: number;
  overall: number;
  notes?: string;
}

export function ReportView({
  petName,
  date,
  caregiverName,
  feeding,
  behavior,
  socialization,
  energy,
  overall,
  notes,
}: ReportViewProps) {
  const categories = [
    { label: 'Alimentacao', score: feeding },
    { label: 'Comportamento', score: behavior },
    { label: 'Socializacao', score: socialization },
    { label: 'Energia', score: energy },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
        <Avatar name={petName} size="md" />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{petName}</h4>
          <p className="text-xs text-gray-500">{formatDateShort(date)} — por {caregiverName}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 mb-1">Nota Geral</p>
          <ScoreDisplay score={overall} variant="stars" size="sm" />
        </div>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {categories.map((cat) => (
          <div key={cat.label}>
            <p className="text-xs text-gray-500 mb-1">{cat.label}</p>
            <ScoreDisplay score={cat.score} variant="bar" />
          </div>
        ))}
      </div>

      {/* Notes */}
      {notes && (
        <div className="bg-gray-50 rounded-lg p-3 mt-3">
          <p className="text-xs text-gray-400 mb-1">Observacoes</p>
          <p className="text-sm text-gray-700">{notes}</p>
        </div>
      )}
    </div>
  );
}
