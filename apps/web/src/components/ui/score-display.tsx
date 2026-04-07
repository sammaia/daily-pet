import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ScoreDisplayProps {
  score: number;
  maxScore?: number;
  variant?: 'stars' | 'dots' | 'bar';
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

const scoreColors = ['', 'text-red-500', 'text-orange-500', 'text-yellow-500', 'text-emerald-500', 'text-emerald-600'];
const dotBgColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500', 'bg-emerald-600'];
const barColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500', 'bg-emerald-600'];

export function ScoreDisplay({
  score,
  maxScore = 5,
  variant = 'stars',
  size = 'sm',
  showLabel = false,
  className,
}: ScoreDisplayProps) {
  const rounded = Math.round(score);
  const starSize = size === 'sm' ? 14 : 18;

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        {Array.from({ length: maxScore }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'rounded-full',
              size === 'sm' ? 'h-2 w-2' : 'h-2.5 w-2.5',
              i < rounded ? dotBgColors[rounded] : 'bg-gray-200',
            )}
          />
        ))}
        {showLabel && <span className="ml-1 text-xs text-gray-500">{score.toFixed(1)}</span>}
      </div>
    );
  }

  if (variant === 'bar') {
    const pct = (score / maxScore) * 100;
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className={cn('flex-1 rounded-full bg-gray-200', size === 'sm' ? 'h-1.5' : 'h-2')}>
          <div
            className={cn('h-full rounded-full transition-all', barColors[rounded])}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-600">{score.toFixed(1)}</span>
      </div>
    );
  }

  // Stars (default)
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: maxScore }).map((_, i) => (
        <Star
          key={i}
          size={starSize}
          className={cn(
            i < rounded ? scoreColors[rounded] : 'text-gray-200',
          )}
          fill={i < rounded ? 'currentColor' : 'none'}
        />
      ))}
      {showLabel && <span className="ml-1 text-xs text-gray-500">{score.toFixed(1)}</span>}
    </div>
  );
}
