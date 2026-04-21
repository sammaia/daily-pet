'use client';

import React from 'react';
import { Clock, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getStatusConfig } from '@/lib/utils/status';

interface Booking {
  id: string;
  petName: string;
  petBreed: string;
  petAvatar?: string;
  tutorName: string;
  shift: string;
  status: string;
  checkInTime?: string;
}

const mockBookings: Booking[] = [
  { id: '1', petName: 'Thor', petBreed: 'Golden Retriever', tutorName: 'Joao Silva', shift: 'Full Day', status: 'checked_in', checkInTime: '07:45' },
  { id: '2', petName: 'Luna', petBreed: 'Border Collie', tutorName: 'Ana Costa', shift: 'Morning', status: 'confirmed' },
  { id: '3', petName: 'Bob', petBreed: 'French Bulldog', tutorName: 'Pedro Santos', shift: 'Full Day', status: 'confirmed' },
  { id: '4', petName: 'Mel', petBreed: 'Poodle', tutorName: 'Carla Lima', shift: 'Afternoon', status: 'pending' },
  { id: '5', petName: 'Rex', petBreed: 'Labrador', tutorName: 'Lucas Rocha', shift: 'Full Day', status: 'checked_in', checkInTime: '08:10' },
  { id: '6', petName: 'Nina', petBreed: 'Shih Tzu', tutorName: 'Mariana Alves', shift: 'Morning', status: 'checked_in', checkInTime: '08:30' },
];

export function TodayBookings() {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Today&apos;s Bookings</h3>
        <span className="text-xs text-gray-400">{mockBookings.length} bookings</span>
      </div>
      <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
        {mockBookings.map((b) => {
          const statusCfg = getStatusConfig('booking', b.status);
          return (
            <div key={b.id} className="px-5 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
              <Avatar name={b.petName} size="sm" statusColor={b.status === 'checked_in' ? 'green' : undefined} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{b.petName}</p>
                <p className="text-xs text-gray-500 truncate">{b.petBreed} — {b.tutorName}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-gray-400">{b.shift}</span>
                <Badge variant={statusCfg.variant} dot size="sm">
                  {statusCfg.label}
                </Badge>
                {b.status === 'confirmed' && (
                  <Button size="sm" variant="outline" className="!px-2 !py-1 text-xs gap-1">
                    <LogIn size={12} /> Check-in
                  </Button>
                )}
                {b.status === 'checked_in' && (
                  <Button size="sm" variant="ghost" className="!px-2 !py-1 text-xs gap-1 text-amber-600">
                    <LogOut size={12} /> Check-out
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
