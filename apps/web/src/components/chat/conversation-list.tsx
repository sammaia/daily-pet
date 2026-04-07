'use client';

import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils/cn';
import { formatRelative } from '@/lib/utils/format';

export interface Conversation {
  id: string;
  tutorName: string;
  petName: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  avatar?: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function ConversationList({ conversations, activeId, onSelect }: ConversationListProps) {
  return (
    <div className="divide-y divide-gray-100">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors',
            activeId === conv.id && 'bg-blue-50 hover:bg-blue-50',
          )}
        >
          <Avatar name={conv.tutorName} size="md" statusColor={conv.unreadCount > 0 ? 'green' : undefined} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className={cn('text-sm font-medium truncate', conv.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700')}>
                {conv.tutorName}
              </p>
              <span className="text-[11px] text-gray-400 shrink-0 ml-2">{formatRelative(conv.lastMessageAt)}</span>
            </div>
            <p className="text-xs text-gray-500 truncate">{conv.petName}</p>
            <p className={cn('text-sm truncate mt-0.5', conv.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500')}>
              {conv.lastMessage}
            </p>
          </div>
          {conv.unreadCount > 0 && (
            <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 shrink-0">
              {conv.unreadCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
