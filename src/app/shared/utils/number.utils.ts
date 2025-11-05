/**
 * Formata um número com separadores de milhares
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('pt-BR').format(num);
}

/**
 * Calcula a porcentagem
 */
export function calculatePercentage(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
}

/**
 * Arredonda um número para N casas decimais
 */
export function roundTo(num: number, decimals: number = 2): number {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Gera um número aleatório entre min e max
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calcula a média de um array de números
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

/**
 * Encontra o valor mínimo em um array
 */
export function min(numbers: number[]): number {
  return Math.min(...numbers);
}

/**
 * Encontra o valor máximo em um array
 */
export function max(numbers: number[]): number {
  return Math.max(...numbers);
}

/**
 * Soma todos os valores de um array
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}
