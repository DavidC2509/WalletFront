import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthServerProvider } from './AuthServerProvider.Service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor(private _authService: AuthServerProvider) { }

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request object
    let newReq = req.clone();
    
    if (
      this._authService.getToken()
    ) {
      newReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this._authService.getToken()
        ),
      });
    }

    // Response
    return next.handle(newReq).pipe(
      catchError((error) => {
        // Catch "401 Unauthorized" responses
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Sign out
          this._authService.logout();

          // Reload the app
          location.reload();
        }

        return throwError(error);
      })
    );
  }
}
