'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/hooks/use-auth';

const pageConfig: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Day Overview', subtitle: 'Track your daycare operations' },
  '/dashboard/agendamentos': { title: 'Bookings', subtitle: 'Manage reservations and availability' },
  '/dashboard/pets': { title: 'Pets', subtitle: 'Pet registry and history' },
  '/dashboard/boletins': { title: 'Report Cards', subtitle: 'Evaluate pets\' day' },
  '/dashboard/turmas': { title: 'Groups', subtitle: 'Groups and shift distribution' },
  '/dashboard/financeiro': { title: 'Financials', subtitle: 'Revenue, invoices and payments' },
  '/dashboard/chat': { title: 'Chat', subtitle: 'Communication with pet owners' },
  '/dashboard/config': { title: 'Settings', subtitle: 'Daycare and team settings' },
};

export function Header() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const { displayName, initials, email, signOut } = useAuth();
  const config = pageConfig[pathname] || { title: 'Dashboard', subtitle: '' };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{config.title}</h2>
          {config.subtitle && (
            <p className="text-sm text-gray-500">{config.subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} className="text-gray-500" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
          </button>

          {/* User dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                {initials}
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {showDropdown && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setShowDropdown(false)} />
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-30 py-1">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{displayName}</p>
                    <p className="text-xs text-gray-500">{email}</p>
                  </div>
                  <a href="/dashboard/config" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings size={14} /> Settings
                  </a>
                  <a href="/dashboard/config" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <User size={14} /> My Profile
                  </a>
                  <div className="border-t border-gray-100">
                    <button onClick={signOut} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full">
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
