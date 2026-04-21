'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { PetInfoTab } from '@/components/pets/pet-info-tab';
import { PetVaccinesTab } from '@/components/pets/pet-vaccines-tab';
import { PetHistoryTab } from '@/components/pets/pet-history-tab';
import { PetReportsTab } from '@/components/pets/pet-reports-tab';

// Mock data
const mockPet = {
  id: '1',
  name: 'Thor',
  breed: 'Golden Retriever',
  birthDate: '03/15/2023',
  gender: 'Male',
  weight: '32kg',
  size: 'Large',
  color: 'Golden',
  neutered: true,
  allergies: ['Chicken', 'Fleas'],
  observations: 'Very active, needs plenty of exercise. Can be dominant with smaller dogs.',
  tutorName: 'Joao Silva',
  tutorPhone: '(31) 99999-1234',
  tutorEmail: 'joao@email.com',
};

const mockVaccines = [
  { id: '1', name: 'V10', appliedDate: '2025-06-15', expiryDate: '2026-06-15', status: 'valid', veterinarian: 'Dr. Carlos' },
  { id: '2', name: 'Rabies', appliedDate: '2025-08-10', expiryDate: '2026-08-10', status: 'valid', veterinarian: 'Dr. Carlos' },
  { id: '3', name: 'Giardia', appliedDate: '2025-01-20', expiryDate: '2026-01-20', status: 'expired', veterinarian: 'Dr. Ana' },
  { id: '4', name: 'Kennel Cough', appliedDate: '2025-11-05', expiryDate: '2026-05-05', status: 'expiring_soon', veterinarian: 'Dr. Carlos' },
];

const mockBookings = [
  { id: '1', date: '2026-02-23', shift: 'full_day', status: 'checked_in', checkIn: '07:45', checkOut: undefined },
  { id: '2', date: '2026-02-20', shift: 'full_day', status: 'checked_out', checkIn: '08:00', checkOut: '17:30' },
  { id: '3', date: '2026-02-18', shift: 'morning', status: 'checked_out', checkIn: '07:30', checkOut: '12:15' },
  { id: '4', date: '2026-02-15', shift: 'full_day', status: 'checked_out', checkIn: '08:15', checkOut: '17:45' },
  { id: '5', date: '2026-02-13', shift: 'full_day', status: 'no_show' },
];

const mockReports = [
  { id: '1', date: '2026-02-20', feeding: 5, behavior: 4, socialization: 4, energy: 5, overall: 4.5, caregiverName: 'Paula', notes: 'Played a lot with Luna' },
  { id: '2', date: '2026-02-18', feeding: 4, behavior: 3, socialization: 5, energy: 4, overall: 4, caregiverName: 'Ricardo' },
  { id: '3', date: '2026-02-15', feeding: 5, behavior: 5, socialization: 4, energy: 3, overall: 4.3, caregiverName: 'Paula', notes: 'Calm day' },
];

const tabs = [
  { id: 'info', label: 'Information' },
  { id: 'vaccines', label: 'Vaccines', count: mockVaccines.length },
  { id: 'history', label: 'History', count: mockBookings.length },
  { id: 'reports', label: 'Report Cards', count: mockReports.length },
];

export default function PetProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/pets"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={18} className="text-gray-500" />
        </Link>
        <div className="flex items-center gap-4 flex-1">
          <Avatar name={mockPet.name} size="xl" />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{mockPet.name}</h1>
              <Badge variant="success" dot>Active</Badge>
            </div>
            <p className="text-gray-500">{mockPet.breed} — {mockPet.gender}, {mockPet.weight}</p>
            <p className="text-sm text-gray-400">Owner: {mockPet.tutorName}</p>
          </div>
          <Button variant="outline" className="gap-2 shrink-0">
            <Edit size={14} /> Edit
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab content */}
      {activeTab === 'info' && <PetInfoTab pet={mockPet} />}
      {activeTab === 'vaccines' && <PetVaccinesTab vaccines={mockVaccines} />}
      {activeTab === 'history' && <PetHistoryTab bookings={mockBookings} />}
      {activeTab === 'reports' && <PetReportsTab reports={mockReports} />}
    </div>
  );
}
