import { Injectable } from '@angular/core';
import { MovementModel } from '../models/MovementModel';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { MovementTransferModel } from '../models/MovementTransferModel';

@Injectable({
    providedIn: 'root'
})
export class TransferMovementService {

    private baseUrl: string = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getListMovementTransfer(): Observable<HttpResponse<MovementTransferModel[]>> {
        return this.http.get<MovementTransferModel[]>(
            `${this.baseUrl}/movement-transfer/list`,
            {
                observe: 'response',
            }
        );
    }

    public storeMovementTransfer(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseUrl}/movement-transfer`, data,
            {
                observe: 'response',
            }
        );
    }
}
