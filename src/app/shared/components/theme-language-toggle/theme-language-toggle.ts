import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { I18nService, Language } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-theme-language-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="controls-container">
      <!-- Dark Mode Toggle -->
      <button 
        class="theme-toggle" 
        (click)="toggleTheme()"
        [title]="isDarkMode ? 'Modo Claro' : 'Modo Escuro'"
      >
        <span *ngIf="!isDarkMode">🌙</span>
        <span *ngIf="isDarkMode">☀️</span>
      </button>

      <!-- Language Selector -->
      <div class="language-selector">
        <button 
          class="lang-btn"
          [class.active]="currentLang === 'pt-BR'"
          (click)="setLanguage('pt-BR')"
          title="Português"
        >
          🇧🇷
        </button>
        <button 
          class="lang-btn"
          [class.active]="currentLang === 'en'"
          (click)="setLanguage('en')"
          title="English"
        >
          🇺🇸
        </button>
        <button 
          class="lang-btn"
          [class.active]="currentLang === 'es'"
          (click)="setLanguage('es')"
          title="Español"
        >
          🇪🇸
        </button>
      </div>
    </div>
  `,
  styles: [`
    .controls-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .theme-toggle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid rgba(0, 0, 0, 0.1);
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    }

    .language-selector {
      display: flex;
      gap: 4px;
      background-color: white;
      padding: 4px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .lang-btn {
      width: 36px;
      height: 36px;
      border: none;
      background-color: transparent;
      border-radius: 8px;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.3s ease;
      opacity: 0.5;

      &:hover {
        opacity: 0.8;
        background-color: rgba(0, 0, 0, 0.05);
      }

      &.active {
        opacity: 1;
        background-color: rgba(46, 204, 113, 0.1);
      }
    }

    /* Dark Mode */
    :host-context(.dark-theme) {
      .theme-toggle,
      .language-selector {
        background-color: #2d2d2d;
        border-color: rgba(255, 255, 255, 0.1);
      }

      .lang-btn:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .lang-btn.active {
        background-color: rgba(46, 204, 113, 0.2);
      }
    }
  `]
})
export class ThemeLanguageToggle implements OnInit {
  isDarkMode: boolean = false;
  currentLang: Language = 'pt-BR';

  constructor(
    private themeService: ThemeService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    this.themeService.isDarkMode().subscribe(isDark => {
      this.isDarkMode = isDark;
    });

    this.i18nService.getLanguage().subscribe(lang => {
      this.currentLang = lang;
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  setLanguage(lang: Language) {
    this.i18nService.setLanguage(lang);
  }
}
