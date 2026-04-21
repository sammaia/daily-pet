'use client';

import React, { useState } from 'react';
import { Building2, Clock, Users, Syringe, CreditCard, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { CrecheForm } from '@/components/config/creche-form';
import { OperatingHours } from '@/components/config/operating-hours';
import { TeamManagement } from '@/components/config/team-management';
import { VaccineRequirements } from '@/components/config/vaccine-requirements';
import { PlansManagement } from '@/components/config/plans-management';
import { AccountSettings } from '@/components/config/account-settings';

const sections = [
  { id: 'creche', label: 'Daycare Info', icon: Building2 },
  { id: 'hours', label: 'Hours', icon: Clock },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'vaccines', label: 'Vaccines', icon: Syringe },
  { id: 'plans', label: 'Plans', icon: CreditCard },
  { id: 'account', label: 'My Account', icon: User },
];

export default function ConfigPage() {
  const [activeSection, setActiveSection] = useState('creche');

  return (
    <div className="flex gap-6 min-h-[calc(100vh-180px)]">
      {/* Sidebar nav */}
      <nav className="w-52 shrink-0 hidden md:block">
        <div className="sticky top-6 space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const active = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors text-left',
                  active
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100',
                )}
              >
                <Icon size={16} />
                {section.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile tabs */}
      <div className="md:hidden w-full">
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors',
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600',
                )}
              >
                <Icon size={14} />
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6">
        {activeSection === 'creche' && <CrecheForm />}
        {activeSection === 'hours' && <OperatingHours />}
        {activeSection === 'team' && <TeamManagement />}
        {activeSection === 'vaccines' && <VaccineRequirements />}
        {activeSection === 'plans' && <PlansManagement />}
        {activeSection === 'account' && <AccountSettings />}
      </div>
    </div>
  );
}
