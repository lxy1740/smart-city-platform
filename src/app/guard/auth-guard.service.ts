import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    CanLoad, Route
} from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RightService } from '../service/right.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private router: Router, private _cookieService: CookieService, public jwtHelper: JwtHelperService,
         private rightService: RightService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // CanActivate 这种类型的 Guard用来控制是否允许进入当前的路径
        console.log(route);
        console.log(state.url);
        const url: string = state.url;

        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // CanActivateChild 这种类型的 Guard用来控制是否允许进入当前路径的所有子路径
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        // CanLoad 用于控制一个异步加载的子模块是否允许被加载。
        const url = `/${route.path}`;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this._cookieService.getObject('currentUser')) {
            const token = localStorage.getItem('token');
            console.log(url);
            if (token) {
                console.log(token);
                const userId = this.jwtHelper.decodeToken(token).userid;
                console.log(userId);
                this.getAuthorityByRoleId(userId);
            }
            // logged in so return true
            return true;
        } else {
            // not logged in so redirect to login page
            this.router.navigate(['/login']);
            return false;
        }
        // if (this.authService.isLoggedIn) { return true; }

        // // Store the attempted URL for redirecting
        // this.authService.redirectUrl = url;

        // // Create a dummy session id
        // const sessionId = 123456789;

        // // Set our navigation extras object
        // // that contains our global query params and fragment
        // const navigationExtras: NavigationExtras = {
        //     queryParams: { 'session_id': sessionId },
        //     fragment: 'anchor'
        // };

        // // Navigate to the login page with extras
        // // this.router.navigate(['/login'], navigationExtras);
        // this.router.navigate(['/login']);
        // return false;
    }

    getAuthorityByRoleId(id) {
        const that = this;
        this.rightService.getAuthorityByRoleId(id).subscribe({
            next: function (val) {
                console.log(val);
            },
            complete: function () { },
            error: function (error) {
                console.log(error);
            }
        });
    }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
