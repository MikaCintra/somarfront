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
    'nav.dashboard': { 'pt-BR': 'Dashboard', 'en': 'Dashboard', 'es': 'Panel' },
    'nav.overview': { 'pt-BR': 'Visão Geral', 'en': 'Overview', 'es': 'Resumen' },
    'nav.campaigns': { 'pt-BR': 'Campanhas', 'en': 'Campaigns', 'es': 'Campañas' },
    'nav.volunteers': { 'pt-BR': 'Voluntários', 'en': 'Volunteers', 'es': 'Voluntarios' },
    'nav.donations': { 'pt-BR': 'Doações', 'en': 'Donations', 'es': 'Donaciones' },
    'nav.marketplace': { 'pt-BR': 'Marketplace', 'en': 'Marketplace', 'es': 'Mercado' },
    'nav.messages': { 'pt-BR': 'Mensagens', 'en': 'Messages', 'es': 'Mensajes' },
    'nav.analytics': { 'pt-BR': 'Analytics', 'en': 'Analytics', 'es': 'Analíticas' },
    'nav.reports': { 'pt-BR': 'Relatórios', 'en': 'Reports', 'es': 'Informes' },
    'nav.settings': { 'pt-BR': 'Configurações', 'en': 'Settings', 'es': 'Configuraciones' },
    'nav.logout': { 'pt-BR': 'Sair', 'en': 'Logout', 'es': 'Salir' },

    // User Types
    'userType.ong': { 'pt-BR': 'ONG', 'en': 'NGO', 'es': 'ONG' },
    'userType.doador': { 'pt-BR': 'Doador', 'en': 'Donor', 'es': 'Donante' },
    'userType.administrador': { 'pt-BR': 'Administrador', 'en': 'Administrator', 'es': 'Administrador' },
    'userType.admin': { 'pt-BR': 'Administrador', 'en': 'Administrator', 'es': 'Administrador' },
    'userType.voluntario': { 'pt-BR': 'Voluntário', 'en': 'Volunteer', 'es': 'Voluntario' },

    // Dashboard ONG
    'dashboard.ong.welcome': { 'pt-BR': 'Bem-vinda', 'en': 'Welcome', 'es': 'Bienvenida' },
    'dashboard.ong.subtitle': { 'pt-BR': 'Gerencie suas campanhas e acompanhe o impacto social', 'en': 'Manage your campaigns and track social impact', 'es': 'Gestiona tus campañas y rastrea el impacto social' },
    'dashboard.ong.activeCampaigns': { 'pt-BR': 'Campanhas Ativas', 'en': 'Active Campaigns', 'es': 'Campañas Activas' },
    'dashboard.ong.activeDonors': { 'pt-BR': 'Doadores Ativos', 'en': 'Active Donors', 'es': 'Donantes Activos' },
    'dashboard.ong.totalDonations': { 'pt-BR': 'Total de Doações', 'en': 'Total Donations', 'es': 'Total de Donaciones' },
    'dashboard.ong.volunteerHours': { 'pt-BR': 'Horas Voluntárias', 'en': 'Volunteer Hours', 'es': 'Horas de Voluntariado' },
    'dashboard.ong.ongoingCampaigns': { 'pt-BR': 'Campanhas em Andamento', 'en': 'Ongoing Campaigns', 'es': 'Campañas en Curso' },
    'dashboard.ong.newCampaign': { 'pt-BR': 'Nova Campanha', 'en': 'New Campaign', 'es': 'Nueva Campaña' },
    'dashboard.ong.volunteerOpportunities': { 'pt-BR': 'Oportunidades de Voluntariado', 'en': 'Volunteer Opportunities', 'es': 'Oportunidades de Voluntariado' },
    'dashboard.ong.newOpportunity': { 'pt-BR': 'Nova Oportunidade', 'en': 'New Opportunity', 'es': 'Nueva Oportunidad' },
    'dashboard.ong.items': { 'pt-BR': 'itens', 'en': 'items', 'es': 'artículos' },

    // Dashboard Doador
    'dashboard.donor.welcome': { 'pt-BR': 'Olá! Pronto para fazer a diferença?', 'en': 'Hello! Ready to make a difference?', 'es': '¡Hola! ¿Listo para marcar la diferencia?' },
    'dashboard.donor.subtitle': { 'pt-BR': 'Explore campanhas e oportunidades de voluntariado', 'en': 'Explore campaigns and volunteer opportunities', 'es': 'Explora campañas y oportunidades de voluntariado' },
    'dashboard.donor.level': { 'pt-BR': 'Nível', 'en': 'Level', 'es': 'Nivel' },
    'dashboard.donor.totalPoints': { 'pt-BR': 'Pontos Totais', 'en': 'Total Points', 'es': 'Puntos Totales' },
    'dashboard.donor.consecutiveDays': { 'pt-BR': 'dias consecutivos', 'en': 'consecutive days', 'es': 'días consecutivos' },
    'dashboard.donor.achievements': { 'pt-BR': 'Conquistas Desbloqueadas', 'en': 'Unlocked Achievements', 'es': 'Logros Desbloqueados' },
    'dashboard.donor.donationsMade': { 'pt-BR': 'Doações Realizadas', 'en': 'Donations Made', 'es': 'Donaciones Realizadas' },
    'dashboard.donor.impactedPeople': { 'pt-BR': 'Pessoas Impactadas', 'en': 'People Impacted', 'es': 'Personas Impactadas' },
    'dashboard.donor.availableCampaigns': { 'pt-BR': 'Campanhas Disponíveis', 'en': 'Available Campaigns', 'es': 'Campañas Disponibles' },
    'dashboard.donor.searchPlaceholder': { 'pt-BR': 'Pesquisar campanhas...', 'en': 'Search campaigns...', 'es': 'Buscar campañas...' },
    'dashboard.donor.volunteerOpportunities': { 'pt-BR': 'Oportunidades de Voluntáriado', 'en': 'Volunteer Opportunities', 'es': 'Oportunidades de Voluntariado' },

    // Common
    'common.loading': { 'pt-BR': 'Carregando...', 'en': 'Loading...', 'es': 'Cargando...' },
    'common.save': { 'pt-BR': 'Salvar', 'en': 'Save', 'es': 'Guardar' },
    'common.cancel': { 'pt-BR': 'Cancelar', 'en': 'Cancel', 'es': 'Cancelar' },
    'common.delete': { 'pt-BR': 'Excluir', 'en': 'Delete', 'es': 'Eliminar' },
    'common.edit': { 'pt-BR': 'Editar', 'en': 'Edit', 'es': 'Editar' },
    'common.search': { 'pt-BR': 'Buscar', 'en': 'Search', 'es': 'Buscar' },
    'common.filter': { 'pt-BR': 'Filtrar', 'en': 'Filter', 'es': 'Filtrar' },
    'common.all': { 'pt-BR': 'Todos', 'en': 'All', 'es': 'Todos' },
    'common.items': { 'pt-BR': 'itens', 'en': 'items', 'es': 'artículos' },
    'common.pointsToNext': { 'pt-BR': 'pontos para o próximo nível', 'en': 'points to next level', 'es': 'puntos para el próximo nivel' },
    'common.clearFilters': { 'pt-BR': 'Limpar Filtros', 'en': 'Clear Filters', 'es': 'Limpiar Filtros' },
    'common.results': { 'pt-BR': 'campanha(s) encontrada(s)', 'en': 'campaign(s) found', 'es': 'campaña(s) encontrada(s)' },
    'common.reviews': { 'pt-BR': 'avaliações', 'en': 'reviews', 'es': 'reseñas' },
    'common.viewDetails': { 'pt-BR': 'Ver Detalhes', 'en': 'View Details', 'es': 'Ver Detalles' },
    'common.wantToDonate': { 'pt-BR': 'Quero Doar', 'en': 'I Want to Donate', 'es': 'Quiero Donar' },
    'common.wantToParticipate': { 'pt-BR': 'Quero Participar', 'en': 'I Want to Participate', 'es': 'Quiero Participar' },
    'common.spots': { 'pt-BR': 'vagas', 'en': 'spots', 'es': 'vacantes' },
    'common.state': { 'pt-BR': 'Estado', 'en': 'State', 'es': 'Estado' },
    'common.city': { 'pt-BR': 'Cidade', 'en': 'City', 'es': 'Ciudad' },
    'common.selectState': { 'pt-BR': 'Selecione o estado', 'en': 'Select state', 'es': 'Seleccione el estado' },
    'common.selectCity': { 'pt-BR': 'Selecione a cidade', 'en': 'Select city', 'es': 'Seleccione la ciudad' },
    'common.allStates': { 'pt-BR': 'Todos os Estados', 'en': 'All States', 'es': 'Todos los Estados' },
    'common.allCities': { 'pt-BR': 'Todas as Cidades', 'en': 'All Cities', 'es': 'Todas las Ciudades' },

    // Campaign
    'campaign.create': { 'pt-BR': 'Criar Campanha', 'en': 'Create Campaign', 'es': 'Crear Campaña' },
    'campaign.title': { 'pt-BR': 'Título da Campanha', 'en': 'Campaign Title', 'es': 'Título de la Campaña' },
    'campaign.description': { 'pt-BR': 'Descrição', 'en': 'Description', 'es': 'Descripción' },
    'campaign.goal': { 'pt-BR': 'Meta', 'en': 'Goal', 'es': 'Meta' },
    'campaign.category': { 'pt-BR': 'Categoria', 'en': 'Category', 'es': 'Categoría' },
    'campaign.urgency': { 'pt-BR': 'Urgência', 'en': 'Urgency', 'es': 'Urgencia' },
    'campaign.donate': { 'pt-BR': 'Doar', 'en': 'Donate', 'es': 'Donar' },

    // Categories
    'category.roupas': { 'pt-BR': 'Roupas', 'en': 'Clothes', 'es': 'Ropa' },
    'category.alimentos': { 'pt-BR': 'Alimentos', 'en': 'Food', 'es': 'Alimentos' },
    'category.educacao': { 'pt-BR': 'Educação', 'en': 'Education', 'es': 'Educación' },
    'category.moveis': { 'pt-BR': 'Móveis', 'en': 'Furniture', 'es': 'Muebles' },
    'category.brinquedos': { 'pt-BR': 'Brinquedos', 'en': 'Toys', 'es': 'Juguetes' },
    'category.higiene': { 'pt-BR': 'Higiene', 'en': 'Hygiene', 'es': 'Higiene' },
    'category.saude': { 'pt-BR': 'Saúde', 'en': 'Health', 'es': 'Salud' },
    'category.eventos': { 'pt-BR': 'Eventos', 'en': 'Events', 'es': 'Eventos' },
    'category.meioambiente': { 'pt-BR': 'Meio Ambiente', 'en': 'Environment', 'es': 'Medio Ambiente' },
    'category.esportes': { 'pt-BR': 'Esportes', 'en': 'Sports', 'es': 'Deportes' },
    'category.outros': { 'pt-BR': 'Outros', 'en': 'Others', 'es': 'Otros' },

    // Urgency levels
    'urgency.low': { 'pt-BR': 'Baixa', 'en': 'Low', 'es': 'Baja' },
    'urgency.medium': { 'pt-BR': 'Média', 'en': 'Medium', 'es': 'Media' },
    'urgency.high': { 'pt-BR': 'Alta', 'en': 'High', 'es': 'Alta' },

    // Login
    'login.title': { 'pt-BR': 'Entrar na Plataforma', 'en': 'Login to Platform', 'es': 'Iniciar Sesión' },
    'login.email': { 'pt-BR': 'E-mail', 'en': 'Email', 'es': 'Correo Electrónico' },
    'login.password': { 'pt-BR': 'Senha', 'en': 'Password', 'es': 'Contraseña' },
    'login.button': { 'pt-BR': 'Entrar', 'en': 'Login', 'es': 'Ingresar' },
    'login.signup': { 'pt-BR': 'Criar Conta', 'en': 'Sign Up', 'es': 'Registrarse' }
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

  // Traduz categoria dinamicamente
  translateCategory(category: string): string {
    const normalizedCategory = category.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '');
    
    const key = `category.${normalizedCategory}`;
    return this.translate(key);
  }

  // Traduz urgência dinamicamente
  translateUrgency(urgency: string): string {
    const key = `urgency.${urgency.toLowerCase()}`;
    return this.translate(key);
  }
}
