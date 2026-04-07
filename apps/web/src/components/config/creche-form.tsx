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
        <h3 className="font-semibold text-gray-800 mb-1">Dados da Creche</h3>
        <p className="text-sm text-gray-500">Informacoes basicas do estabelecimento</p>
      </div>

      <ImageUpload label="Logo / Foto" value={logo ?? undefined} onChange={setLogo} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Nome da Creche" defaultValue="Patinhas Felizes" />
        <Input label="CNPJ" defaultValue="12.345.678/0001-90" />
        <Input label="Telefone" defaultValue="(31) 3333-4444" />
        <Input label="WhatsApp" defaultValue="(31) 99999-0000" />
        <Input label="Email" defaultValue="contato@patinhasfelizes.com" />
        <Input label="Capacidade Maxima" type="number" defaultValue="20" />
      </div>

      <Textarea label="Endereco" defaultValue="Rua das Flores, 123 — Belo Horizonte, MG" />
      <Textarea label="Descricao" defaultValue="Creche canina com 10 anos de experiencia, ambiente amplo e seguro para seu pet." />

      <div className="flex justify-end">
        <Button>Salvar Alteracoes</Button>
      </div>
    </div>
  );
}
