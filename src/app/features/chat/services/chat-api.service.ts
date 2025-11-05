import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[]; // emails dos participantes
  participantNames: string[];
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  relatedTo?: string; // ID da campanha ou oportunidade relacionada
  relatedType?: 'campaign' | 'volunteer';
  relatedTitle?: string;
}

/**
 * Serviço HTTP para gerenciar chat/mensagens via API
 * Será integrado com WebSocket para mensagens em tempo real
 */
@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  constructor(private apiService: ApiService) {}

  /**
   * Buscar conversas do usuário
   */
  getUserConversations(userEmail: string): Observable<Conversation[]> {
    return this.apiService.get<Conversation[]>(`chat/conversations/user/${userEmail}`);
  }

  /**
   * Buscar mensagens de uma conversa
   */
  getConversationMessages(conversationId: string): Observable<Message[]> {
    return this.apiService.get<Message[]>(`chat/conversations/${conversationId}/messages`);
  }

  /**
   * Enviar mensagem
   */
  sendMessage(message: Partial<Message>): Observable<Message> {
    return this.apiService.post<Message>('chat/messages', message);
  }

  /**
   * Marcar mensagens como lidas
   */
  markAsRead(conversationId: string, userEmail: string): Observable<void> {
    return this.apiService.patch<void>(
      `chat/conversations/${conversationId}/read`,
      { userEmail }
    );
  }

  /**
   * Criar nova conversa
   */
  createConversation(conversation: Partial<Conversation>): Observable<Conversation> {
    return this.apiService.post<Conversation>('chat/conversations', conversation);
  }

  /**
   * Buscar ou criar conversa entre dois usuários
   */
  getOrCreateConversation(user1: string, user2: string, relatedTo?: string, relatedType?: 'campaign' | 'volunteer'): Observable<Conversation> {
    return this.apiService.post<Conversation>('chat/conversations/find-or-create', {
      participants: [user1, user2],
      relatedTo,
      relatedType
    });
  }

  /**
   * Deletar conversa
   */
  deleteConversation(conversationId: string): Observable<void> {
    return this.apiService.delete<void>(`chat/conversations/${conversationId}`);
  }

  /**
   * Buscar contagem de mensagens não lidas
   */
  getUnreadCount(userEmail: string): Observable<{ count: number }> {
    return this.apiService.get<{ count: number }>(`chat/unread-count/${userEmail}`);
  }
}
