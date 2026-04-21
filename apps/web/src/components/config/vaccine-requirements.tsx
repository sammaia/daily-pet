'use client';

import React, { useState } from 'react';
import { Syringe, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';

interface VaccineReq {
  id: string;
  name: string;
  required: boolean;
}

export function VaccineRequirements() {
  const [vaccines, setVaccines] = useState<VaccineReq[]>([
    { id: '1', name: 'V10 (Polyvalent)', required: true },
    { id: '2', name: 'Rabies', required: true },
    { id: '3', name: 'Giardia', required: true },
    { id: '4', name: 'Kennel Cough', required: false },
    { id: '5', name: 'Leishmaniasis', required: false },
  ]);
  const [newVaccine, setNewVaccine] = useState('');

  function addVaccine() {
    if (!newVaccine.trim()) return;
    setVaccines([...vaccines, { id: String(Date.now()), name: newVaccine.trim(), required: true }]);
    setNewVaccine('');
  }

  function removeVaccine(id: string) {
    setVaccines(vaccines.filter((v) => v.id !== id));
  }

  function toggleRequired(id: string, required: boolean) {
    setVaccines(vaccines.map((v) => (v.id === id ? { ...v, required } : v)));
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">Required Vaccines</h3>
        <p className="text-sm text-gray-500">Configure which vaccines are mandatory to accept pets</p>
      </div>

      <div className="space-y-2">
        {vaccines.map((v) => (
          <div key={v.id} className="flex items-center gap-3 py-3 border-b border-gray-100">
            <Syringe size={16} className="text-gray-400 shrink-0" />
            <span className="flex-1 text-sm text-gray-800">{v.name}</span>
            <Toggle
              checked={v.required}
              onChange={(checked) => toggleRequired(v.id, checked)}
              label={v.required ? 'Required' : 'Optional'}
            />
            <button
              onClick={() => removeVaccine(v.id)}
              className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={newVaccine}
          onChange={(e) => setNewVaccine(e.target.value)}
          placeholder="Vaccine name"
          onKeyDown={(e) => e.key === 'Enter' && addVaccine()}
        />
        <Button variant="outline" onClick={addVaccine} className="gap-1.5 shrink-0">
          <Plus size={14} /> Add
        </Button>
      </div>
    </div>
  );
}
