'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Home,
  Calendar,
  FileText,
  Settings,
  DogIcon,
  BarChart3,
  MessageSquare,
  Layers,
  PawPrint,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/hooks/use-auth';

const navItems = [
  { href: '/dashboard', label: 'Visao do Dia', icon: Home },
  { href: '/dashboard/agendamentos', label: 'Agendamentos', icon: Calendar, badge: 3 },
  { href: '/dashboard/pets', label: 'Pets', icon: DogIcon },
  { href: '/dashboard/boletins', label: 'Boletim Diario', icon: FileText, badge: 5 },
  { href: '/dashboard/turmas', label: 'Turmas', icon: Layers },
  { href: '/dashboard/financeiro', label: 'Financeiro', icon: BarChart3 },
  { href: '/dashboard/chat', label: 'Chat', icon: MessageSquare, badge: 2 },
  { href: '/dashboard/config', label: 'Configuracoes', icon: Settings },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { displayName, initials, signOut } = useAuth();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white border border-gray-300 rounded-lg p-2 shadow-sm"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed md:static inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className="px-5 py-5 mt-10 md:mt-0">
          <div className="flex items-center gap-2.5">
            <div className="bg-amber-500 rounded-lg p-1.5">
              <PawPrint size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">PetCare</h1>
              <p className="text-[11px] text-gray-500 leading-tight">Creche Patinhas Felizes</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href + '/'));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm',
                  isActive
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200',
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span
                    className={cn(
                      'text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1',
                      isActive ? 'bg-white/20 text-white' : 'bg-amber-500 text-white',
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-gray-800 p-3">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200 truncate">{displayName}</p>
              <p className="text-[11px] text-gray-500 truncate">Administradora</p>
            </div>
            <button onClick={signOut} className="text-gray-500 hover:text-gray-300 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
