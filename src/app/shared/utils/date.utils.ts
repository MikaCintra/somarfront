/**
 * Formata uma data para o formato brasileiro (dd/MM/yyyy)
 */
export function formatDateBR(date: Date | string): string {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Formata uma data e hora para o formato brasileiro (dd/MM/yyyy HH:mm)
 */
export function formatDateTimeBR(date: Date | string): string {
  const d = new Date(date);
  const datePart = formatDateBR(d);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${datePart} ${hours}:${minutes}`;
}

/**
 * Retorna a diferença em dias entre duas datas
 */
export function getDaysDifference(date1: Date | string, date2: Date | string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Verifica se uma data já passou
 */
export function isPastDate(date: Date | string): boolean {
  return new Date(date) < new Date();
}

/**
 * Retorna uma data relativa (ex: "há 2 dias", "em 3 horas")
 */
export function getRelativeTime(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'agora mesmo';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `há ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `há ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `há ${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'}`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `há ${diffInMonths} ${diffInMonths === 1 ? 'mês' : 'meses'}`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `há ${diffInYears} ${diffInYears === 1 ? 'ano' : 'anos'}`;
}

/**
 * Retorna o tempo restante até uma data (ex: "2 dias restantes")
 */
export function getTimeRemaining(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  
  if (d <= now) {
    return 'Expirado';
  }
  
  const diffInSeconds = Math.floor((d.getTime() - now.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'}`;
  }
  
  if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
  }
  
  return `${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
}

/**
 * Adiciona dias a uma data
 */
export function addDays(date: Date | string, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Adiciona meses a uma data
 */
export function addMonths(date: Date | string, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}
