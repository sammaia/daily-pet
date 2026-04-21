import React from 'react';
import { Calendar, Weight, Ruler, Palette, AlertCircle } from 'lucide-react';

interface PetInfoTabProps {
  pet: {
    name: string;
    breed: string;
    birthDate: string;
    gender: string;
    weight: string;
    size: string;
    color: string;
    neutered: boolean;
    allergies: string[];
    observations: string;
    tutorName: string;
    tutorPhone: string;
    tutorEmail: string;
  };
}

export function PetInfoTab({ pet }: PetInfoTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pet details */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h4 className="font-semibold text-gray-800 mb-4">Pet Details</h4>
        <div className="space-y-3">
          {[
            { icon: Calendar, label: 'Birth Date', value: pet.birthDate },
            { icon: Ruler, label: 'Size', value: pet.size },
            { icon: Weight, label: 'Weight', value: pet.weight },
            { icon: Palette, label: 'Color', value: pet.color },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 py-2 border-b border-gray-50">
                <Icon size={15} className="text-gray-400 shrink-0" />
                <span className="text-sm text-gray-500 w-24">{item.label}</span>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            );
          })}
          <div className="flex items-center gap-3 py-2 border-b border-gray-50">
            <span className="w-[15px]" />
            <span className="text-sm text-gray-500 w-24">Gender</span>
            <span className="text-sm font-medium text-gray-900">{pet.gender}</span>
          </div>
          <div className="flex items-center gap-3 py-2">
            <span className="w-[15px]" />
            <span className="text-sm text-gray-500 w-24">Neutered</span>
            <span className="text-sm font-medium text-gray-900">{pet.neutered ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>

      {/* Owner + notes */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h4 className="font-semibold text-gray-800 mb-4">Owner</h4>
          <div className="space-y-2">
            <p className="text-sm"><span className="text-gray-500">Name:</span> <span className="font-medium text-gray-900">{pet.tutorName}</span></p>
            <p className="text-sm"><span className="text-gray-500">Phone:</span> <span className="font-medium text-gray-900">{pet.tutorPhone}</span></p>
            <p className="text-sm"><span className="text-gray-500">Email:</span> <span className="font-medium text-gray-900">{pet.tutorEmail}</span></p>
          </div>
        </div>

        {pet.allergies.length > 0 && (
          <div className="bg-red-50 rounded-xl border border-red-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={16} className="text-red-500" />
              <h4 className="font-semibold text-red-700">Allergies</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {pet.allergies.map((a) => (
                <span key={a} className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">{a}</span>
              ))}
            </div>
          </div>
        )}

        {pet.observations && (
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
            <h4 className="font-semibold text-amber-700 mb-2">Notes</h4>
            <p className="text-sm text-amber-800">{pet.observations}</p>
          </div>
        )}
      </div>
    </div>
  );
}
