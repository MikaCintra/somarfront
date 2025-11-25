import { Injectable } from '@angular/core';

export type UserType = 'admin' | 'administrador' | 'ong' | 'doador' | 'voluntario';

export interface UserData {
  email: string;
  username: string;
  userType: UserType;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly KEYS = {
    AUTH_TOKEN: 'auth-token',
    USER_EMAIL: 'user-email',
    USERNAME: 'username',
    USER_TYPE: 'user-type',
    USER_PHONE: 'user-phone',
    USER_ADDRESS: 'user-address',
    USER_BIO: 'user-bio',
    USER_SETTINGS: 'user-settings'
  };

  constructor() {}

  // ===== MÉTODOS GENÉRICOS =====

  set(key: string, value: any): void {
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      sessionStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Erro ao salvar no storage:', error);
    }
  }

  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const data = sessionStorage.getItem(key);
      if (!data) return defaultValue || null;
      
      try {
        return JSON.parse(data) as T;
      } catch {
        return data as T;
      }
    } catch (error) {
      console.error('Erro ao ler do storage:', error);
      return defaultValue || null;
    }
  }

  getString(key: string, defaultValue: string = ''): string {
    return sessionStorage.getItem(key) || defaultValue;
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }

  // ===== MÉTODOS ESPECÍFICOS DE USUÁRIO =====

  setAuthToken(token: string): void {
    sessionStorage.setItem(this.KEYS.AUTH_TOKEN, token);
  }

  getAuthToken(): string | null {
    return sessionStorage.getItem(this.KEYS.AUTH_TOKEN);
  }

  removeAuthToken(): void {
    sessionStorage.removeItem(this.KEYS.AUTH_TOKEN);
  }

  setUserEmail(email: string): void {
    sessionStorage.setItem(this.KEYS.USER_EMAIL, email);
  }

  getUserEmail(): string {
    return sessionStorage.getItem(this.KEYS.USER_EMAIL) || '';
  }

  setUsername(username: string): void {
    sessionStorage.setItem(this.KEYS.USERNAME, username);
  }

  getUsername(): string {
    return sessionStorage.getItem(this.KEYS.USERNAME) || '';
  }

  setUserType(type: UserType): void {
    sessionStorage.setItem(this.KEYS.USER_TYPE, type);
  }

  getUserType(): UserType {
    const type = sessionStorage.getItem(this.KEYS.USER_TYPE);
    return (type as UserType) || 'doador';
  }

  setUserPhone(phone: string): void {
    sessionStorage.setItem(this.KEYS.USER_PHONE, phone);
  }

  getUserPhone(): string {
    return sessionStorage.getItem(this.KEYS.USER_PHONE) || '';
  }

  setUserAddress(address: string): void {
    sessionStorage.setItem(this.KEYS.USER_ADDRESS, address);
  }

  getUserAddress(): string {
    return sessionStorage.getItem(this.KEYS.USER_ADDRESS) || '';
  }

  setUserBio(bio: string): void {
    sessionStorage.setItem(this.KEYS.USER_BIO, bio);
  }

  getUserBio(): string {
    return sessionStorage.getItem(this.KEYS.USER_BIO) || '';
  }

  setUserSettings(settings: any): void {
    sessionStorage.setItem(this.KEYS.USER_SETTINGS, JSON.stringify(settings));
  }

  getUserSettings<T>(): T | null {
    const settings = sessionStorage.getItem(this.KEYS.USER_SETTINGS);
    return settings ? JSON.parse(settings) : null;
  }

  /**
   * Retorna todos os dados do usuário logado
   */
  getUserData(): UserData {
    return {
      email: this.getUserEmail(),
      username: this.getUsername(),
      userType: this.getUserType(),
      token: this.getAuthToken() || undefined
    };
  }

  /**
   * Salva todos os dados do usuário de uma vez
   */
  setUserData(data: Partial<UserData>): void {
    if (data.email) this.setUserEmail(data.email);
    if (data.username) this.setUsername(data.username);
    if (data.userType) this.setUserType(data.userType);
    if (data.token) this.setAuthToken(data.token);
  }

  /**
   * Remove todos os dados do usuário (logout)
   */
  clearUserData(): void {
    sessionStorage.removeItem(this.KEYS.AUTH_TOKEN);
    sessionStorage.removeItem(this.KEYS.USER_EMAIL);
    sessionStorage.removeItem(this.KEYS.USERNAME);
    sessionStorage.removeItem(this.KEYS.USER_TYPE);
    sessionStorage.removeItem(this.KEYS.USER_PHONE);
    sessionStorage.removeItem(this.KEYS.USER_ADDRESS);
    sessionStorage.removeItem(this.KEYS.USER_BIO);
    sessionStorage.removeItem(this.KEYS.USER_SETTINGS);
  }

  /**
   * Verifica se usuário está logado
   */
  isLoggedIn(): boolean {
    return !!this.getAuthToken() && !!this.getUserEmail();
  }
}
