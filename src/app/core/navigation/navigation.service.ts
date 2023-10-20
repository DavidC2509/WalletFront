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
    private _navigation: Navigation = new Navigation();

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _router: Router,
    ) {

    }

    /**
     * Get all navigation data
     */
    get(): Navigation {

        const menu: FuseNavigationItem[] = [];

        menu.push({
            id: '000',
            title: 'DASHBOARD',
            type: 'basic',
            icon: 'heroicons_outline:home',
            link: '/dashboard/home',
        });


        menu.push({
            id: '444',
            title: 'LISTA DE MOVIMIENTO',
            type: 'basic',
            icon: 'heroicons_outline:home',
            link: 'dashboard/movements',
        });

        menu.push({
            id: '444',
            title: 'TRANSFERENCIA DE CUENTA',
            type: 'basic',
            icon: 'heroicons_outline:home',
            link: 'dashboard/movements-transfer',
        });

        menu.push({
            id: '444',
            title: 'LISTA DE CUENTAS',
            type: 'basic',
            icon: 'heroicons_outline:home',
            link: 'dashboard/accounts',
        });

        menu.push({
            id: '444',
            title: 'CATEGORIA DE CUENTAS',
            type: 'basic',
            icon: 'heroicons_outline:home',
            link: 'dashboard/category-accounts',
        });

        menu.push({
            id: '444',
            title: 'CATEGORIA DE MOVIMIENTOS',
            type: 'basic',
            icon: 'heroicons_outline:home',
            link: 'dashboard/category-movements',
        });

        this._navigation.compact = menu;
        this._navigation.default = menu;
        this._navigation.futuristic = menu;
        this._navigation.horizontal = menu;
        return this._navigation;

    }
}
