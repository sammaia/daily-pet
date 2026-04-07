import React from 'react';
import { Avatar } from '@/components/ui/avatar';

interface PetPresent {
  id: string;
  name: string;
  avatar?: string;
}

const mockPetsPresent: PetPresent[] = [
  { id: '1', name: 'Thor' },
  { id: '2', name: 'Luna' },
  { id: '3', name: 'Rex' },
  { id: '4', name: 'Nina' },
  { id: '5', name: 'Mel' },
  { id: '6', name: 'Bob' },
  { id: '7', name: 'Max' },
  { id: '8', name: 'Bella' },
  { id: '9', name: 'Toby' },
  { id: '10', name: 'Lola' },
  { id: '11', name: 'Duke' },
  { id: '12', name: 'Maggie' },
];

export function PetsPresentGrid() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Pets na Creche</h3>
        <span className="text-sm font-medium text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
          {mockPetsPresent.length} presentes
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {mockPetsPresent.map((pet) => (
          <div key={pet.id} className="flex flex-col items-center gap-1 group cursor-pointer">
            <Avatar
              name={pet.name}
              src={pet.avatar}
              size="md"
              statusColor="green"
              className="transition-transform group-hover:scale-110"
            />
            <span className="text-[11px] text-gray-600 font-medium">{pet.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
