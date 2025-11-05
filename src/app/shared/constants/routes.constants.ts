/**
 * Rotas da aplicação
 */
export const ROUTES = {
  // Públicas
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  
  // Dashboards
  DASHBOARD_ONG: '/dashboard-ong',
  DASHBOARD_DOADOR: '/dashboard-doador',
  
  // Funcionalidades
  OVERVIEW: '/overview',
  CAMPANHAS: '/campanhas',
  VOLUNTARIOS: '/voluntarios',
  MARKETPLACE: '/marketplace',
  REPORTS: '/reports',
  ANALYTICS: '/analytics',
  CHAT: '/chat',
  DOACOES: '/doacoes',
  CONFIGURACOES: '/configuracoes'
} as const;

/**
 * Nomes das rotas para navegação
 */
export const ROUTE_NAMES = {
  HOME: 'Início',
  LOGIN: 'Login',
  SIGNUP: 'Cadastro',
  DASHBOARD_ONG: 'Dashboard ONG',
  DASHBOARD_DOADOR: 'Dashboard Doador',
  OVERVIEW: 'Visão Geral',
  CAMPANHAS: 'Campanhas',
  VOLUNTARIOS: 'Voluntários',
  MARKETPLACE: 'Marketplace',
  REPORTS: 'Relatórios',
  ANALYTICS: 'Analytics',
  CHAT: 'Chat',
  DOACOES: 'Doações',
  CONFIGURACOES: 'Configurações'
} as const;

/**
 * Rotas que requerem autenticação
 */
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD_ONG,
  ROUTES.DASHBOARD_DOADOR,
  ROUTES.OVERVIEW,
  ROUTES.CAMPANHAS,
  ROUTES.VOLUNTARIOS,
  ROUTES.MARKETPLACE,
  ROUTES.REPORTS,
  ROUTES.ANALYTICS,
  ROUTES.CHAT,
  ROUTES.DOACOES,
  ROUTES.CONFIGURACOES
] as const;

/**
 * Rotas públicas (não requerem autenticação)
 */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.SIGNUP
] as const;

/**
 * Rotas exclusivas para ONGs
 */
export const ONG_ROUTES = [
  ROUTES.DASHBOARD_ONG,
  ROUTES.REPORTS,
  ROUTES.ANALYTICS
] as const;

/**
 * Rotas exclusivas para Doadores
 */
export const DONOR_ROUTES = [
  ROUTES.DASHBOARD_DOADOR
] as const;
