import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';

//Report User
@Injectable({
    providedIn: 'root'
})
export class UserService {

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }



    /**
 * Sign in
 *
 * @param credentials
 */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.get<User>('api/common/user').pipe(

        );
    }
}
