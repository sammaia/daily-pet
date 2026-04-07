import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { PetPopover } from './pet-popover';
import { cn } from '@/lib/utils/cn';

interface PetInShift {
  id: string;
  name: string;
  breed: string;
  tutorName: string;
  vaccineStatus: 'valid' | 'expiring_soon' | 'expired';
  notes?: string;
}

interface ShiftGroupProps {
  shiftLabel: string;
  timeRange: string;
  color: string;
  pets: PetInShift[];
  capacity: number;
}

export function ShiftGroup({ shiftLabel, timeRange, color, pets, capacity }: ShiftGroupProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className={cn('px-5 py-3 flex items-center justify-between', color)}>
        <div>
          <h4 className="font-semibold text-gray-800">{shiftLabel}</h4>
          <p className="text-xs text-gray-500">{timeRange}</p>
        </div>
        <span className="text-sm font-bold text-gray-700">{pets.length}/{capacity}</span>
      </div>
      <div className="p-5">
        {pets.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">Nenhum pet neste turno</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {pets.map((pet) => (
              <PetPopover
                key={pet.id}
                name={pet.name}
                breed={pet.breed}
                tutorName={pet.tutorName}
                vaccineStatus={pet.vaccineStatus}
                notes={pet.notes}
              >
                <div className="flex flex-col items-center gap-1 cursor-pointer group">
                  <Avatar
                    name={pet.name}
                    size="md"
                    statusColor={pet.vaccineStatus === 'valid' ? 'green' : pet.vaccineStatus === 'expiring_soon' ? 'yellow' : 'red'}
                    className="transition-transform group-hover:scale-110"
                  />
                  <span className="text-xs text-gray-600 font-medium">{pet.name}</span>
                </div>
              </PetPopover>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
