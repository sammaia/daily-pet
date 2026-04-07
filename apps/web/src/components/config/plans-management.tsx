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
  { id: '1', name: 'Integral 20 dias', days: 20, shift: 'Integral', price: 899, active: true },
  { id: '2', name: 'Manha 15 dias', days: 15, shift: 'Manha', price: 599, active: true },
  { id: '3', name: 'Manha 10 dias', days: 10, shift: 'Manha', price: 420, active: true },
  { id: '4', name: 'Tarde 15 dias', days: 15, shift: 'Tarde', price: 599, active: true },
  { id: '5', name: 'Avulso (diaria)', days: 1, shift: 'Integral', price: 80, active: true },
  { id: '6', name: 'Promo Verao', days: 20, shift: 'Integral', price: 799, active: false },
];

export function PlansManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Planos e Precos</h3>
          <p className="text-sm text-gray-500">Gerencie os planos oferecidos pela creche</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus size={14} /> Novo Plano
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
                <p className="text-xs text-gray-500">{plan.days} {plan.days > 1 ? 'dias' : 'dia'} — {plan.shift}</p>
              </div>
              <Badge variant={plan.active ? 'success' : 'neutral'} size="sm">
                {plan.active ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-4">
              {formatCurrency(plan.price)}
              <span className="text-sm font-normal text-gray-400">/mes</span>
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1 flex-1">
                <Edit size={12} /> Editar
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
