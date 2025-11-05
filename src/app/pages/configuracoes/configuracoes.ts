import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../features/auth/services/auth.service';
import { ThemeLanguageToggle } from '../../shared/components/theme-language-toggle/theme-language-toggle';

interface UserSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  campaignUpdates: boolean;
  volunteerReminders: boolean;
  donationReceipts: boolean;
  monthlyReports: boolean;
  profileVisibility: 'public' | 'private' | 'ongs-only';
  showEmail: boolean;
  showPhone: boolean;
  allowMessages: boolean;
}

@Component({
  selector: 'app-configuracoes',
  imports: [CommonModule, FormsModule, ThemeLanguageToggle],
  templateUrl: './configuracoes.html',
  styleUrl: './configuracoes.scss'
})
export class Configuracoes implements OnInit {
  title = 'Configurações';
  
  // Informações do usuário
  userType: string = '';
  userEmail: string = '';
  userName: string = '';
  userPhone: string = '';
  userAddress: string = '';
  userBio: string = '';

  // Alteração de senha
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  // Configurações
  settings: UserSettings = {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    campaignUpdates: true,
    volunteerReminders: true,
    donationReceipts: true,
    monthlyReports: false,
    profileVisibility: 'ongs-only',
    showEmail: false,
    showPhone: false,
    allowMessages: true
  };

  // Controle de abas
  activeTab: 'profile' | 'security' | 'notifications' | 'privacy' = 'profile';

  // Mensagens de feedback
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.loadSettings();
  }

  loadUserData() {
    this.userType = sessionStorage.getItem('user-type') || '';
    this.userEmail = sessionStorage.getItem('user-email') || '';
    this.userName = sessionStorage.getItem('username') || '';
    
    // Carregar dados adicionais do sessionStorage se existirem
    const savedPhone = sessionStorage.getItem('user-phone');
    const savedAddress = sessionStorage.getItem('user-address');
    const savedBio = sessionStorage.getItem('user-bio');
    
    if (savedPhone) this.userPhone = savedPhone;
    if (savedAddress) this.userAddress = savedAddress;
    if (savedBio) this.userBio = savedBio;
  }

  loadSettings() {
    const savedSettings = sessionStorage.getItem('user-settings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    }
  }

  setActiveTab(tab: 'profile' | 'security' | 'notifications' | 'privacy') {
    this.activeTab = tab;
    this.clearMessages();
  }

  // Perfil
  saveProfile() {
    this.clearMessages();
    
    if (!this.userName.trim()) {
      this.errorMessage = 'Nome é obrigatório';
      return;
    }

    // Salvar no sessionStorage
    sessionStorage.setItem('username', this.userName);
    sessionStorage.setItem('user-phone', this.userPhone);
    sessionStorage.setItem('user-address', this.userAddress);
    sessionStorage.setItem('user-bio', this.userBio);

    this.successMessage = 'Perfil atualizado com sucesso!';
    setTimeout(() => this.clearMessages(), 3000);
  }

  // Segurança
  changePassword() {
    this.clearMessages();

    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Preencha todos os campos';
      return;
    }

    if (this.newPassword.length < 6) {
      this.errorMessage = 'A nova senha deve ter no mínimo 6 caracteres';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'As senhas não conferem';
      return;
    }

    // Simular validação de senha atual (em produção seria feito no backend)
    // Por simplicidade, vamos aceitar qualquer senha atual em modo mock
    
    // Atualizar senha (em produção, isso seria feito no backend)
    this.successMessage = 'Senha alterada com sucesso!';
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    setTimeout(() => this.clearMessages(), 3000);
  }

  // Notificações
  saveNotifications() {
    this.clearMessages();
    sessionStorage.setItem('user-settings', JSON.stringify(this.settings));
    this.successMessage = 'Preferências de notificação atualizadas!';
    setTimeout(() => this.clearMessages(), 3000);
  }

  // Privacidade
  savePrivacy() {
    this.clearMessages();
    sessionStorage.setItem('user-settings', JSON.stringify(this.settings));
    this.successMessage = 'Configurações de privacidade atualizadas!';
    setTimeout(() => this.clearMessages(), 3000);
  }

  deleteAccount() {
    const confirmed = confirm(
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.'
    );

    if (confirmed) {
      // Limpar dados do usuário
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  getUserTypeLabel(): string {
    switch(this.userType) {
      case 'ong': return 'ONG';
      case 'doador': return 'Doador';
      case 'admin': return 'Administrador';
      default: return 'Usuário';
    }
  }
}

