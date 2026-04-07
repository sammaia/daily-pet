'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  isOwn: boolean;
}

// Mock hook — will be replaced with Supabase Realtime
export function useRealtimeMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    // Mock messages per conversation
    const mockMessages: Record<string, Message[]> = {
      '1': [
        { id: '1', conversationId: '1', senderId: 'tutor-1', senderName: 'Joao Silva', content: 'Oi, tudo bem? O Thor pode ir amanha?', createdAt: '2026-02-23T09:00:00', isOwn: false },
        { id: '2', conversationId: '1', senderId: 'admin', senderName: 'Maria', content: 'Oi Joao! Sim, temos vaga. Pode trazer ele no horario normal.', createdAt: '2026-02-23T09:05:00', isOwn: true },
        { id: '3', conversationId: '1', senderId: 'tutor-1', senderName: 'Joao Silva', content: 'Perfeito! Ele tomou banho ontem entao ta cheirosinho 😄', createdAt: '2026-02-23T09:08:00', isOwn: false },
        { id: '4', conversationId: '1', senderId: 'admin', senderName: 'Maria', content: 'Otimo! Vamos espera-lo. Ate amanha!', createdAt: '2026-02-23T09:10:00', isOwn: true },
      ],
      '2': [
        { id: '5', conversationId: '2', senderId: 'tutor-2', senderName: 'Ana Costa', content: 'A Luna tem uma consulta veterinaria na sexta, ela nao vai poder ir', createdAt: '2026-02-22T14:00:00', isOwn: false },
        { id: '6', conversationId: '2', senderId: 'admin', senderName: 'Maria', content: 'Sem problemas Ana! Ja cancelo a reserva de sexta. Melhoras pra Luna!', createdAt: '2026-02-22T14:15:00', isOwn: true },
      ],
      '3': [
        { id: '7', conversationId: '3', senderId: 'tutor-3', senderName: 'Pedro Santos', content: 'Boa tarde! Quanto custa o plano integral?', createdAt: '2026-02-21T15:00:00', isOwn: false },
        { id: '8', conversationId: '3', senderId: 'admin', senderName: 'Maria', content: 'Boa tarde Pedro! O plano integral 20 dias e R$ 899/mes. Quer que eu envie os detalhes?', createdAt: '2026-02-21T15:10:00', isOwn: true },
        { id: '9', conversationId: '3', senderId: 'tutor-3', senderName: 'Pedro Santos', content: 'Sim por favor!', createdAt: '2026-02-21T15:12:00', isOwn: false },
      ],
    };

    setMessages(mockMessages[conversationId] || []);
  }, [conversationId]);

  const sendMessage = useCallback((content: string) => {
    if (!conversationId) return;
    const newMsg: Message = {
      id: String(Date.now()),
      conversationId,
      senderId: 'admin',
      senderName: 'Maria',
      content,
      createdAt: new Date().toISOString(),
      isOwn: true,
    };
    setMessages((prev) => [...prev, newMsg]);
  }, [conversationId]);

  return { messages, sendMessage };
}
