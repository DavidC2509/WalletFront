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
export class ErrorInterceptor implements HttpInterceptor {
    /**
     * Constructor
     */
    constructor(private _authService: AuthServerProvider
    ) { }

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
        return next.handle(req).pipe(
            catchError((error) => {


                // Catch "401 Unauthorized" responses
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    // Sign out
                    this._authService.logout();

                    // Reload the app
                    location.reload();
                }


                return throwError(() => {

                    return error;
                });
            })
        );
    }
}
