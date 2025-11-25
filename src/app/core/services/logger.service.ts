import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  
  /**
   * Log de informação - apenas em desenvolvimento
   */
  log(message: string, ...args: any[]): void {
    if (!environment.production) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  /**
   * Log de erro - em produção, pode ser enviado para serviço de monitoramento
   */
  error(message: string, error?: any): void {
    if (!environment.production) {
      console.error(`[ERROR] ${message}`, error);
    } else {
      // TODO: Integrar com serviço de monitoramento (Sentry, LogRocket, etc)
      // this.sendToMonitoring(message, error);
    }
  }

  /**
   * Log de warning - apenas em desenvolvimento
   */
  warn(message: string, ...args: any[]): void {
    if (!environment.production) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  /**
   * Log de debug - apenas em desenvolvimento
   */
  debug(message: string, ...args: any[]): void {
    if (!environment.production) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  /**
   * Envia erro para serviço de monitoramento em produção
   */
  private sendToMonitoring(message: string, error?: any): void {
    // Implementar integração com Sentry, LogRocket ou similar
    // Exemplo: Sentry.captureException(error, { message });
  }
}
