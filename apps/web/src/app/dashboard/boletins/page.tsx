'use client';

import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Tabs } from '@/components/ui/tabs';
import { SearchInput } from '@/components/ui/search-input';
import { PendingReportCard } from '@/components/boletins/pending-report-card';
import { ReportsTable, type ReportRow } from '@/components/boletins/reports-table';
import { ReportForm } from '@/components/boletins/report-form';
import { ReportView } from '@/components/boletins/report-view';
import { EmptyState } from '@/components/ui/empty-state';

const mockPending = [
  { petName: 'Luna', petBreed: 'Border Collie', shift: 'Manha', checkInTime: '07:30' },
  { petName: 'Bob', petBreed: 'Bulldog Frances', shift: 'Integral', checkInTime: '08:00' },
  { petName: 'Mel', petBreed: 'Poodle', shift: 'Integral', checkInTime: '08:15' },
  { petName: 'Bella', petBreed: 'Beagle', shift: 'Tarde', checkInTime: '13:10' },
  { petName: 'Max', petBreed: 'Pastor Alemao', shift: 'Integral', checkInTime: '07:50' },
];

const mockTodayReports: ReportRow[] = [
  { id: '1', petName: 'Thor', date: '2026-02-23', feeding: 5, behavior: 4, socialization: 4, energy: 5, overall: 4.5, caregiverName: 'Paula' },
  { id: '2', petName: 'Rex', date: '2026-02-23', feeding: 4, behavior: 5, socialization: 3, energy: 4, overall: 4, caregiverName: 'Ricardo' },
  { id: '3', petName: 'Nina', date: '2026-02-23', feeding: 5, behavior: 4, socialization: 5, energy: 3, overall: 4.3, caregiverName: 'Paula' },
];

const mockAllReports: ReportRow[] = [
  ...mockTodayReports,
  { id: '4', petName: 'Luna', date: '2026-02-22', feeding: 4, behavior: 4, socialization: 5, energy: 4, overall: 4.3, caregiverName: 'Ricardo' },
  { id: '5', petName: 'Thor', date: '2026-02-22', feeding: 5, behavior: 5, socialization: 4, energy: 5, overall: 4.8, caregiverName: 'Paula' },
  { id: '6', petName: 'Bob', date: '2026-02-21', feeding: 3, behavior: 3, socialization: 3, energy: 2, overall: 2.8, caregiverName: 'Ricardo' },
  { id: '7', petName: 'Mel', date: '2026-02-21', feeding: 4, behavior: 4, socialization: 4, energy: 4, overall: 4, caregiverName: 'Paula' },
  { id: '8', petName: 'Rex', date: '2026-02-20', feeding: 5, behavior: 3, socialization: 4, energy: 5, overall: 4.3, caregiverName: 'Paula' },
];

const tabList = [
  { id: 'pending', label: 'Pendentes', count: mockPending.length },
  { id: 'today', label: 'Hoje', count: mockTodayReports.length },
  { id: 'all', label: 'Todos' },
];

export default function BoletinsPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedPet, setSelectedPet] = useState('');
  const [selectedReport, setSelectedReport] = useState<ReportRow | null>(null);

  function handleCreateReport(petName: string) {
    setSelectedPet(petName);
    setShowForm(true);
  }

  const filteredAll = mockAllReports.filter(
    (r) => r.petName.toLowerCase().includes(search.toLowerCase()) || r.caregiverName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <Tabs tabs={tabList} activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab !== 'pending' && (
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar por pet ou cuidador..."
            className="sm:w-64"
          />
        )}
      </div>

      {/* Content */}
      {activeTab === 'pending' && (
        <div className="space-y-3">
          {mockPending.length === 0 ? (
            <EmptyState
              icon={<FileText size={48} />}
              title="Todos os boletins estao em dia!"
              description="Nenhum pet aguardando avaliacao hoje."
            />
          ) : (
            mockPending.map((p) => (
              <PendingReportCard
                key={p.petName}
                {...p}
                onCreateReport={() => handleCreateReport(p.petName)}
              />
            ))
          )}
        </div>
      )}

      {activeTab === 'today' && (
        <div className="space-y-4">
          {mockTodayReports.length === 0 ? (
            <EmptyState
              icon={<FileText size={48} />}
              title="Nenhum boletim criado hoje"
              description="Comece avaliando os pets na aba Pendentes."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockTodayReports.map((r) => (
                <ReportView
                  key={r.id}
                  petName={r.petName}
                  date={r.date}
                  caregiverName={r.caregiverName}
                  feeding={r.feeding}
                  behavior={r.behavior}
                  socialization={r.socialization}
                  energy={r.energy}
                  overall={r.overall}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'all' && (
        <ReportsTable reports={filteredAll} onRowClick={setSelectedReport} />
      )}

      {/* Form modal */}
      <ReportForm open={showForm} onClose={() => setShowForm(false)} petName={selectedPet} />
    </div>
  );
}
