import { Injectable } from '@angular/core';

export interface Message {
  id: number;
  conversationId: number;
  senderEmail: string;
  senderName: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: number;
  participants: string[]; // emails dos participantes
  participantNames: Map<string, string>;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private conversationsKey = 'somar-conversations';
  private messagesKey = 'somar-messages';

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    const existing = this.getAllConversations();
    if (existing.length === 0) {
      // Criar conversa mock entre doador e ONG
      const mockConversation: Conversation = {
        id: 1,
        participants: ['doador@somar.com', 'ong@somar.com'],
        participantNames: new Map([
          ['doador@somar.com', 'Doador Teste'],
          ['ong@somar.com', 'ONG Esperança']
        ]),
        unreadCount: 0,
        createdAt: new Date('2024-11-01')
      };

      const mockMessages: Message[] = [
        {
          id: 1,
          conversationId: 1,
          senderEmail: 'ong@somar.com',
          senderName: 'ONG Esperança',
          content: 'Olá! Obrigado pelo interesse em nossa campanha do agasalho.',
          timestamp: new Date('2024-11-01T10:00:00'),
          read: true
        },
        {
          id: 2,
          conversationId: 1,
          senderEmail: 'doador@somar.com',
          senderName: 'Doador Teste',
          content: 'Olá! Gostaria de saber como posso fazer a doação de roupas.',
          timestamp: new Date('2024-11-01T10:15:00'),
          read: true
        },
        {
          id: 3,
          conversationId: 1,
          senderEmail: 'ong@somar.com',
          senderName: 'ONG Esperança',
          content: 'Você pode agendar a entrega pelo nosso sistema ou entregar pessoalmente em nossa sede.',
          timestamp: new Date('2024-11-01T10:30:00'),
          read: true
        }
      ];

      sessionStorage.setItem(this.conversationsKey, JSON.stringify([mockConversation]));
      sessionStorage.setItem(this.messagesKey, JSON.stringify(mockMessages));
    }
  }

  // Conversações
  getAllConversations(): Conversation[] {
    const data = sessionStorage.getItem(this.conversationsKey);
    if (!data) return [];
    const conversations = JSON.parse(data);
    return conversations.map((c: any) => ({
      ...c,
      participantNames: new Map(Object.entries(c.participantNames || {})),
      createdAt: new Date(c.createdAt),
      lastMessage: c.lastMessage ? {
        ...c.lastMessage,
        timestamp: new Date(c.lastMessage.timestamp)
      } : undefined
    }));
  }

  getUserConversations(userEmail: string): Conversation[] {
    // Admin tem acesso a todas as conversas
    const allConversations = this.getAllConversations();
    const filtered = userEmail === 'admin@somar.com' 
      ? allConversations 
      : allConversations.filter(c => c.participants.includes(userEmail));
    
    return filtered
      .map(c => {
        // Atualizar lastMessage
        const messages = this.getConversationMessages(c.id);
        if (messages.length > 0) {
          c.lastMessage = messages[messages.length - 1];
        }
        // Contar mensagens não lidas (admin não conta como não lida)
        c.unreadCount = userEmail === 'admin@somar.com' 
          ? 0 
          : messages.filter(m => !m.read && m.senderEmail !== userEmail).length;
        return c;
      })
      .sort((a, b) => {
        const timeA = a.lastMessage?.timestamp.getTime() || a.createdAt.getTime();
        const timeB = b.lastMessage?.timestamp.getTime() || b.createdAt.getTime();
        return timeB - timeA;
      });
  }

  getConversationById(id: number): Conversation | undefined {
    return this.getAllConversations().find(c => c.id === id);
  }

  createConversation(participants: string[], participantNames: Map<string, string>): Conversation {
    const conversations = this.getAllConversations();
    const newConversation: Conversation = {
      id: Date.now(),
      participants,
      participantNames,
      unreadCount: 0,
      createdAt: new Date()
    };
    conversations.push(newConversation);
    this.saveConversations(conversations);
    return newConversation;
  }

  private saveConversations(conversations: Conversation[]) {
    const toSave = conversations.map(c => ({
      ...c,
      participantNames: Object.fromEntries(c.participantNames)
    }));
    sessionStorage.setItem(this.conversationsKey, JSON.stringify(toSave));
  }

  // Mensagens
  getAllMessages(): Message[] {
    const data = sessionStorage.getItem(this.messagesKey);
    if (!data) return [];
    return JSON.parse(data).map((m: any) => ({
      ...m,
      timestamp: new Date(m.timestamp)
    }));
  }

  getConversationMessages(conversationId: number): Message[] {
    return this.getAllMessages()
      .filter(m => m.conversationId === conversationId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  sendMessage(conversationId: number, senderEmail: string, senderName: string, content: string): Message {
    const messages = this.getAllMessages();
    const newMessage: Message = {
      id: Date.now(),
      conversationId,
      senderEmail,
      senderName,
      content,
      timestamp: new Date(),
      read: false
    };
    messages.push(newMessage);
    sessionStorage.setItem(this.messagesKey, JSON.stringify(messages));
    return newMessage;
  }

  markMessagesAsRead(conversationId: number, userEmail: string) {
    const messages = this.getAllMessages();
    messages.forEach(m => {
      if (m.conversationId === conversationId && m.senderEmail !== userEmail) {
        m.read = true;
      }
    });
    sessionStorage.setItem(this.messagesKey, JSON.stringify(messages));
  }

  getTotalUnreadCount(userEmail: string): number {
    return this.getUserConversations(userEmail)
      .reduce((sum, c) => sum + c.unreadCount, 0);
  }
}
