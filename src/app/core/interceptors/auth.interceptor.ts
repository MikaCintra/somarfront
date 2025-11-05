import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * Interceptor HTTP para adicionar token de autenticação em todas as requisições
 * e tratar erros de autenticação globalmente
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Buscar token do sessionStorage
    const token = sessionStorage.getItem('auth-token');

    // Adicionar token no header se existir
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Processar requisição e capturar erros
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Erro 401 - Não autorizado (token expirado ou inválido)
        if (error.status === 401) {
          sessionStorage.clear();
          this.router.navigate(['/login']);
          console.error('Sessão expirada. Faça login novamente.');
        }

        // Erro 403 - Acesso negado
        if (error.status === 403) {
          console.error('Acesso negado. Você não tem permissão para esta ação.');
        }

        // Erro 500 - Erro interno do servidor
        if (error.status === 500) {
          console.error('Erro no servidor. Tente novamente mais tarde.');
        }

        // Retornar erro para o componente tratar
        return throwError(() => error);
      })
    );
  }
}
