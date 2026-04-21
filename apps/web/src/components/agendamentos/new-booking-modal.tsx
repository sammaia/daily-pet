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
  petId: z.string().min(1, 'Select a pet'),
  date: z.string().min(1, 'Select a date'),
  shift: z.string().min(1, 'Select a shift'),
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
    <Modal open={open} onClose={onClose} title="New Booking" className="max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          label="Pet"
          options={mockPets}
          placeholder="Select the pet"
          error={errors.petId?.message}
          {...register('petId')}
        />
        <Input
          label="Date"
          type="date"
          error={errors.date?.message}
          {...register('date')}
        />
        <Select
          label="Shift"
          options={[
            { value: 'morning', label: 'Morning (07:00 - 12:00)' },
            { value: 'afternoon', label: 'Afternoon (13:00 - 18:00)' },
            { value: 'full_day', label: 'Full Day (07:00 - 18:00)' },
          ]}
          placeholder="Select the shift"
          error={errors.shift?.message}
          {...register('shift')}
        />
        <Textarea
          label="Notes"
          placeholder="Anything we should know about the pet on this day?"
          {...register('notes')}
        />
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create Booking</Button>
        </div>
      </form>
    </Modal>
  );
}
