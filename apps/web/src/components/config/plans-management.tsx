'use client';

import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

interface Plan {
  id: string;
  name: string;
  days: number;
  shift: string;
  price: number;
  active: boolean;
}

const mockPlans: Plan[] = [
  { id: '1', name: 'Full Day 20 days', days: 20, shift: 'Full Day', price: 899, active: true },
  { id: '2', name: 'Morning 15 days', days: 15, shift: 'Morning', price: 599, active: true },
  { id: '3', name: 'Morning 10 days', days: 10, shift: 'Morning', price: 420, active: true },
  { id: '4', name: 'Afternoon 15 days', days: 15, shift: 'Afternoon', price: 599, active: true },
  { id: '5', name: 'Drop-in (daily)', days: 1, shift: 'Full Day', price: 80, active: true },
  { id: '6', name: 'Summer Promo', days: 20, shift: 'Full Day', price: 799, active: false },
];

export function PlansManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Plans & Pricing</h3>
          <p className="text-sm text-gray-500">Manage the plans offered by the daycare</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus size={14} /> New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockPlans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              'bg-white rounded-xl border p-5',
              plan.active ? 'border-gray-200' : 'border-gray-100 opacity-60',
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                <p className="text-xs text-gray-500">{plan.days} {plan.days > 1 ? 'days' : 'day'} — {plan.shift}</p>
              </div>
              <Badge variant={plan.active ? 'success' : 'neutral'} size="sm">
                {plan.active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-4">
              {formatCurrency(plan.price)}
              <span className="text-sm font-normal text-gray-400">/month</span>
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1 flex-1">
                <Edit size={12} /> Edit
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 !px-2">
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
