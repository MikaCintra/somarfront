/**
 * Endpoints da API
 */
export const API_ENDPOINTS = {
  // Autenticação
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email'
  },
  
  // Campanhas
  CAMPAIGNS: {
    BASE: '/campaigns',
    BY_ID: (id: string) => `/campaigns/${id}`,
    DONATE: (id: string) => `/campaigns/${id}/donate`,
    VOLUNTEER: (id: string) => `/campaigns/${id}/volunteer`,
    SEARCH: '/campaigns/search',
    CATEGORIES: '/campaigns/categories'
  },
  
  // Voluntários
  VOLUNTEERS: {
    BASE: '/volunteers',
    OPPORTUNITIES: '/volunteers/opportunities',
    BY_ID: (id: string) => `/volunteers/${id}`,
    REGISTER: (id: string) => `/volunteers/${id}/register`,
    MY_REGISTRATIONS: '/volunteers/my-registrations'
  },
  
  // Marketplace
  MARKETPLACE: {
    BASE: '/marketplace',
    BY_ID: (id: string) => `/marketplace/${id}`,
    RESERVE: (id: string) => `/marketplace/${id}/reserve`,
    MY_ITEMS: '/marketplace/my-items',
    MY_RESERVATIONS: '/marketplace/my-reservations'
  },
  
  // Relatórios
  REPORTS: {
    BASE: '/reports',
    GENERATE: '/reports/generate',
    BY_ID: (id: string) => `/reports/${id}`,
    DOWNLOAD: (id: string) => `/reports/${id}/download`,
    METRICS: '/reports/metrics'
  },
  
  // Chat
  CHAT: {
    CONVERSATIONS: '/chat/conversations',
    MESSAGES: (conversationId: string) => `/chat/conversations/${conversationId}/messages`,
    SEND: (conversationId: string) => `/chat/conversations/${conversationId}/send`,
    MARK_READ: (conversationId: string) => `/chat/conversations/${conversationId}/mark-read`
  },
  
  // Usuários
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile/update',
    UPLOAD_AVATAR: '/users/profile/avatar',
    CHANGE_PASSWORD: '/users/profile/change-password'
  },
  
  // Doações
  DONATIONS: {
    BASE: '/donations',
    MY_DONATIONS: '/donations/my-donations',
    BY_ID: (id: string) => `/donations/${id}`
  },
  
  // Analytics
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    CAMPAIGNS: '/analytics/campaigns',
    DONATIONS: '/analytics/donations',
    VOLUNTEERS: '/analytics/volunteers'
  }
} as const;

/**
 * Status HTTP
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
} as const;

/**
 * Códigos de erro da API
 */
export const API_ERRORS = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  SERVER_ERROR: 'SERVER_ERROR'
} as const;
