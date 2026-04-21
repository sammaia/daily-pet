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
          <h3 className="font-semibold text-gray-800 mb-1">My Account</h3>
          <p className="text-sm text-gray-500">Personal details and security</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Name" defaultValue="Maria Silva" />
          <Input label="Email" type="email" defaultValue="maria@petcare.com" disabled />
          <Input label="Phone" defaultValue="(31) 99999-0000" />
        </div>
        <div className="flex justify-end">
          <Button>Save</Button>
        </div>
      </div>

      {/* Change password */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-800">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Current Password" type="password" placeholder="Your current password" />
          <div />
          <Input label="New Password" type="password" placeholder="Minimum 8 characters" />
          <Input label="Confirm New Password" type="password" placeholder="Repeat your new password" />
        </div>
        <div className="flex justify-end">
          <Button variant="outline">Change Password</Button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="pt-6 border-t border-gray-200">
        <div className="bg-red-50 rounded-xl border border-red-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-red-500" />
            <h3 className="font-semibold text-red-700">Danger Zone</h3>
          </div>
          <p className="text-sm text-red-600 mb-4">
            These actions are irreversible. Make sure before continuing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="sm" className="!border-red-300 !text-red-600 hover:!bg-red-50">
              Deactivate Daycare
            </Button>
            <Button variant="danger" size="sm">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
