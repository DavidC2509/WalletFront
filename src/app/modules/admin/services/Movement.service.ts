import { Injectable } from '@angular/core';
import { MovementModel } from '../models/MovementModel';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { GlobalReportFilter } from '../models/global-report.model';

@Injectable({
    providedIn: 'root'
})
export class MovementService {

    private baseUrl: string = environment.apiBaseUrl;

    private filterInit = new GlobalReportFilter();

    private filter$ = new BehaviorSubject({
        ...this.filterInit,
        body: {
            accountId: null,
            typeMovement: null,
            startDate: null,
            endDate: null,
        },
    });

    constructor(private http: HttpClient) { }

    public getListMovementFilter(filter: GlobalReportFilter): Observable<HttpResponse<MovementModel[]>> {
        console.log('------------------', filter);

        const params = this.createRequestOption(filter);
        return this.http.get<MovementModel[]>(
            `${this.baseUrl}/movement/list`,
            {
                params: params,
                observe: 'response',
            }
        );
    }

    public getListMovement(): Observable<HttpResponse<MovementModel[]>> {

        return this.http.get<MovementModel[]>(
            `${this.baseUrl}/movement/list`,
            {
                observe: 'response',
            }
        );
    }

    createRequestOption = (req?: GlobalReportFilter): HttpParams => {
        
        let options: HttpParams = new HttpParams();
        req = req['body'];
        if (req) {
            Object.keys(req).forEach((key) => {
                
                if (req[key] != null) {
                    options = options.set(key, req[key]);
                }
            });
        }
        return options;
    };

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


    public currentFilter(): Observable<any> {
        return this.filter$.asObservable();
    }

    public sendFilter(filter: any): void {
        this.filter$.next(filter);
    }

    public getFilter(): any {
        return this.filter$.getValue();
    }
}
