import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';


export class HttpService {
  protected DOMAIN: string;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
  ) {
    this.DOMAIN = environment.apiBaseUrl;
  }


  private hideSpinnerWithTimeout(showSpinner: boolean, seconds: number = 250): void {
    if (showSpinner) {
      setTimeout(() => {
        this.spinner.hide();
      }, seconds);
    }
  }

  private _executeApi<T>(api: any, showSpinner: boolean): Observable<T> {
    if (showSpinner) {
      this.spinner.show();
    }
    return new Observable((observer) => {
      api.subscribe({
        next: (response: T) => {
          observer.next(response);
          this.hideSpinnerWithTimeout(showSpinner);
        },
        error: (response: HttpErrorResponse) => {
          // this.toastrService.error(response.error);
          observer.error(response);
          this.hideSpinnerWithTimeout(showSpinner);
        },
        complete: () => {
          observer.complete();
          this.hideSpinnerWithTimeout(showSpinner);
        }
      });
      return {
        unsubscribe() { }
      };
    });
  }

  protected get<T>(url: string, showSpinner: boolean = true): Observable<T> {

    return this._executeApi(this.http.get(this.DOMAIN + url), true);
  }

  protected post<T>(
    url: string,
    form: any,
    showError: boolean = true,
    showSpinner: boolean = true
  ): Observable<T> {
    const formData = form;

    return this._executeApi(this.http.post(this.DOMAIN + url, formData), showError);
  }

  protected put<T>(
    url: string,
    form: any,
    showError: boolean = true,
    showSpinner: boolean = true
  ): Observable<T> {
    //const formData = this.convertToFormData(form);
    const formData = form;


    return this._executeApi(this.http.put(this.DOMAIN + url, formData), showError);
  }

  protected delete<T>(
    url: string,
    showSpinner: boolean = true
  ): Observable<T> {


    return this._executeApi(this.http.delete(this.DOMAIN + url), true);
  }


}
