import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '../../../environments/environment';
import { AUTH_TOKEN } from '../const';

type JwtToken = {
  token: string;
  result: boolean;
};

@Injectable()
export class AuthServerProvider {
  private baseUrlPGW: string = environment.apiBaseUrl;
  private _authenticated: boolean = false;

  constructor(
    private http: HttpClient,
    private _localStorageService: LocalStorageService
  ) { }

  getToken(): string {
    const tokenInLocalStorage: string | null = this._localStorageService.retrieve(AUTH_TOKEN);
    return tokenInLocalStorage;
  }

  public signIn(user: any): Observable<void> {
    return this.http
      .post<JwtToken>(
        `${this.baseUrlPGW}/account/api/authenticate`,
        user
      )
      .pipe(map((response) => {
        this.authenticateSuccess(response)
        // Set the authenticated flag to true
        this._authenticated = true;
      }));
  }

  public logout(): Observable<void> {
    return new Observable((observer) => {
      this._localStorageService.clear(AUTH_TOKEN);
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken): void {
    this._localStorageService.store(AUTH_TOKEN, response.token);
  }

  /**
 * Check the authentication status
 */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.getToken) {
      return of(false);
    }


    return of(true);

  }
}
