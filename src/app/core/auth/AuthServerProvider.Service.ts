import { DebugElement, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '../../../environments/environment';
import { AUTH_TOKEN } from '../const';
import { SendSignUpModel } from '../models/SendSignUpModel';
import { SendSignInModel } from '../models/SendSignInModel';
import { AuthUtils } from './auth.utils';

type JwtToken = {
  token: string;
  result: boolean;
};

@Injectable()
export class AuthServerProvider {
  private baseUrl: string = environment.apiBaseUrl;
  private _authenticated: boolean = false;
  private accessToken: string;

  constructor(
    private http: HttpClient,
    private _localStorageService: LocalStorageService
  ) { }

  getToken(): string {
    const tokenInLocalStorage: string | null = this._localStorageService.retrieve(AUTH_TOKEN);
    this.accessToken = tokenInLocalStorage;
    return tokenInLocalStorage;
  }

  public signIn(user: SendSignInModel): Observable<JwtToken> {
    return this.http
      .post<JwtToken>(
        `${this.baseUrl}/user/login`,
        user
      )
      .pipe(map((response) => {
        this.authenticateSuccess(response)
        // Set the authenticated flag to true
        this._authenticated = true;
        return response;
      }));
  }


  public signUp(body: SendSignUpModel): Observable<HttpResponse<any>> {
    return this.http
      .post(
        `${this.baseUrl}/user`,
        body,
        {
          observe: 'response',
        }
      );

  }

  public logout(): void {
    this._localStorageService.clear(AUTH_TOKEN);
    this._authenticated = false;
  }

  private authenticateSuccess(response: JwtToken): void {
    this._localStorageService.store(AUTH_TOKEN, response.token);
  }

  /**
 * Check the authentication status
 */
  check(): boolean {

    // Check if the user is logged in
    if (this._authenticated) {
      return true;
    }

    // Check the access token availability
    if (this.getToken()) {

      if (AuthUtils.isTokenExpired(this.accessToken)) {
        console.log("ingreso por token expirado");
        return false
      }
      this._authenticated = true;
      return true;
    }


    return false;

  }
}
