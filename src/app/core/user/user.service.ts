import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { environment } from 'environments/environment';

//Report User
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl: string = environment.apiBaseUrl;

    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        return this._httpClient
            .get<User>(`${this.baseUrl}/user/info`
            )
            .pipe(
                tap((user: User) => {
                    console.log("usuario obtenido: " + user)
                    this._user.next(user);
                })
            );
    }
}
