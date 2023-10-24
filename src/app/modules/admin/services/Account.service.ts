import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AccountModel } from '../models/AccountModel';
import { Observable } from 'rxjs';
import { HttpService } from 'app/core/auth/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends HttpService {
  constructor(http: HttpClient, spinner: NgxSpinnerService) {
    super(http, spinner);
  }

  public getListAccount() {

    return this.get<AccountModel[]>(`/account/list`, true);

  }

  public storeAccount(data: any) {
    return this.post<any>(`/account`, data, true);

  }

  public updateAccount(data: any) {
    return this.put(
      `/account`, data, true
    );
  }


  public getAccount(id: string) {
    return this.get<AccountModel>(
      `/account/` + id,

    );
  }
}
