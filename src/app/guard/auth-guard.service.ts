import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    CanLoad, Route
} from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AUTHORITYTREE} from '../data/Authority.tree';


@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    routerList: Array<any>;
    urlid: string;
    constructor(private router: Router, private _cookieService: CookieService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // CanActivate 这种类型的 Guard用来控制是否允许进入当前的路径
        // console.log(route);
        console.log(state.url);
        const url: string = state.url;

        this.geturlid(url);
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // CanActivateChild 这种类型的 Guard用来控制是否允许进入当前路径的所有子路径
        console.log(11);
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
            const Authorities = JSON.parse(localStorage.getItem('Authorities'));
            console.log('urlid');
            console.log(this.urlid);

            // logged in so return true
            console.log(Authorities);
            if (Authorities) {
                return this.getture(Authorities.Authorities, this.urlid);
            }


            // return true;
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

    // 获取对象value
    getkeys(obj) {
        if (!obj) {
            return;
        }
        return Object.keys(obj);
    }

    // 获取对象value
    getVaule(obj) {
        if (!obj) {
            return;
        }
        return Object.values(obj);
    }


    //  // 判断数组中是否存在值
    getture(arr, str) {
        let res = false;
        if (str === 'HP-000') {
            res = true;
            return res;
        }
        arr.map(item => {
            if (item === str) {
                res = true;
                return res;
            }
        });
        return res;
    }

    geturlid(url) {
        console.log(url);
        const that = this;
        const urlArr = url.split('/home/');
        console.log(urlArr);
        if (urlArr.length > 1) {
            const urlArr1 = urlArr[1].split('/');
            console.log('urlArr1');
            console.log(urlArr1);

            if (urlArr1.length === 1) { // 一级菜单
                if (urlArr1[0] === 'homepage') {
                    console.log(urlArr1);
                    that.urlid = 'HP-000';
                    return;
                }
                AUTHORITYTREE.map(item => {
                    if (item.routeLink === urlArr1[0]) {
                        console.log('一级菜单yes-->go');
                        that.urlid = item.id;
                        return;
                    } else {
                        console.log('一级菜单no-->leave');
                    }
                });
            } else { // 二级菜单
                AUTHORITYTREE.map(item => {
                    if (item.routeLink === urlArr1[0]) {
                        console.log('二级菜单yes-->go');
                        item.children.map(item1 => {
                            if (item1.routeLink === urlArr[1]) {
                                console.log('二级菜单yes-->go-->next');
                                that.urlid = item1.id;
                                return;
                            } else {
                                console.log('二级菜单no-->leave--》next');
                            }
                        });
                    } else {
                        console.log('二级菜单no-->leave');
                    }
                });
            }
        }
    }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
