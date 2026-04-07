'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export function AccountSettings() {
  return (
    <div className="space-y-8">
      {/* Personal info */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Minha Conta</h3>
          <p className="text-sm text-gray-500">Dados pessoais e seguranca</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nome" defaultValue="Maria Silva" />
          <Input label="Email" type="email" defaultValue="maria@petcare.com" disabled />
          <Input label="Telefone" defaultValue="(31) 99999-0000" />
        </div>
        <div className="flex justify-end">
          <Button>Salvar</Button>
        </div>
      </div>

      {/* Change password */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-800">Alterar Senha</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Senha Atual" type="password" placeholder="Sua senha atual" />
          <div />
          <Input label="Nova Senha" type="password" placeholder="Minimo 8 caracteres" />
          <Input label="Confirmar Nova Senha" type="password" placeholder="Repita a nova senha" />
        </div>
        <div className="flex justify-end">
          <Button variant="outline">Alterar Senha</Button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="pt-6 border-t border-gray-200">
        <div className="bg-red-50 rounded-xl border border-red-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-red-500" />
            <h3 className="font-semibold text-red-700">Zona de Perigo</h3>
          </div>
          <p className="text-sm text-red-600 mb-4">
            Essas acoes sao irreversiveis. Tenha certeza antes de continuar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="sm" className="!border-red-300 !text-red-600 hover:!bg-red-50">
              Desativar Creche
            </Button>
            <Button variant="danger" size="sm">
              Excluir Conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
