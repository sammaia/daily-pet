'use client';

import React from 'react';
import { X, Clock, LogIn, LogOut, Phone, MessageSquare } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getStatusConfig, shiftLabels } from '@/lib/utils/status';
import type { BookingRow } from './booking-table';

interface BookingDetailPanelProps {
  booking: BookingRow | null;
  onClose: () => void;
}

export function BookingDetailPanel({ booking, onClose }: BookingDetailPanelProps) {
  if (!booking) return null;

  const statusCfg = getStatusConfig('booking', booking.status);

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg">
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Pet info */}
          <div className="flex items-center gap-4 mb-6">
            <Avatar name={booking.petName} size="xl" />
            <div>
              <h4 className="text-xl font-bold text-gray-900">{booking.petName}</h4>
              <p className="text-sm text-gray-500">{booking.petBreed}</p>
              <Badge variant={statusCfg.variant} dot className="mt-1.5">{statusCfg.label}</Badge>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
              <Clock size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Shift</p>
                <p className="text-sm font-medium text-gray-900">{shiftLabels[booking.shift] || booking.shift}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
              <LogIn size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Check-in</p>
                <p className="text-sm font-medium text-gray-900">{booking.checkInTime || 'Not yet performed'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
              <LogOut size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Check-out</p>
                <p className="text-sm font-medium text-gray-900">{booking.checkOutTime || 'Not yet performed'}</p>
              </div>
            </div>
          </div>

          {/* Owner info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-xs text-gray-500 mb-2">Owner</p>
            <div className="flex items-center gap-3">
              <Avatar name={booking.tutorName} size="sm" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{booking.tutorName}</p>
              </div>
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <Phone size={14} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <MessageSquare size={14} className="text-gray-500" />
              </button>
            </div>
          </div>

          {booking.notes && (
            <div className="mb-6">
              <p className="text-xs text-gray-500 mb-1">Notes</p>
              <p className="text-sm text-gray-700 bg-amber-50 border border-amber-100 rounded-lg p-3">{booking.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {booking.status === 'confirmed' && (
              <Button className="flex-1 gap-2">
                <LogIn size={16} /> Check In
              </Button>
            )}
            {booking.status === 'checked_in' && (
              <Button variant="secondary" className="flex-1 gap-2">
                <LogOut size={16} /> Check Out
              </Button>
            )}
            <Button variant="outline" className="flex-1">
              Edit Booking
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
