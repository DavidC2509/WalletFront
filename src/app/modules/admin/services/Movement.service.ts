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
}
