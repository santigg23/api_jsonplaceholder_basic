import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Agregar header personalizado
    const clonedRequest = req.clone({
      setHeaders: {
        'X-App-Name': 'UserHub'
      }
    });

    // Mensaje antes de enviar la petición
    console.log('⏳ Enviando solicitud HTTP...');

    return next.handle(clonedRequest).pipe(
      tap(() => {
        // Mensaje cuando la respuesta llega
        console.log('✅ Respuesta recibida');
      }),
      catchError((error: HttpErrorResponse) => {
        // Manejo de errores globalmente
        if (error.status === 404) {
          console.error('❌ Error 404: Recurso no encontrado');
        } else if (error.status === 500) {
          console.error('❌ Error 500: Error interno del servidor');
        } else {
          console.error(`❌ Error ${error.status}: ${error.message}`);
        }
        return throwError(() => error);
      })
    );
  }
}
