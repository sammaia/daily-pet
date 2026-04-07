'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string | null) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, label, className }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    // Mock — in production would upload to Supabase Storage
    const url = URL.createObjectURL(file);
    onChange(url);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      {value ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200">
          <img src={value} alt="Upload" className="w-full h-full object-cover" />
          <button
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white shadow-sm"
          >
            <X size={14} className="text-gray-600" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors',
            dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400',
          )}
        >
          <Upload size={24} className="mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600">Clique ou arraste uma imagem</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG ate 5MB</p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  );
}
