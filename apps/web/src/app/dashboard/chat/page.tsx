'use client';

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { SearchInput } from '@/components/ui/search-input';
import { ConversationList, type Conversation } from '@/components/chat/conversation-list';
import { MessageThread } from '@/components/chat/message-thread';
import { MessageInput } from '@/components/chat/message-input';
import { Avatar } from '@/components/ui/avatar';
import { useRealtimeMessages } from '@/hooks/use-realtime-messages';

const mockConversations: Conversation[] = [
  { id: '1', tutorName: 'Joao Silva', petName: 'Thor', lastMessage: 'Otimo! Vamos espera-lo. Ate amanha!', lastMessageAt: '2026-02-23T09:10:00', unreadCount: 0 },
  { id: '2', tutorName: 'Ana Costa', petName: 'Luna', lastMessage: 'Sem problemas Ana! Ja cancelo a reserva de sexta.', lastMessageAt: '2026-02-22T14:15:00', unreadCount: 0 },
  { id: '3', tutorName: 'Pedro Santos', petName: 'Bob', lastMessage: 'Sim por favor!', lastMessageAt: '2026-02-21T15:12:00', unreadCount: 1 },
  { id: '4', tutorName: 'Carla Lima', petName: 'Mel', lastMessage: 'Quando posso levar a Mel pra avaliacao?', lastMessageAt: '2026-02-20T10:00:00', unreadCount: 1 },
  { id: '5', tutorName: 'Lucas Rocha', petName: 'Rex', lastMessage: 'O Rex adorou o dia de hoje!', lastMessageAt: '2026-02-19T18:00:00', unreadCount: 0 },
];

export default function ChatPage() {
  const [search, setSearch] = useState('');
  const [activeConvId, setActiveConvId] = useState<string | null>(null);

  const { messages, sendMessage } = useRealtimeMessages(activeConvId);
  const activeConv = mockConversations.find((c) => c.id === activeConvId);

  const filtered = mockConversations.filter(
    (c) => c.tutorName.toLowerCase().includes(search.toLowerCase()) || c.petName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Left — conversations */}
      <div className="w-80 border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-3 border-b border-gray-100">
          <SearchInput value={search} onChange={setSearch} placeholder="Buscar conversa..." />
        </div>
        <div className="flex-1 overflow-y-auto">
          <ConversationList
            conversations={filtered}
            activeId={activeConvId}
            onSelect={setActiveConvId}
          />
        </div>
      </div>

      {/* Right — messages */}
      <div className="flex-1 flex flex-col">
        {activeConv ? (
          <>
            {/* Chat header */}
            <div className="px-5 py-3 border-b border-gray-200 flex items-center gap-3">
              <Avatar name={activeConv.tutorName} size="sm" statusColor="green" />
              <div>
                <p className="text-sm font-semibold text-gray-900">{activeConv.tutorName}</p>
                <p className="text-xs text-gray-500">{activeConv.petName}</p>
              </div>
            </div>

            {/* Messages */}
            <MessageThread messages={messages} emptyText="Nenhuma mensagem ainda" />

            {/* Input */}
            <MessageInput onSend={sendMessage} />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <MessageSquare size={48} className="mb-3 text-gray-200" />
            <p className="text-sm">Selecione uma conversa para comecar</p>
          </div>
        )}
      </div>
    </div>
  );
}
