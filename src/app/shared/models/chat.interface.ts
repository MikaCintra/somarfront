export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderType: 'ong' | 'doador' | 'admin';
  content: string;
  timestamp: Date;
  read: boolean;
  type: 'text' | 'image' | 'file';
  attachmentUrl?: string;
  attachmentName?: string;
}

export interface Conversation {
  id: string;
  participants: ConversationParticipant[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
  createdAt: Date;
  title?: string;
  type: 'direct' | 'group' | 'support';
}

export interface ConversationParticipant {
  userId: string;
  userName: string;
  userType: 'ong' | 'doador' | 'admin';
  avatarUrl?: string;
  online: boolean;
  lastSeen?: Date;
}

export interface ChatFilters {
  unreadOnly?: boolean;
  userType?: 'ong' | 'doador' | 'admin';
  search?: string;
}
