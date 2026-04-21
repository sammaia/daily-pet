'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="bg-red-50 rounded-full p-4">
        <AlertTriangle size={32} className="text-red-500" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900">Something went wrong</h2>
      <p className="text-sm text-gray-500 text-center max-w-md">
        An error occurred while loading this page. Please try again or contact support.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
