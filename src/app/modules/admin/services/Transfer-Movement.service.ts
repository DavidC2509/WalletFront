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

    public updateMovementTransfer(data: any): Observable<HttpResponse<any>> {
        return this.http.put(
            `${this.baseUrl}/movement-transfer/` + data.id, data,
            {
                observe: 'response',
            }
        );
    }

    public getMovementTransfer(id: string): Observable<HttpResponse<MovementTransferModel>> {
        return this.http.get<MovementTransferModel>(
            `${this.baseUrl}/movement-transfer/` + id,
            {
                observe: 'response',
            }
        );
    }

    public deleteMovementTransfer(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(
            `${this.baseUrl}/movement-transfer/` + id,
            {
                observe: 'response',
            }
        );
    }
}
