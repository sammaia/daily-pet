'use client';

import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { Plus, Mail, MoreVertical } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'caregiver';
  status: 'active' | 'pending';
}

const roleLabels: Record<string, { label: string; variant: 'info' | 'amber' | 'success' }> = {
  owner: { label: 'Owner', variant: 'amber' },
  admin: { label: 'Administrator', variant: 'info' },
  caregiver: { label: 'Caregiver', variant: 'success' },
};

const mockTeam: TeamMember[] = [
  { id: '1', name: 'Maria Silva', email: 'maria@petcare.com', role: 'owner', status: 'active' },
  { id: '2', name: 'Paula Mendes', email: 'paula@petcare.com', role: 'admin', status: 'active' },
  { id: '3', name: 'Ricardo Santos', email: 'ricardo@petcare.com', role: 'caregiver', status: 'active' },
  { id: '4', name: 'Camila Rocha', email: 'camila@petcare.com', role: 'caregiver', status: 'active' },
  { id: '5', name: 'Bruno Lima', email: 'bruno@petcare.com', role: 'caregiver', status: 'pending' },
];

export function TeamManagement() {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Team</h3>
          <p className="text-sm text-gray-500">Manage members and permissions</p>
        </div>
        <Button size="sm" onClick={() => setShowInvite(true)} className="gap-1.5">
          <Plus size={14} /> Invite
        </Button>
      </div>

      <div className="space-y-2">
        {mockTeam.map((member) => {
          const roleCfg = roleLabels[member.role];
          return (
            <div key={member.id} className="flex items-center gap-3 py-3 border-b border-gray-100">
              <Avatar name={member.name} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  {member.status === 'pending' && <Badge variant="warning" size="sm">Pending</Badge>}
                </div>
                <p className="text-xs text-gray-500">{member.email}</p>
              </div>
              <Badge variant={roleCfg.variant} size="sm">{roleCfg.label}</Badge>
              {member.role !== 'owner' && (
                <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <MoreVertical size={14} className="text-gray-400" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Invite modal */}
      <Modal open={showInvite} onClose={() => setShowInvite(false)} title="Invite Member">
        <div className="space-y-4">
          <Input label="Email" type="email" placeholder="email@example.com" />
          <Select
            label="Role"
            options={[
              { value: 'admin', label: 'Administrator' },
              { value: 'caregiver', label: 'Caregiver' },
            ]}
            placeholder="Select a role"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowInvite(false)}>Cancel</Button>
            <Button className="gap-1.5"><Mail size={14} /> Send Invite</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
