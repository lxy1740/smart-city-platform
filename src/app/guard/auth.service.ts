import { Component, Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/';
import { of } from 'rxjs/';
import { tap, delay } from 'rxjs/operators';
// import { UserLoginService} from '../service/user.login.service';


import { Http, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';


import { WindowRef } from '../windowserver';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {
    isLoggedIn = false;
    error: boolean;
    model: any;

    // store the URL so we can redirect after logging in
    redirectUrl: string;
    HEROES = {
        token: Date(),
        userId: 'lsq1098',
        status: 200,
        username: 'admin',
        password: '123456'
    };

    public token: string;

    constructor(private http: Http,
        private winRef: WindowRef, private _cookieService: CookieService,  public router: Router, ) {
        // set token if saved in local storage
        let currentUser: any;
        if (this._cookieService.getObject('currentUser')) {
            // currentUser = JSON.parse(this._cookieService.getObject('currentUser'));
            currentUser = this._cookieService.getObject('currentUser');

        }
        this.token = currentUser && currentUser.token;
    }


    login(username: string, password: string): Observable<any> {
        return of(this.HEROES).pipe(
            delay(1000),
            tap(val => {
                // console.log(val);
                if (val.status === 200) {
                    const token = val.token;
                    const userId = val.userId;
                    if (token && username === val.username && password === val.password) {
                        this.token = token;
                        // 设置全局变量
                        // this.winRef.nativeWindow.userId = this.userId;
                        this._cookieService.putObject('currentUser', { loginName: username, token: token, userId: userId });
                        // localStorage.setItem('token', token);
                        this.isLoggedIn = true;
                        return true;
                    } else {
                        this.isLoggedIn = false;
                        return false;
                    }
                }
            })
        );
    }

    login1(userName: String, password: String): Observable<any> {
        return this.http.post('/security/login', { 'userName': userName, 'password': password })
            .pipe(map((res: Response) => {
                // console.log(res);
                if (res.status === 200) {
                    // localStorage.setItem('access_token', res['_body']);
                    console.log(res['_body']);
                    const token = res['_body'];
                    if (token) {
                        this.token = token;
                        // 设置全局变量
                        // this.winRef.nativeWindow.userId = this.userId;
                        // this._cookieService.putObject('aaaaaa', JSON.stringify({ loginName: userName }));
                        this._cookieService.putObject('currentUser', JSON.stringify({ loginName: userName, token: token }));
                        localStorage.setItem('token', token);
                        // this._cookieService.putObject('bbbbbb', JSON.stringify({ loginName: userName }));
                        this.isLoggedIn = true;
                        return true;
                    } else {
                        this.isLoggedIn = false;
                        return false;
                    }
                } else if (res.status === 400) {
                    console.log('400');
                    return res.json().toString();
                } else {
                    console.log('500');
                }
            }));
    }
    logout(): void {
        this.isLoggedIn = false;
        this.token = null;
        this._cookieService.remove('currentUser');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

}


/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: auth.service.ts
@time: 2018 / 7 / 2 17: 18

*/

