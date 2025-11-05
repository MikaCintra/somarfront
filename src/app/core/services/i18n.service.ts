import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'pt-BR' | 'en' | 'es';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly LANG_KEY = 'somar-language';
  private currentLang$ = new BehaviorSubject<Language>(this.getInitialLanguage());

  private translations: Translations = {
    // Navigation
    'nav.overview': {
      'pt-BR': 'Visão Geral',
      'en': 'Overview',
      'es': 'Resumen'
    },
    'nav.campaigns': {
      'pt-BR': 'Campanhas',
      'en': 'Campaigns',
      'es': 'Campañas'
    },
    'nav.volunteers': {
      'pt-BR': 'Voluntários',
      'en': 'Volunteers',
      'es': 'Voluntarios'
    },
    'nav.donations': {
      'pt-BR': 'Doações',
      'en': 'Donations',
      'es': 'Donaciones'
    },
    'nav.messages': {
      'pt-BR': 'Mensagens',
      'en': 'Messages',
      'es': 'Mensajes'
    },
    'nav.analytics': {
      'pt-BR': 'Analytics',
      'en': 'Analytics',
      'es': 'Analíticas'
    },
    'nav.settings': {
      'pt-BR': 'Configurações',
      'en': 'Settings',
      'es': 'Configuraciones'
    },

    // Common
    'common.loading': {
      'pt-BR': 'Carregando...',
      'en': 'Loading...',
      'es': 'Cargando...'
    },
    'common.save': {
      'pt-BR': 'Salvar',
      'en': 'Save',
      'es': 'Guardar'
    },
    'common.cancel': {
      'pt-BR': 'Cancelar',
      'en': 'Cancel',
      'es': 'Cancelar'
    },
    'common.delete': {
      'pt-BR': 'Excluir',
      'en': 'Delete',
      'es': 'Eliminar'
    },
    'common.edit': {
      'pt-BR': 'Editar',
      'en': 'Edit',
      'es': 'Editar'
    },
    'common.search': {
      'pt-BR': 'Buscar',
      'en': 'Search',
      'es': 'Buscar'
    },
    'common.filter': {
      'pt-BR': 'Filtrar',
      'en': 'Filter',
      'es': 'Filtrar'
    },
    'common.all': {
      'pt-BR': 'Todos',
      'en': 'All',
      'es': 'Todos'
    },

    // Campaigns
    'campaign.create': {
      'pt-BR': 'Criar Campanha',
      'en': 'Create Campaign',
      'es': 'Crear Campaña'
    },
    'campaign.title': {
      'pt-BR': 'Título da Campanha',
      'en': 'Campaign Title',
      'es': 'Título de la Campaña'
    },
    'campaign.description': {
      'pt-BR': 'Descrição',
      'en': 'Description',
      'es': 'Descripción'
    },
    'campaign.goal': {
      'pt-BR': 'Meta',
      'en': 'Goal',
      'es': 'Meta'
    },
    'campaign.category': {
      'pt-BR': 'Categoria',
      'en': 'Category',
      'es': 'Categoría'
    },
    'campaign.urgency': {
      'pt-BR': 'Urgência',
      'en': 'Urgency',
      'es': 'Urgencia'
    },
    'campaign.donate': {
      'pt-BR': 'Doar',
      'en': 'Donate',
      'es': 'Donar'
    },

    // Analytics
    'analytics.title': {
      'pt-BR': 'Dashboard Analytics',
      'en': 'Analytics Dashboard',
      'es': 'Panel de Análisis'
    },
    'analytics.impact': {
      'pt-BR': 'Score de Impacto',
      'en': 'Impact Score',
      'es': 'Puntuación de Impacto'
    },
    'analytics.growth': {
      'pt-BR': 'Taxa de Crescimento',
      'en': 'Growth Rate',
      'es': 'Tasa de Crecimiento'
    },
    'analytics.export': {
      'pt-BR': 'Exportar CSV',
      'en': 'Export CSV',
      'es': 'Exportar CSV'
    },

    // Login
    'login.title': {
      'pt-BR': 'Entrar na Plataforma',
      'en': 'Login to Platform',
      'es': 'Iniciar Sesión'
    },
    'login.email': {
      'pt-BR': 'E-mail',
      'en': 'Email',
      'es': 'Correo Electrónico'
    },
    'login.password': {
      'pt-BR': 'Senha',
      'en': 'Password',
      'es': 'Contraseña'
    },
    'login.button': {
      'pt-BR': 'Entrar',
      'en': 'Login',
      'es': 'Ingresar'
    },
    'login.signup': {
      'pt-BR': 'Criar Conta',
      'en': 'Sign Up',
      'es': 'Registrarse'
    }
  };

  constructor() {}

  private getInitialLanguage(): Language {
    const saved = localStorage.getItem(this.LANG_KEY) as Language;
    if (saved && ['pt-BR', 'en', 'es'].includes(saved)) {
      return saved;
    }
    
    // Detectar idioma do navegador
    const browserLang = navigator.language;
    if (browserLang.startsWith('pt')) return 'pt-BR';
    if (browserLang.startsWith('es')) return 'es';
    return 'en';
  }

  getCurrentLanguage(): Language {
    return this.currentLang$.value;
  }

  getLanguage() {
    return this.currentLang$.asObservable();
  }

  setLanguage(lang: Language) {
    this.currentLang$.next(lang);
    localStorage.setItem(this.LANG_KEY, lang);
  }

  translate(key: string): string {
    const translation = this.translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[this.currentLang$.value] || translation['pt-BR'] || key;
  }

  // Alias para facilitar uso
  t(key: string): string {
    return this.translate(key);
  }
}
