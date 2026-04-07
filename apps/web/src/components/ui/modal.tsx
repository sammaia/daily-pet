'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal = React.forwardRef<HTMLDialogElement, ModalProps>(
  ({ open, onClose, title, children, className }, ref) => {
    React.useEffect(() => {
      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      if (open) {
        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
      }
    }, [open, onClose]);

    if (!open) return null;

    return (
      <dialog
        ref={ref}
        className="fixed inset-0 z-50 flex items-center justify-center"
        open={open}
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        <div
          className={cn(
            'relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-auto',
            className,
          )}
        >
          {title && (
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            </div>
          )}
          <div className="px-6 py-4">{children}</div>
        </div>
      </dialog>
    );
  },
);

Modal.displayName = 'Modal';

export { Modal };
