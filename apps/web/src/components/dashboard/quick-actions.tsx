import React from 'react';
import Link from 'next/link';
import { Calendar, LogIn, FileText, MessageSquare, Plus, DogIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const actions = [
  { label: 'New Booking', icon: Plus, href: '/dashboard/agendamentos', color: 'bg-blue-100 text-blue-600' },
  { label: 'Quick Check-in', icon: LogIn, href: '/dashboard/agendamentos', color: 'bg-emerald-100 text-emerald-600' },
  { label: 'Create Report Card', icon: FileText, href: '/dashboard/boletins', color: 'bg-amber-100 text-amber-600' },
  { label: 'Send Message', icon: MessageSquare, href: '/dashboard/chat', color: 'bg-purple-100 text-purple-600' },
  { label: 'Register Pet', icon: DogIcon, href: '/dashboard/pets', color: 'bg-rose-100 text-rose-600' },
  { label: 'View Schedule', icon: Calendar, href: '/dashboard/agendamentos', color: 'bg-sky-100 text-sky-600' },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-center group"
            >
              <div className={cn('rounded-lg p-2.5 transition-transform group-hover:scale-105', action.color)}>
                <Icon size={20} />
              </div>
              <span className="text-xs font-medium text-gray-700">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
