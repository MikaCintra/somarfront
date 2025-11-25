import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../features/auth/services/auth.service';
import { ThemeLanguageToggle } from '../../shared/components/theme-language-toggle/theme-language-toggle';
import { I18nService } from '../../core/services/i18n.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeLanguageToggle],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout implements OnInit {
  currentUserName: string = '';
  currentUserEmail: string = '';
  userType: string = '';
  unreadMessagesCount: number = 0;

  constructor(
    private router: Router,
    private loginService: LoginService,
    public i18n: I18nService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.currentUserName = this.storage.getUsername() || 'Usuário';
    this.currentUserEmail = this.storage.getUserEmail() || '';
    this.userType = this.storage.getUserType() || 'doador';
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  // Navegação baseada no tipo de usuário
  getDashboardRoute(): string {
    return this.userType === 'ong' ? '/dashboard/ong' : '/dashboard/doador';
  }

  // Obtém o label traduzido do tipo de usuário
  getUserTypeLabel(): string {
    const normalizedType = this.userType.toLowerCase();
    const key = `userType.${normalizedType}`;
    return this.i18n.t(key);
  }
}
