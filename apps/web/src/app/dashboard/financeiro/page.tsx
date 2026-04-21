'use client';

import React, { useState } from 'react';
import { DollarSign, TrendingUp, Receipt, CreditCard } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { Tabs } from '@/components/ui/tabs';
import { PeriodSelector } from '@/components/financeiro/period-selector';
import { RevenueChart } from '@/components/financeiro/revenue-chart';
import { PaymentMethodsChart } from '@/components/financeiro/payment-methods-chart';
import { InvoicesTable, type InvoiceRow } from '@/components/financeiro/invoices-table';
import { SubscriptionsTable, type SubscriptionRow } from '@/components/financeiro/subscriptions-table';
import { formatCurrency } from '@/lib/utils/format';

const mockRevenueData = [
  { label: 'Jan', revenue: 8200, expense: 3200 },
  { label: 'Feb', revenue: 9500, expense: 3100 },
  { label: 'Mar', revenue: 11200, expense: 3800 },
  { label: 'Apr', revenue: 10800, expense: 3500 },
  { label: 'May', revenue: 12100, expense: 3900 },
  { label: 'Jun', revenue: 11800, expense: 3700 },
  { label: 'Jul', revenue: 13500, expense: 4100 },
  { label: 'Aug', revenue: 14200, expense: 4300 },
  { label: 'Sep', revenue: 13800, expense: 4000 },
  { label: 'Oct', revenue: 15100, expense: 4500 },
  { label: 'Nov', revenue: 14500, expense: 4200 },
  { label: 'Dec', revenue: 12450, expense: 3800 },
];

const mockPaymentMethods = [
  { method: 'Pix', value: 7200, color: '#10b981' },
  { method: 'Credit Card', value: 3500, color: '#3b82f6' },
  { method: 'Bank Slip', value: 1200, color: '#f59e0b' },
  { method: 'Debit Card', value: 550, color: '#8b5cf6' },
];

const mockInvoices: InvoiceRow[] = [
  { id: '1', tutorName: 'Joao Silva', petName: 'Thor', amount: 450, method: 'pix', status: 'received', dueDate: '2026-02-15', paidDate: '2026-02-14' },
  { id: '2', tutorName: 'Ana Costa', petName: 'Luna', amount: 380, method: 'credit_card', status: 'received', dueDate: '2026-02-15', paidDate: '2026-02-15' },
  { id: '3', tutorName: 'Pedro Santos', petName: 'Bob', amount: 320, method: 'boleto', status: 'overdue', dueDate: '2026-02-10' },
  { id: '4', tutorName: 'Carla Lima', petName: 'Mel', amount: 280, method: 'pix', status: 'pending', dueDate: '2026-02-28' },
  { id: '5', tutorName: 'Lucas Rocha', petName: 'Rex', amount: 450, method: 'pix', status: 'received', dueDate: '2026-02-15', paidDate: '2026-02-13' },
  { id: '6', tutorName: 'Mariana Alves', petName: 'Nina', amount: 280, method: 'credit_card', status: 'received', dueDate: '2026-02-15', paidDate: '2026-02-15' },
  { id: '7', tutorName: 'Roberto Dias', petName: 'Max', amount: 450, method: 'boleto', status: 'pending', dueDate: '2026-03-01' },
  { id: '8', tutorName: 'Fernando Oliveira', petName: 'Toby', amount: 380, method: 'pix', status: 'cancelled', dueDate: '2026-02-15' },
];

const mockSubscriptions: SubscriptionRow[] = [
  { id: '1', tutorName: 'Joao Silva', planName: 'Full Day 20 days', amount: 899, status: 'active', nextBilling: '2026-03-01' },
  { id: '2', tutorName: 'Ana Costa', planName: 'Morning 15 days', amount: 599, status: 'active', nextBilling: '2026-03-05' },
  { id: '3', tutorName: 'Lucas Rocha', planName: 'Full Day 20 days', amount: 899, status: 'active', nextBilling: '2026-03-01' },
  { id: '4', tutorName: 'Pedro Santos', planName: 'Drop-in', amount: 0, status: 'paused', nextBilling: '2026-03-15' },
  { id: '5', tutorName: 'Mariana Alves', planName: 'Morning 10 days', amount: 420, status: 'active', nextBilling: '2026-03-10' },
];

const tabList = [
  { id: 'overview', label: 'Overview' },
  { id: 'invoices', label: 'Invoices', count: mockInvoices.length },
  { id: 'subscriptions', label: 'Subscriptions', count: mockSubscriptions.length },
];

export default function FinanceiroPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [period, setPeriod] = useState('30d');

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <Tabs tabs={tabList} activeTab={activeTab} onTabChange={setActiveTab} />
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>

      {activeTab === 'overview' && (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Monthly Revenue"
              value={formatCurrency(12450)}
              icon={<DollarSign size={20} />}
              iconBg="bg-emerald-100 text-emerald-600"
              trend={{ value: 12, label: 'vs last month' }}
            />
            <StatCard
              label="Average Ticket"
              value={formatCurrency(380)}
              icon={<TrendingUp size={20} />}
              iconBg="bg-blue-100 text-blue-600"
              trend={{ value: 5, label: 'vs last month' }}
            />
            <StatCard
              label="Pending Invoices"
              value={2}
              icon={<Receipt size={20} />}
              iconBg="bg-amber-100 text-amber-600"
            />
            <StatCard
              label="Delinquency Rate"
              value="3.2%"
              icon={<CreditCard size={20} />}
              iconBg="bg-red-100 text-red-600"
              trend={{ value: -1.5, label: 'vs last month' }}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart data={mockRevenueData} />
            </div>
            <PaymentMethodsChart data={mockPaymentMethods} />
          </div>

          {/* Recent invoices */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Recent Invoices</h3>
            <InvoicesTable invoices={mockInvoices.slice(0, 5)} />
          </div>
        </>
      )}

      {activeTab === 'invoices' && <InvoicesTable invoices={mockInvoices} />}
      {activeTab === 'subscriptions' && <SubscriptionsTable subscriptions={mockSubscriptions} />}
    </div>
  );
}
