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
    <Modal open={open} onClose={onClose} title={`Boletim — ${petName}`} className="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center gap-3 bg-amber-50 rounded-lg p-3 mb-2">
          <Avatar name={petName} size="sm" />
          <span className="text-sm font-medium text-amber-800">Avaliacao do dia para {petName}</span>
        </div>

        <StarRatingInput label="Alimentacao" value={feeding} onChange={setFeeding} />
        <StarRatingInput label="Comportamento" value={behavior} onChange={setBehavior} />
        <StarRatingInput label="Socializacao" value={socialization} onChange={setSocialization} />
        <StarRatingInput label="Energia / Disposicao" value={energy} onChange={setEnergy} />

        <Textarea
          label="Observacoes do dia"
          placeholder="Como foi o dia do pet? Alguma ocorrencia?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!feeding || !behavior || !socialization || !energy}>
            Salvar Boletim
          </Button>
        </div>
      </form>
    </Modal>
  );
}
