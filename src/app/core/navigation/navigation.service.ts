import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';
import { FuseNavigationItem } from '../../../@fuse/components/navigation';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _router: Router,
    ) { }

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    /**
     * Get all navigation data
     */
    get() {
        const menu: FuseNavigationItem[] = [];

        menu.push({
            id: '000',
            title: 'DASHBOARD',
            type: 'basic',
            icon: 'heroicons_outline:home',
            link: '/dashboard/project',
        });


        menu.push({
            id: '444',
            title: 'LISTA DE TRANSACCIONES',
            type: 'basic',
            icon: 'heroicons_outline:home',
            link: 'transactions-list',
        });

        menu.push({
            id: '555',
            title: 'ADMINISTRACIÓN',
            type: 'collapsable',
            icon: 'heroicons_outline:home',
            link: '/administration',
            children: [{
                id: '555-1',
                title: 'ROLES',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/administration/admin-roles',
            },
            {
                id: '555-2',
                title: 'USUARIOS',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/administration/admin-users',
            },
            {
                id: '555-2',
                title: 'USUARIOS RS',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/administration/admin-users-rs',
            },
            {
                id: '555-3',
                title: 'MENÚS',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/administration/admin-menus',
            }
            ]
        });



        this._navigation.next({
            compact: menu,
            default: menu,
            futuristic: menu,
            horizontal: menu,
        });

    }
}
