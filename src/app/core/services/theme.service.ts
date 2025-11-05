import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'somar-theme';
  private isDarkMode$ = new BehaviorSubject<boolean>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.isDarkMode$.value);
  }

  private getInitialTheme(): boolean {
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved) {
      return saved === 'dark';
    }
    // Detectar preferência do sistema
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  isDarkMode() {
    return this.isDarkMode$.asObservable();
  }

  getCurrentTheme(): boolean {
    return this.isDarkMode$.value;
  }

  toggleTheme() {
    const newTheme = !this.isDarkMode$.value;
    this.setTheme(newTheme);
  }

  setTheme(isDark: boolean) {
    this.isDarkMode$.next(isDark);
    this.applyTheme(isDark);
    localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean) {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-theme');
    }
  }
}
