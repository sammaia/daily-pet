'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutGrid, List, DogIcon } from 'lucide-react';
import { SearchInput } from '@/components/ui/search-input';
import { Button } from '@/components/ui/button';
import { PetCard } from '@/components/pets/pet-card';
import { PetTable, type PetRow } from '@/components/pets/pet-table';
import { cn } from '@/lib/utils/cn';

const mockPets: PetRow[] = [
  { id: '1', name: 'Thor', breed: 'Golden Retriever', age: '3 years', tutorName: 'Joao Silva', vaccineStatus: 'valid', totalBookings: 24 },
  { id: '2', name: 'Luna', breed: 'Border Collie', age: '2 years', tutorName: 'Ana Costa', vaccineStatus: 'valid', totalBookings: 18 },
  { id: '3', name: 'Bob', breed: 'French Bulldog', age: '4 years', tutorName: 'Pedro Santos', vaccineStatus: 'expiring_soon', totalBookings: 12 },
  { id: '4', name: 'Mel', breed: 'Poodle', age: '1 year', tutorName: 'Carla Lima', vaccineStatus: 'expired', totalBookings: 6 },
  { id: '5', name: 'Rex', breed: 'Labrador', age: '5 years', tutorName: 'Lucas Rocha', vaccineStatus: 'valid', totalBookings: 42 },
  { id: '6', name: 'Nina', breed: 'Shih Tzu', age: '2 years', tutorName: 'Mariana Alves', vaccineStatus: 'valid', totalBookings: 15 },
  { id: '7', name: 'Max', breed: 'German Shepherd', age: '3 years', tutorName: 'Roberto Dias', vaccineStatus: 'missing', totalBookings: 8 },
  { id: '8', name: 'Bella', breed: 'Beagle', age: '1 year', tutorName: 'Juliana Martins', vaccineStatus: 'valid', totalBookings: 3 },
  { id: '9', name: 'Toby', breed: 'Yorkshire', age: '6 years', tutorName: 'Fernando Oliveira', vaccineStatus: 'expiring_soon', totalBookings: 31 },
  { id: '10', name: 'Lola', breed: 'Dachshund', age: '4 years', tutorName: 'Patricia Nunes', vaccineStatus: 'valid', totalBookings: 20 },
  { id: '11', name: 'Duke', breed: 'Rottweiler', age: '2 years', tutorName: 'Ricardo Mendes', vaccineStatus: 'valid', totalBookings: 11 },
  { id: '12', name: 'Maggie', breed: 'Cocker Spaniel', age: '3 years', tutorName: 'Camila Ferreira', vaccineStatus: 'expired', totalBookings: 7 },
];

export default function PetsPage() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const router = useRouter();

  const filtered = mockPets.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tutorName.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name, breed or owner..."
          className="sm:w-72"
        />
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setView('grid')}
              className={cn(
                'p-2 rounded-md transition-colors',
                view === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700',
              )}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700',
              )}
            >
              <List size={16} />
            </button>
          </div>
          <Button className="gap-2 shrink-0">
            <DogIcon size={16} /> Register Pet
          </Button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-6 text-sm">
        <span className="text-gray-500">Total: <strong className="text-gray-900">{mockPets.length}</strong></span>
        <span className="text-emerald-600">Vaccines OK: <strong>{mockPets.filter(p => p.vaccineStatus === 'valid').length}</strong></span>
        <span className="text-amber-600">Expiring: <strong>{mockPets.filter(p => p.vaccineStatus === 'expiring_soon').length}</strong></span>
        <span className="text-red-600">Irregular: <strong>{mockPets.filter(p => ['expired', 'missing'].includes(p.vaccineStatus)).length}</strong></span>
      </div>

      {/* Content */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((pet) => (
            <PetCard
              key={pet.id}
              id={pet.id}
              name={pet.name}
              breed={pet.breed}
              age={pet.age}
              tutorName={pet.tutorName}
              avatar={pet.avatar}
              vaccineStatus={pet.vaccineStatus}
            />
          ))}
        </div>
      ) : (
        <PetTable
          pets={filtered}
          onRowClick={(pet) => router.push(`/dashboard/pets/${pet.id}`)}
        />
      )}
    </div>
  );
}
