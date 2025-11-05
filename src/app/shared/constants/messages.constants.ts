/**
 * Mensagens de sucesso
 */
export const SUCCESS_MESSAGES = {
  // Autenticação
  LOGIN_SUCCESS: 'Login realizado com sucesso!',
  LOGOUT_SUCCESS: 'Logout realizado com sucesso!',
  REGISTER_SUCCESS: 'Cadastro realizado com sucesso!',
  PASSWORD_CHANGED: 'Senha alterada com sucesso!',
  PASSWORD_RESET_SENT: 'Email de recuperação enviado!',
  EMAIL_VERIFIED: 'Email verificado com sucesso!',
  
  // Campanhas
  CAMPAIGN_CREATED: 'Campanha criada com sucesso!',
  CAMPAIGN_UPDATED: 'Campanha atualizada com sucesso!',
  CAMPAIGN_DELETED: 'Campanha excluída com sucesso!',
  DONATION_SENT: 'Doação realizada com sucesso!',
  VOLUNTEER_REGISTERED: 'Inscrição como voluntário realizada!',
  
  // Perfil
  PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
  AVATAR_UPLOADED: 'Avatar atualizado com sucesso!',
  
  // Marketplace
  ITEM_CREATED: 'Item criado com sucesso!',
  ITEM_UPDATED: 'Item atualizado com sucesso!',
  ITEM_DELETED: 'Item excluído com sucesso!',
  ITEM_RESERVED: 'Item reservado com sucesso!',
  
  // Chat
  MESSAGE_SENT: 'Mensagem enviada!',
  
  // Geral
  SAVED: 'Salvo com sucesso!',
  DELETED: 'Excluído com sucesso!',
  UPDATED: 'Atualizado com sucesso!'
} as const;

/**
 * Mensagens de erro
 */
export const ERROR_MESSAGES = {
  // Autenticação
  INVALID_CREDENTIALS: 'Email ou senha inválidos',
  UNAUTHORIZED: 'Você não tem permissão para acessar este recurso',
  SESSION_EXPIRED: 'Sua sessão expirou. Faça login novamente',
  EMAIL_ALREADY_EXISTS: 'Este email já está cadastrado',
  WEAK_PASSWORD: 'A senha é muito fraca',
  
  // Validação
  REQUIRED_FIELD: 'Este campo é obrigatório',
  INVALID_EMAIL: 'Email inválido',
  INVALID_CPF: 'CPF inválido',
  INVALID_CNPJ: 'CNPJ inválido',
  INVALID_PHONE: 'Telefone inválido',
  INVALID_CEP: 'CEP inválido',
  PASSWORDS_NOT_MATCH: 'As senhas não coincidem',
  
  // Rede
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet',
  TIMEOUT: 'Tempo de conexão esgotado',
  SERVER_ERROR: 'Erro no servidor. Tente novamente mais tarde',
  
  // Geral
  NOT_FOUND: 'Recurso não encontrado',
  UNKNOWN_ERROR: 'Ocorreu um erro inesperado',
  LOADING_ERROR: 'Erro ao carregar dados',
  SAVE_ERROR: 'Erro ao salvar',
  DELETE_ERROR: 'Erro ao excluir',
  UPLOAD_ERROR: 'Erro ao fazer upload'
} as const;

/**
 * Mensagens informativas
 */
export const INFO_MESSAGES = {
  LOADING: 'Carregando...',
  SAVING: 'Salvando...',
  DELETING: 'Excluindo...',
  UPLOADING: 'Enviando...',
  PROCESSING: 'Processando...',
  NO_DATA: 'Nenhum dado encontrado',
  EMPTY_LIST: 'Lista vazia',
  CONFIRM_DELETE: 'Tem certeza que deseja excluir?',
  CONFIRM_LOGOUT: 'Tem certeza que deseja sair?',
  UNSAVED_CHANGES: 'Você tem alterações não salvas'
} as const;

/**
 * Mensagens de validação
 */
export const VALIDATION_MESSAGES = {
  MIN_LENGTH: (field: string, min: number) => `${field} deve ter no mínimo ${min} caracteres`,
  MAX_LENGTH: (field: string, max: number) => `${field} deve ter no máximo ${max} caracteres`,
  MIN_VALUE: (field: string, min: number) => `${field} deve ser no mínimo ${min}`,
  MAX_VALUE: (field: string, max: number) => `${field} deve ser no máximo ${max}`,
  INVALID_FORMAT: (field: string) => `Formato de ${field} inválido`,
  REQUIRED: (field: string) => `${field} é obrigatório`
} as const;
