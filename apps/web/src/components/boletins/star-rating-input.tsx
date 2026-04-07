'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { scoreLabels } from '@/lib/utils/status';

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  className?: string;
}

export function StarRatingInput({ value, onChange, label, className }: StarRatingInputProps) {
  const [hover, setHover] = React.useState(0);
  const active = hover || value;

  return (
    <div className={cn('space-y-1', className)}>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const starValue = i + 1;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
              className="p-0.5 transition-transform hover:scale-110"
            >
              <Star
                size={24}
                className={cn(
                  'transition-colors',
                  starValue <= active ? 'text-amber-400' : 'text-gray-200',
                )}
                fill={starValue <= active ? 'currentColor' : 'none'}
              />
            </button>
          );
        })}
        {active > 0 && (
          <span className="ml-2 text-sm text-gray-500">{scoreLabels[active]}</span>
        )}
      </div>
    </div>
  );
}
