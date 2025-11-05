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
  ongEmail: string;
  ongName: string;
  donorEmail: string;
  donorName: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  relatedTo?: {
    type: 'campaign' | 'volunteer';
    id: number;
    title: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private conversationsKey = 'somar-conversations';
  private messagesKey = 'somar-messages';

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    const existingConversations = this.getAllConversations();
    if (existingConversations.length === 0) {
      const mockConversations: Conversation[] = [
        {
          id: 1,
          ongEmail: 'ong@somar.com',
          ongName: 'ONG Esperança',
          donorEmail: 'doador@somar.com',
          donorName: 'João Silva',
          lastMessage: 'Obrigado pelo interesse! Podemos combinar a coleta para amanhã?',
          lastMessageTime: new Date('2025-11-02T14:30:00'),
          unreadCount: 1,
          relatedTo: {
            type: 'campaign',
            id: 1,
            title: 'Campanha do Agasalho 2025'
          }
        },
        {
          id: 2,
          ongEmail: 'ong@somar.com',
          ongName: 'ONG Esperança',
          donorEmail: 'maria@teste.com',
          donorName: 'Maria Santos',
          lastMessage: 'Confirmado! Até lá!',
          lastMessageTime: new Date('2025-11-01T10:15:00'),
          unreadCount: 0,
          relatedTo: {
            type: 'volunteer',
            id: 1,
            title: 'Distribuição de Alimentos'
          }
        }
      ];

      const mockMessages: Message[] = [
        {
          id: 1,
          conversationId: 1,
          senderEmail: 'doador@somar.com',
          senderName: 'João Silva',
          content: 'Olá! Tenho interesse em doar 20 cobertores para a campanha do agasalho. Como posso fazer?',
          timestamp: new Date('2025-11-02T10:00:00'),
          read: true
        },
        {
          id: 2,
          conversationId: 1,
          senderEmail: 'ong@somar.com',
          senderName: 'ONG Esperança',
          content: 'Olá João! Que maravilha! Ficamos muito felizes com sua doação. Podemos buscar no seu endereço ou você prefere entregar aqui na ONG?',
          timestamp: new Date('2025-11-02T11:30:00'),
          read: true
        },
        {
          id: 3,
          conversationId: 1,
          senderEmail: 'doador@somar.com',
          senderName: 'João Silva',
          content: 'Prefiro que busquem aqui. Meu endereço é Rua das Flores, 123 - Centro',
          timestamp: new Date('2025-11-02T14:00:00'),
          read: true
        },
        {
          id: 4,
          conversationId: 1,
          senderEmail: 'ong@somar.com',
          senderName: 'ONG Esperança',
          content: 'Obrigado pelo interesse! Podemos combinar a coleta para amanhã?',
          timestamp: new Date('2025-11-02T14:30:00'),
          read: false
        },
        {
          id: 5,
          conversationId: 2,
          senderEmail: 'maria@teste.com',
          senderName: 'Maria Santos',
          content: 'Oi! Me inscrevi para o voluntariado de distribuição de alimentos. Preciso levar algo?',
          timestamp: new Date('2025-11-01T09:00:00'),
          read: true
        },
        {
          id: 6,
          conversationId: 2,
          senderEmail: 'ong@somar.com',
          senderName: 'ONG Esperança',
          content: 'Olá Maria! Não precisa trazer nada, apenas disposição para ajudar. Começamos às 9h, não se atrase! 😊',
          timestamp: new Date('2025-11-01T09:30:00'),
          read: true
        },
        {
          id: 7,
          conversationId: 2,
          senderEmail: 'maria@teste.com',
          senderName: 'Maria Santos',
          content: 'Confirmado! Até lá!',
          timestamp: new Date('2025-11-01T10:15:00'),
          read: true
        }
      ];

      sessionStorage.setItem(this.conversationsKey, JSON.stringify(mockConversations));
      sessionStorage.setItem(this.messagesKey, JSON.stringify(mockMessages));
    }
  }

  // === CONVERSATIONS ===

  getAllConversations(): Conversation[] {
    const conversations = sessionStorage.getItem(this.conversationsKey);
    return conversations ? JSON.parse(conversations) : [];
  }

  getConversationsByUser(userEmail: string): Conversation[] {
    return this.getAllConversations().filter(
      c => c.ongEmail === userEmail || c.donorEmail === userEmail
    );
  }

  getConversationById(id: number): Conversation | undefined {
    return this.getAllConversations().find(c => c.id === id);
  }

  createConversation(conversation: Omit<Conversation, 'id' | 'lastMessage' | 'lastMessageTime' | 'unreadCount'>): Conversation {
    const conversations = this.getAllConversations();
    
    // Verifica se já existe conversa entre esses usuários
    const existing = conversations.find(
      c => (c.ongEmail === conversation.ongEmail && c.donorEmail === conversation.donorEmail) ||
           (c.ongEmail === conversation.donorEmail && c.donorEmail === conversation.ongEmail)
    );

    if (existing) {
      return existing;
    }

    const newId = conversations.length > 0 ? Math.max(...conversations.map(c => c.id)) + 1 : 1;
    
    const newConversation: Conversation = {
      ...conversation,
      id: newId,
      unreadCount: 0
    };

    conversations.push(newConversation);
    sessionStorage.setItem(this.conversationsKey, JSON.stringify(conversations));
    
    return newConversation;
  }

  updateConversation(id: number, updates: Partial<Conversation>): boolean {
    const conversations = this.getAllConversations();
    const index = conversations.findIndex(c => c.id === id);
    
    if (index !== -1) {
      conversations[index] = { ...conversations[index], ...updates };
      sessionStorage.setItem(this.conversationsKey, JSON.stringify(conversations));
      return true;
    }
    
    return false;
  }

  // === MESSAGES ===

  getAllMessages(): Message[] {
    const messages = sessionStorage.getItem(this.messagesKey);
    return messages ? JSON.parse(messages) : [];
  }

  getMessagesByConversation(conversationId: number): Message[] {
    return this.getAllMessages()
      .filter(m => m.conversationId === conversationId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  sendMessage(message: Omit<Message, 'id' | 'timestamp' | 'read'>): Message {
    const messages = this.getAllMessages();
    const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
    
    const newMessage: Message = {
      ...message,
      id: newId,
      timestamp: new Date(),
      read: false
    };

    messages.push(newMessage);
    sessionStorage.setItem(this.messagesKey, JSON.stringify(messages));

    // Atualiza a conversa com a última mensagem
    this.updateConversation(message.conversationId, {
      lastMessage: message.content,
      lastMessageTime: newMessage.timestamp,
      unreadCount: this.getUnreadCount(message.conversationId, message.senderEmail)
    });
    
    return newMessage;
  }

  markAsRead(conversationId: number, userEmail: string): void {
    const messages = this.getAllMessages();
    let updated = false;

    const updatedMessages = messages.map(m => {
      if (m.conversationId === conversationId && m.senderEmail !== userEmail && !m.read) {
        updated = true;
        return { ...m, read: true };
      }
      return m;
    });

    if (updated) {
      sessionStorage.setItem(this.messagesKey, JSON.stringify(updatedMessages));
      
      // Atualiza contador de não lidas na conversa
      this.updateConversation(conversationId, {
        unreadCount: 0
      });
    }
  }

  getUnreadCount(conversationId: number, currentUserEmail: string): number {
    return this.getAllMessages().filter(
      m => m.conversationId === conversationId && 
           m.senderEmail !== currentUserEmail && 
           !m.read
    ).length;
  }

  getTotalUnreadCount(userEmail: string): number {
    const conversations = this.getConversationsByUser(userEmail);
    return conversations.reduce((total, conv) => {
      const unread = this.getUnreadCount(conv.id, userEmail);
      return total + unread;
    }, 0);
  }

  // Busca ou cria conversa entre ONG e doador
  getOrCreateConversation(
    ongEmail: string,
    ongName: string,
    donorEmail: string,
    donorName: string,
    relatedTo?: { type: 'campaign' | 'volunteer'; id: number; title: string }
  ): Conversation {
    const conversations = this.getAllConversations();
    
    const existing = conversations.find(
      c => (c.ongEmail === ongEmail && c.donorEmail === donorEmail) ||
           (c.ongEmail === donorEmail && c.donorEmail === ongEmail)
    );

    if (existing) {
      return existing;
    }

    return this.createConversation({
      ongEmail,
      ongName,
      donorEmail,
      donorName,
      relatedTo
    });
  }
}
