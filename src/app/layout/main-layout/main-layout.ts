import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../features/auth/services/auth.service';
import { ThemeLanguageToggle } from '../../shared/components/theme-language-toggle/theme-language-toggle';

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
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.currentUserName = sessionStorage.getItem('username') || 'Usuário';
    this.currentUserEmail = sessionStorage.getItem('user-email') || '';
    this.userType = sessionStorage.getItem('tipo') || 'doador';
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
}
