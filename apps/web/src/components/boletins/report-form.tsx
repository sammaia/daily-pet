'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { StarRatingInput } from './star-rating-input';

interface ReportFormProps {
  open: boolean;
  onClose: () => void;
  petName?: string;
}

export function ReportForm({ open, onClose, petName = 'Pet' }: ReportFormProps) {
  const [feeding, setFeeding] = useState(0);
  const [behavior, setBehavior] = useState(0);
  const [socialization, setSocialization] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [notes, setNotes] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Report:', { feeding, behavior, socialization, energy, notes });
    setFeeding(0);
    setBehavior(0);
    setSocialization(0);
    setEnergy(0);
    setNotes('');
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={`Report Card — ${petName}`} className="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center gap-3 bg-amber-50 rounded-lg p-3 mb-2">
          <Avatar name={petName} size="sm" />
          <span className="text-sm font-medium text-amber-800">Daily evaluation for {petName}</span>
        </div>

        <StarRatingInput label="Feeding" value={feeding} onChange={setFeeding} />
        <StarRatingInput label="Behavior" value={behavior} onChange={setBehavior} />
        <StarRatingInput label="Socialization" value={socialization} onChange={setSocialization} />
        <StarRatingInput label="Energy / Mood" value={energy} onChange={setEnergy} />

        <Textarea
          label="Daily Notes"
          placeholder="How was the pet's day? Any incidents?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!feeding || !behavior || !socialization || !energy}>
            Save Report Card
          </Button>
        </div>
      </form>
    </Modal>
  );
}
