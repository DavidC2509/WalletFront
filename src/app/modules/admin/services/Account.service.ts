import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AccountModel } from '../models/AccountModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getListAccount(): Observable<HttpResponse<AccountModel[]>> {
    return this.http.get<AccountModel[]>(
      `${this.baseUrl}/account/list`,
      {
        observe: 'response',
      }
    );
  }

  public storeAccount(data: any): Observable<HttpResponse<any>> {
    return this.http.post(
      `${this.baseUrl}/account`, data,
      {
        observe: 'response',
      }
    );
  }
}
