'use client';

import React, { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const daysOfWeek = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

interface DaySchedule {
  enabled: boolean;
  open: string;
  close: string;
}

export function OperatingHours() {
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>({
    monday: { enabled: true, open: '07:00', close: '18:00' },
    tuesday: { enabled: true, open: '07:00', close: '18:00' },
    wednesday: { enabled: true, open: '07:00', close: '18:00' },
    thursday: { enabled: true, open: '07:00', close: '18:00' },
    friday: { enabled: true, open: '07:00', close: '18:00' },
    saturday: { enabled: true, open: '08:00', close: '14:00' },
    sunday: { enabled: false, open: '08:00', close: '12:00' },
  });

  function updateDay(key: string, updates: Partial<DaySchedule>) {
    setSchedule((prev) => ({ ...prev, [key]: { ...prev[key], ...updates } }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">Operating Hours</h3>
        <p className="text-sm text-gray-500">Configure operating hours per day of the week</p>
      </div>

      <div className="space-y-3">
        {daysOfWeek.map((day) => {
          const s = schedule[day.key];
          return (
            <div
              key={day.key}
              className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0"
            >
              <div className="w-40">
                <Toggle
                  checked={s.enabled}
                  onChange={(checked) => updateDay(day.key, { enabled: checked })}
                  label={day.label}
                />
              </div>
              {s.enabled ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={s.open}
                    onChange={(e) => updateDay(day.key, { open: e.target.value })}
                    className="!w-32"
                  />
                  <span className="text-gray-400">to</span>
                  <Input
                    type="time"
                    value={s.close}
                    onChange={(e) => updateDay(day.key, { close: e.target.value })}
                    className="!w-32"
                  />
                </div>
              ) : (
                <span className="text-sm text-gray-400">Closed</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button>Save Hours</Button>
      </div>
    </div>
  );
}
