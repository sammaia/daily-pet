'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload } from './image-upload';

export function CrecheForm() {
  const [logo, setLogo] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">Daycare Information</h3>
        <p className="text-sm text-gray-500">Basic details about the establishment</p>
      </div>

      <ImageUpload label="Logo / Photo" value={logo ?? undefined} onChange={setLogo} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Daycare Name" defaultValue="Happy Paws" />
        <Input label="Tax ID" defaultValue="12.345.678/0001-90" />
        <Input label="Phone" defaultValue="(31) 3333-4444" />
        <Input label="WhatsApp" defaultValue="(31) 99999-0000" />
        <Input label="Email" defaultValue="contact@happypaws.com" />
        <Input label="Maximum Capacity" type="number" defaultValue="20" />
      </div>

      <Textarea label="Address" defaultValue="123 Flower Street — Belo Horizonte, MG" />
      <Textarea label="Description" defaultValue="Dog daycare with 10 years of experience, spacious and safe environment for your pet." />

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
