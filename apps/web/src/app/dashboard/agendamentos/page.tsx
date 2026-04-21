'use client';

import React, { useState } from 'react';
import { Plus, List, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import { Calendar } from '@/components/ui/calendar';
import { AvailabilityMeter } from '@/components/agendamentos/availability-meter';
import { BookingTable, type BookingRow } from '@/components/agendamentos/booking-table';
import { NewBookingModal } from '@/components/agendamentos/new-booking-modal';
import { BookingDetailPanel } from '@/components/agendamentos/booking-detail-panel';
import { cn } from '@/lib/utils/cn';

const mockBookings: BookingRow[] = [
  { id: '1', petName: 'Thor', petBreed: 'Golden Retriever', tutorName: 'Joao Silva', shift: 'full_day', status: 'checked_in', checkInTime: '07:45', notes: 'Switch to natural food instead of kibble' },
  { id: '2', petName: 'Luna', petBreed: 'Border Collie', tutorName: 'Ana Costa', shift: 'morning', status: 'confirmed' },
  { id: '3', petName: 'Bob', petBreed: 'French Bulldog', tutorName: 'Pedro Santos', shift: 'full_day', status: 'confirmed' },
  { id: '4', petName: 'Mel', petBreed: 'Poodle', tutorName: 'Carla Lima', shift: 'afternoon', status: 'pending' },
  { id: '5', petName: 'Rex', petBreed: 'Labrador', tutorName: 'Lucas Rocha', shift: 'full_day', status: 'checked_in', checkInTime: '08:10' },
  { id: '6', petName: 'Nina', petBreed: 'Shih Tzu', tutorName: 'Mariana Alves', shift: 'morning', status: 'checked_in', checkInTime: '08:30' },
  { id: '7', petName: 'Max', petBreed: 'German Shepherd', tutorName: 'Roberto Dias', shift: 'full_day', status: 'cancelled' },
  { id: '8', petName: 'Bella', petBreed: 'Beagle', tutorName: 'Juliana Martins', shift: 'afternoon', status: 'confirmed' },
];

export default function AgendamentosPage() {
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingRow | null>(null);

  const filtered = mockBookings.filter(
    (b) =>
      b.petName.toLowerCase().includes(search.toLowerCase()) ||
      b.tutorName.toLowerCase().includes(search.toLowerCase()),
  );

  const calendarMarkers = [
    { date: new Date(), color: 'bg-blue-500', count: 8 },
    { date: new Date(Date.now() + 86400000), color: 'bg-amber-500', count: 5 },
    { date: new Date(Date.now() + 172800000), color: 'bg-emerald-500', count: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by pet or owner..."
          className="sm:w-72"
        />
        <Button onClick={() => setShowModal(true)} className="gap-2 shrink-0">
          <Plus size={16} /> New Booking
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left — calendar + availability */}
        <div className="space-y-4">
          <Calendar
            selected={selectedDate}
            onSelect={setSelectedDate}
            markers={calendarMarkers}
          />
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <AvailabilityMeter used={12} total={20} />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Day Summary</h4>
            <div className="space-y-2">
              {[
                { label: 'Morning', count: 3, color: 'bg-sky-500' },
                { label: 'Afternoon', count: 2, color: 'bg-amber-500' },
                { label: 'Full Day', count: 5, color: 'bg-emerald-500' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={cn('h-2 w-2 rounded-full', s.color)} />
                    <span className="text-gray-600">{s.label}</span>
                  </div>
                  <span className="font-medium text-gray-900">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — bookings table */}
        <div className="lg:col-span-3">
          <BookingTable
            bookings={filtered}
            onRowClick={setSelectedBooking}
          />
        </div>
      </div>

      {/* Modals */}
      <NewBookingModal open={showModal} onClose={() => setShowModal(false)} />
      <BookingDetailPanel booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
    </div>
  );
}
