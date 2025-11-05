/**
 * Tipos de usuário
 */
export const USER_TYPES = {
  ADMIN: 'admin',
  ONG: 'ong',
  DOADOR: 'doador'
} as const;

/**
 * Status de campanha
 */
export const CAMPAIGN_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

/**
 * Categorias de campanha
 */
export const CAMPAIGN_CATEGORIES = [
  'Alimentação',
  'Saúde',
  'Educação',
  'Moradia',
  'Vestuário',
  'Meio Ambiente',
  'Animais',
  'Cultura',
  'Esporte',
  'Tecnologia',
  'Outros'
] as const;

/**
 * Níveis de urgência
 */
export const URGENCY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const;

/**
 * Status de doação
 */
export const DONATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const;

/**
 * Status de voluntário
 */
export const VOLUNTEER_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

/**
 * Condições de item do marketplace
 */
export const ITEM_CONDITIONS = {
  NEW: 'new',
  USED: 'used',
  ANY: 'any'
} as const;

/**
 * Status de item do marketplace
 */
export const MARKETPLACE_STATUS = {
  AVAILABLE: 'available',
  RESERVED: 'reserved',
  DELIVERED: 'delivered'
} as const;

/**
 * Tipos de relatório
 */
export const REPORT_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  CUSTOM: 'custom'
} as const;

/**
 * Formatos de relatório
 */
export const REPORT_FORMATS = {
  PDF: 'pdf',
  EXCEL: 'excel',
  CSV: 'csv'
} as const;

/**
 * Tipos de conversa no chat
 */
export const CONVERSATION_TYPES = {
  DIRECT: 'direct',
  GROUP: 'group',
  SUPPORT: 'support'
} as const;

/**
 * Categorias de badges
 */
export const BADGE_CATEGORIES = {
  DONATION: 'donation',
  VOLUNTEER: 'volunteer',
  ENGAGEMENT: 'engagement',
  SPECIAL: 'special'
} as const;

/**
 * Configuração de paginação
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100]
} as const;

/**
 * Formatos de data
 */
export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd/MM/yyyy HH:mm',
  FULL: 'dd/MM/yyyy HH:mm:ss',
  TIME: 'HH:mm',
  ISO: 'yyyy-MM-dd'
} as const;

/**
 * Configuração de arquivos
 */
export const FILE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
} as const;

/**
 * Regex patterns
 */
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/,
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CNPJ: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  CEP: /^\d{5}-?\d{3}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
} as const;
