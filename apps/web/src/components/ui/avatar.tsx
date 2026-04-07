import React from 'react';
import { cn } from '@/lib/utils/cn';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  statusColor?: 'green' | 'yellow' | 'red' | 'gray';
}

const sizeStyles = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const statusDotSizes = {
  xs: 'h-1.5 w-1.5 -right-0 -bottom-0',
  sm: 'h-2 w-2 -right-0 -bottom-0',
  md: 'h-2.5 w-2.5 -right-0.5 -bottom-0.5',
  lg: 'h-3 w-3 -right-0.5 -bottom-0.5',
  xl: 'h-3.5 w-3.5 -right-0.5 -bottom-0.5',
};

const statusColors = {
  green: 'bg-emerald-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  gray: 'bg-gray-400',
};

const bgColors = [
  'bg-amber-200 text-amber-800',
  'bg-blue-200 text-blue-800',
  'bg-emerald-200 text-emerald-800',
  'bg-purple-200 text-purple-800',
  'bg-rose-200 text-rose-800',
  'bg-orange-200 text-orange-800',
  'bg-teal-200 text-teal-800',
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return bgColors[Math.abs(hash) % bgColors.length];
}

export function Avatar({ src, alt, name, size = 'md', statusColor, className, ...props }: AvatarProps) {
  return (
    <div className={cn('relative inline-flex shrink-0', className)} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={cn('rounded-full object-cover', sizeStyles[size])}
        />
      ) : (
        <div
          className={cn(
            'rounded-full flex items-center justify-center font-semibold',
            sizeStyles[size],
            name ? getColorFromName(name) : 'bg-gray-200 text-gray-600',
          )}
        >
          {name ? getInitials(name) : '?'}
        </div>
      )}
      {statusColor && (
        <span
          className={cn(
            'absolute rounded-full ring-2 ring-white',
            statusDotSizes[size],
            statusColors[statusColor],
          )}
        />
      )}
    </div>
  );
}
