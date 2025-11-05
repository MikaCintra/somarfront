import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../../shared/models/auth.interface';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api.service';

interface MockUser {
  email: string;
  senha: string;
  name: string;
  userType: 'admin' | 'ong' | 'doador';
}

interface LoginRequest {
  email: string;
  senha: string;
}

interface SignupRequest {
  nome: string;
  email: string;
  senha: string;
  userType: 'ong' | 'doador';
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Usuários mockados para teste
  private mockUsers: MockUser[] = [
    {
      email: 'admin@somar.com',
      senha: 'admin123',
      name: 'Administrador Somar',
      userType: 'admin'
    },
    {
      email: 'ong@somar.com',
      senha: 'ong123',
      name: 'ONG Amor Solidário',
      userType: 'ong'
    },
    {
      email: 'doador@somar.com',
      senha: 'doador123',
      name: 'João Silva',
      userType: 'doador'
    }
  ];

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService
  ) { }

  login(email: string, senha: string): Observable<LoginResponse> {
    // Se modo mock estiver ativado, usar dados mockados
    if (environment.enableMockData) {
      return this.mockLogin(email, senha);
    }

    // Produção: usar API real
    const request: LoginRequest = { email, senha };
    
    return this.apiService.post<LoginResponse>('auth/login', request).pipe(
      tap((response) => {
        // Salvar dados da sessão
        sessionStorage.setItem('auth-token', response.token);
        sessionStorage.setItem('username', response.name);
        sessionStorage.setItem('user-email', email);
        // userType virá do backend no response
        if ('userType' in response) {
          sessionStorage.setItem('user-type', (response as any).userType);
        }
      }),
      catchError((error) => {
        console.error('Erro no login:', error);
        return throwError(() => new Error('Erro ao fazer login. Verifique suas credenciais.'));
      })
    );
  }

  /**
   * Login mockado para desenvolvimento
   */
  private mockLogin(email: string, senha: string): Observable<LoginResponse> {
    const user = this.mockUsers.find(u => u.email === email && u.senha === senha);
    
    if (user) {
      const response: LoginResponse = {
        token: 'mock-token-' + Date.now(),
        name: user.name
      };
      
      sessionStorage.setItem('auth-token', response.token);
      sessionStorage.setItem('username', response.name);
      sessionStorage.setItem('user-email', user.email);
      sessionStorage.setItem('user-type', user.userType);
      
      // Simula delay de rede
      return of(response).pipe(delay(500));
    } else {
      return throwError(() => new Error('Credenciais inválidas')).pipe(delay(500));
    }
  }

  signup(nome: string, email: string, senha: string, userType: 'ong' | 'doador' = 'doador'): Observable<LoginResponse> {
    // Se modo mock estiver ativado, usar dados mockados
    if (environment.enableMockData) {
      return this.mockSignup(nome, email, senha, userType);
    }

    // Produção: usar API real
    const request: SignupRequest = { nome, email, senha, userType };
    
    return this.apiService.post<LoginResponse>('auth/signup', request).pipe(
      tap((response) => {
        // Salvar dados da sessão
        sessionStorage.setItem('auth-token', response.token);
        sessionStorage.setItem('username', response.name);
        sessionStorage.setItem('user-email', email);
        sessionStorage.setItem('user-type', userType);
      }),
      catchError((error) => {
        console.error('Erro no cadastro:', error);
        return throwError(() => new Error('Erro ao criar conta. Tente novamente.'));
      })
    );
  }

  /**
   * Cadastro mockado para desenvolvimento
   */
  private mockSignup(nome: string, email: string, senha: string, userType: 'ong' | 'doador'): Observable<LoginResponse> {
    const response: LoginResponse = {
      token: 'mock-token-' + Date.now(),
      name: nome
    };
    
    sessionStorage.setItem('auth-token', response.token);
    sessionStorage.setItem('username', nome);
    sessionStorage.setItem('user-email', email);
    sessionStorage.setItem('user-type', userType);
    
    return of(response).pipe(delay(500));
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('auth-token');
  }

  getUserType(): 'admin' | 'ong' | 'doador' | null {
    return sessionStorage.getItem('user-type') as 'admin' | 'ong' | 'doador' | null;
  }

  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  getUserEmail(): string | null {
    return sessionStorage.getItem('user-email');
  }

  logout(): void {
    // Limpar sessão local
    sessionStorage.clear();
    
    // Se estiver usando API real, notificar o backend
    if (!environment.enableMockData) {
      this.apiService.post('auth/logout', {}).subscribe({
        next: () => console.log('Logout realizado com sucesso'),
        error: (error) => console.error('Erro ao fazer logout:', error)
      });
    }
  }

  /**
   * Atualizar perfil do usuário
   */
  updateProfile(data: { nome?: string; telefone?: string; endereco?: string; bio?: string }): Observable<any> {
    if (environment.enableMockData) {
      // Mock: apenas atualizar sessionStorage
      if (data.nome) sessionStorage.setItem('username', data.nome);
      if (data.telefone) sessionStorage.setItem('user-phone', data.telefone);
      if (data.endereco) sessionStorage.setItem('user-address', data.endereco);
      if (data.bio) sessionStorage.setItem('user-bio', data.bio);
      
      return of({ success: true, message: 'Perfil atualizado' }).pipe(delay(300));
    }

    return this.apiService.put('users/profile', data);
  }

  /**
   * Alterar senha do usuário
   */
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    if (environment.enableMockData) {
      // Mock: apenas simular sucesso
      return of({ success: true, message: 'Senha alterada' }).pipe(delay(300));
    }

    return this.apiService.put('users/change-password', {
      currentPassword,
      newPassword
    });
  }
}


