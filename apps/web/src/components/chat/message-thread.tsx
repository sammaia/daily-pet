'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { formatTime } from '@/lib/utils/format';
import type { Message } from '@/hooks/use-realtime-messages';

interface MessageThreadProps {
  messages: Message[];
  emptyText?: string;
}

export function MessageThread({ messages, emptyText = 'Selecione uma conversa' }: MessageThreadProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={cn('flex', msg.isOwn ? 'justify-end' : 'justify-start')}
        >
          <div
            className={cn(
              'max-w-[75%] rounded-2xl px-4 py-2.5',
              msg.isOwn
                ? 'bg-blue-600 text-white rounded-br-md'
                : 'bg-gray-100 text-gray-900 rounded-bl-md',
            )}
          >
            {!msg.isOwn && (
              <p className="text-xs font-medium text-gray-500 mb-0.5">{msg.senderName}</p>
            )}
            <p className="text-sm leading-relaxed">{msg.content}</p>
            <p
              className={cn(
                'text-[10px] mt-1',
                msg.isOwn ? 'text-blue-200' : 'text-gray-400',
              )}
            >
              {formatTime(msg.createdAt)}
            </p>
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
