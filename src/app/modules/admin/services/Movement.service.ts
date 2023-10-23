import { Injectable } from '@angular/core';
import { MovementModel } from '../models/MovementModel';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MovementService {

    private baseUrl: string = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getListMovement(): Observable<HttpResponse<MovementModel[]>> {
        return this.http.get<MovementModel[]>(
            `${this.baseUrl}/movement/list`,
            {
                observe: 'response',
            }
        );
    }

    public storeMovement(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseUrl}/movement/account/` + data.accountId, data,
            {
                observe: 'response',
            }
        );
    }

    public updateMovement(data: any): Observable<HttpResponse<any>> {
        return this.http.put(
            `${this.baseUrl}/movement/` + data.id, data,
            {
                observe: 'response',
            }
        );
    }

    public getMovement(id: string): Observable<HttpResponse<MovementModel>> {
        return this.http.get<MovementModel>(
            `${this.baseUrl}/movement/` + id,
            {
                observe: 'response',
            }
        );
    }

    public deleteMovement(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(
            `${this.baseUrl}/movement/` + id,
            {
                observe: 'response',
            }
        );
    }
}
