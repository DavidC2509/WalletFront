import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ClassifierModel } from '../models/ClassifierModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryMovementService {
  private baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getListCategoryMovement(): Observable<HttpResponse<ClassifierModel[]>> {
      return this.http.get<ClassifierModel[]>(
          `${this.baseUrl}/category-movement/list`,
          {
              observe: 'response',
          }
      );
  }

  public storeCategoryMovement(data: any): Observable<HttpResponse<any>> {
      return this.http.post(
        `${this.baseUrl}/category-movement`, data,
        {
          observe: 'response',
        }
      );
    }

}
