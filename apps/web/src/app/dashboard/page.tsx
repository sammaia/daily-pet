'use client';

import React from 'react';
import { DogIcon, MapPin, Clock, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { TodayBookings } from '@/components/dashboard/today-bookings';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { AlertsPanel } from '@/components/dashboard/alerts-panel';
import { PetsPresentGrid } from '@/components/dashboard/pets-present-grid';
import { formatCurrency } from '@/lib/utils/format';

export default function DashboardPage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {greeting}, Maria! 👋
        </h1>
        <p className="text-gray-500 mt-0.5">Aqui esta o resumo da sua creche hoje.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Pets Presentes"
          value={12}
          icon={<DogIcon size={20} />}
          iconBg="bg-amber-100 text-amber-600"
          trend={{ value: 8, label: 'vs ontem' }}
        />
        <StatCard
          label="Vagas Disponiveis"
          value="8 / 20"
          icon={<MapPin size={20} />}
          iconBg="bg-blue-100 text-blue-600"
        />
        <StatCard
          label="Check-ins Pendentes"
          value={3}
          icon={<Clock size={20} />}
          iconBg="bg-emerald-100 text-emerald-600"
        />
        <StatCard
          label="Receita do Mes"
          value={formatCurrency(12450)}
          icon={<TrendingUp size={20} />}
          iconBg="bg-purple-100 text-purple-600"
          trend={{ value: 12, label: 'vs mes anterior' }}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — bookings */}
        <div className="lg:col-span-2 space-y-6">
          <TodayBookings />
          <PetsPresentGrid />
        </div>

        {/* Right column — actions + alerts */}
        <div className="space-y-6">
          <QuickActions />
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
}
