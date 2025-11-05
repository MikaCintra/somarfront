import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, Conversation, Message } from '../../services/chat.service';
import { ThemeLanguageToggle } from '../../../../shared/components/theme-language-toggle/theme-language-toggle';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, ThemeLanguageToggle],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class Chat implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  messages: Message[] = [];
  newMessage: string = '';
  
  currentUserEmail: string = '';
  currentUserName: string = '';
  private shouldScrollToBottom = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.currentUserEmail = sessionStorage.getItem('user-email') || '';
    this.currentUserName = sessionStorage.getItem('username') || '';
    this.loadConversations();
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  loadConversations() {
    this.conversations = this.chatService.getUserConversations(this.currentUserEmail);
  }

  selectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
    this.messages = this.chatService.getConversationMessages(conversation.id);
    this.chatService.markMessagesAsRead(conversation.id, this.currentUserEmail);
    this.shouldScrollToBottom = true;
    this.loadConversations(); // Atualizar contadores
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedConversation) return;

    this.chatService.sendMessage(
      this.selectedConversation.id,
      this.currentUserEmail,
      this.currentUserName,
      this.newMessage.trim()
    );

    this.newMessage = '';
    this.messages = this.chatService.getConversationMessages(this.selectedConversation.id);
    this.shouldScrollToBottom = true;
    this.loadConversations();
  }

  getOtherParticipantName(conversation: Conversation): string {
    const otherEmail = conversation.participants.find(p => p !== this.currentUserEmail);
    if (!otherEmail) return 'Desconhecido';
    return conversation.participantNames.get(otherEmail) || otherEmail;
  }

  getInitial(name: string): string {
    return name.charAt(0).toUpperCase();
  }

  formatTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    
    return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  }

  formatMessageTime(date: Date): string {
    return new Date(date).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  isMyMessage(message: Message): boolean {
    return message.senderEmail === this.currentUserEmail;
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = 
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch(err) { }
  }
}
