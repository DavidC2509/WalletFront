import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AccountModel } from '../models/AccountModel';
import { Observable } from 'rxjs';
import { ClassifierModel } from '../models/ClassifierModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryAccountService {
  private baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getListCategoryAccount(): Observable<HttpResponse<ClassifierModel[]>> {
    return this.http.get<ClassifierModel[]>(
      `${this.baseUrl}/category-account/list`,
      {
        observe: 'response',
      }
    );
  }

  public storeCategoryAccount(data: any): Observable<HttpResponse<any>> {
    return this.http.post(
      `${this.baseUrl}/category-account`, data,
      {
        observe: 'response',
      }
    );
  }

  public updateCategoryAccount(data: any): Observable<HttpResponse<any>> {
    return this.http.put(
      `${this.baseUrl}/category-account`, data,
      {
        observe: 'response',
      }
    );
  }

  

  public getCategoryAccount(id: string): Observable<HttpResponse<ClassifierModel>> {
    return this.http.get<ClassifierModel>(
      `${this.baseUrl}/category-account/` + id,
      {
        observe: 'response',
      }
    );
  }
}
