import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Navigation,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { UserService } from 'app/core/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class InitialDataResolver implements Resolve<Navigation> {
  /**
   * Constructor
   */
  constructor(
    private _navigationService: NavigationService
  ) {}

  /**
   * Use this resolver to resolve initial mock-api for the application
   *
   * @param route
   * @param state
   */
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    
    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
      this._navigationService.get(),
    ]);
  }
}
