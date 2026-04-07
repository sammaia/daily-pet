'use client';

import React, { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CalendarMarker {
  date: Date;
  color?: string;
  count?: number;
}

interface CalendarProps {
  selected?: Date | null;
  onSelect?: (date: Date) => void;
  markers?: CalendarMarker[];
  className?: string;
}

export function Calendar({ selected, onSelect, markers = [], className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart, { locale: ptBR });
  const calEnd = endOfWeek(monthEnd, { locale: ptBR });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  function getMarker(date: Date) {
    return markers.find((m) => isSameDay(m.date, date));
  }

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={18} className="text-gray-600" />
        </button>
        <h3 className="text-sm font-semibold text-gray-800 capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={18} className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {weekDays.map((d) => (
          <div key={d} className="text-center text-[11px] font-medium text-gray-400 py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day) => {
          const inMonth = isSameMonth(day, currentMonth);
          const isSelected = selected && isSameDay(day, selected);
          const today = isToday(day);
          const marker = getMarker(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelect?.(day)}
              className={cn(
                'relative h-9 w-full rounded-lg text-sm transition-colors',
                !inMonth && 'text-gray-300',
                inMonth && !isSelected && 'text-gray-700 hover:bg-gray-100',
                today && !isSelected && 'font-bold text-blue-600',
                isSelected && 'bg-blue-600 text-white font-semibold',
              )}
            >
              {format(day, 'd')}
              {marker && (
                <span
                  className={cn(
                    'absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full',
                    isSelected ? 'bg-white' : (marker.color || 'bg-amber-500'),
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
