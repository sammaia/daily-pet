'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const bookingSchema = z.object({
  petId: z.string().min(1, 'Selecione um pet'),
  date: z.string().min(1, 'Selecione uma data'),
  shift: z.string().min(1, 'Selecione um turno'),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface NewBookingModalProps {
  open: boolean;
  onClose: () => void;
}

const mockPets = [
  { value: '1', label: 'Thor — Joao Silva' },
  { value: '2', label: 'Luna — Ana Costa' },
  { value: '3', label: 'Bob — Pedro Santos' },
  { value: '4', label: 'Mel — Carla Lima' },
  { value: '5', label: 'Rex — Lucas Rocha' },
];

export function NewBookingModal({ open, onClose }: NewBookingModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  function onSubmit(data: BookingFormData) {
    console.log('New booking:', data);
    reset();
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Novo Agendamento" className="max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          label="Pet"
          options={mockPets}
          placeholder="Selecione o pet"
          error={errors.petId?.message}
          {...register('petId')}
        />
        <Input
          label="Data"
          type="date"
          error={errors.date?.message}
          {...register('date')}
        />
        <Select
          label="Turno"
          options={[
            { value: 'morning', label: 'Manha (07:00 - 12:00)' },
            { value: 'afternoon', label: 'Tarde (13:00 - 18:00)' },
            { value: 'full_day', label: 'Integral (07:00 - 18:00)' },
          ]}
          placeholder="Selecione o turno"
          error={errors.shift?.message}
          {...register('shift')}
        />
        <Textarea
          label="Observacoes"
          placeholder="Algo que devemos saber sobre o pet neste dia?"
          {...register('notes')}
        />
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Criar Agendamento</Button>
        </div>
      </form>
    </Modal>
  );
}
