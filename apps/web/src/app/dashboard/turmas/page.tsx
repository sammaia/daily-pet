'use client';

import React from 'react';
import { ShiftGroup } from '@/components/turmas/shift-group';
import { StaffList } from '@/components/turmas/staff-list';
import { StatCard } from '@/components/ui/stat-card';
import { DogIcon, Sun, Sunset, Clock } from 'lucide-react';

const morningPets = [
  { id: '2', name: 'Luna', breed: 'Border Collie', tutorName: 'Ana Costa', vaccineStatus: 'valid' as const },
  { id: '6', name: 'Nina', breed: 'Shih Tzu', tutorName: 'Mariana Alves', vaccineStatus: 'valid' as const },
  { id: '9', name: 'Toby', breed: 'Yorkshire', tutorName: 'Fernando Oliveira', vaccineStatus: 'expiring_soon' as const },
];

const afternoonPets = [
  { id: '4', name: 'Mel', breed: 'Poodle', tutorName: 'Carla Lima', vaccineStatus: 'expired' as const, notes: 'Alergia a grama' },
  { id: '8', name: 'Bella', breed: 'Beagle', tutorName: 'Juliana Martins', vaccineStatus: 'valid' as const },
];

const fullDayPets = [
  { id: '1', name: 'Thor', breed: 'Golden Retriever', tutorName: 'Joao Silva', vaccineStatus: 'valid' as const, notes: 'Pode ser dominante' },
  { id: '3', name: 'Bob', breed: 'Bulldog Frances', tutorName: 'Pedro Santos', vaccineStatus: 'expiring_soon' as const },
  { id: '5', name: 'Rex', breed: 'Labrador', tutorName: 'Lucas Rocha', vaccineStatus: 'valid' as const },
  { id: '10', name: 'Lola', breed: 'Dachshund', tutorName: 'Patricia Nunes', vaccineStatus: 'valid' as const },
  { id: '11', name: 'Duke', breed: 'Rottweiler', tutorName: 'Ricardo Mendes', vaccineStatus: 'valid' as const },
];

const mockStaff = [
  { id: '1', name: 'Paula Mendes', role: 'Cuidadora Senior', shift: 'Integral' },
  { id: '2', name: 'Ricardo Santos', role: 'Cuidador', shift: 'Manha' },
  { id: '3', name: 'Camila Rocha', role: 'Cuidadora', shift: 'Tarde' },
  { id: '4', name: 'Bruno Lima', role: 'Auxiliar', shift: 'Integral' },
];

export default function TurmasPage() {
  const totalPets = morningPets.length + afternoonPets.length + fullDayPets.length;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pets Hoje" value={totalPets} icon={<DogIcon size={20} />} iconBg="bg-amber-100 text-amber-600" />
        <StatCard label="Turno Manha" value={morningPets.length + fullDayPets.length} icon={<Sun size={20} />} iconBg="bg-sky-100 text-sky-600" />
        <StatCard label="Turno Tarde" value={afternoonPets.length + fullDayPets.length} icon={<Sunset size={20} />} iconBg="bg-orange-100 text-orange-600" />
        <StatCard label="Cuidadores" value={mockStaff.length} icon={<Clock size={20} />} iconBg="bg-purple-100 text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shift groups */}
        <div className="lg:col-span-2 space-y-4">
          <ShiftGroup
            shiftLabel="Manha"
            timeRange="07:00 — 12:00"
            color="bg-sky-50"
            pets={morningPets}
            capacity={10}
          />
          <ShiftGroup
            shiftLabel="Tarde"
            timeRange="13:00 — 18:00"
            color="bg-orange-50"
            pets={afternoonPets}
            capacity={10}
          />
          <ShiftGroup
            shiftLabel="Integral"
            timeRange="07:00 — 18:00"
            color="bg-emerald-50"
            pets={fullDayPets}
            capacity={15}
          />
        </div>

        {/* Staff */}
        <div>
          <StaffList staff={mockStaff} />
        </div>
      </div>
    </div>
  );
}
