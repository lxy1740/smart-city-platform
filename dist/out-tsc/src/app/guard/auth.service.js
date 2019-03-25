"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ngx_cookie_1 = require("ngx-cookie");
var router_1 = require("@angular/router");
var angular_jwt_1 = require("@auth0/angular-jwt");
var right_service_1 = require("../service/right.service");
var operators_1 = require("rxjs/operators");
var AuthService = /** @class */ (function () {
    function AuthService(http, _cookieService, router, jwtHelper, rightService) {
        this.http = http;
        this._cookieService = _cookieService;
        this.router = router;
        this.jwtHelper = jwtHelper;
        this.rightService = rightService;
        this.isLoggedIn = false;
    }
    AuthService.prototype.login = function (userName, password) {
        var _this = this;
        return this.http.post('/security/login', { 'userName': userName, 'password': password }, { responseType: 'text' })
            .pipe(operators_1.map(function (res) {
            var token = res;
            if (token) {
                _this.token = token;
                // 设置全局变量
                // this.winRef.nativeWindow.userId = this.userId;
                _this._cookieService.putObject('currentUser', JSON.stringify({ loginName: userName, token: token }));
                _this.getAuthorities(token);
                localStorage.setItem('token', token);
                _this.isLoggedIn = true;
                return true;
            }
            else {
                _this.isLoggedIn = false;
                return false;
            }
        }));
    };
    AuthService.prototype.logout = function () {
        this.isLoggedIn = false;
        this.token = null;
        this._cookieService.remove('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('Authorities');
        this.router.navigate(['/login']);
    };
    AuthService.prototype.getAuthorities = function (token) {
        var userId = this.jwtHelper.decodeToken(token).userid;
        this.getAuthoritiesByUserId(userId)
            .then(function (res) {
            localStorage.setItem('Authorities', JSON.stringify({ Authorities: res }));
        })
            .catch(function (reason) {
            console.log('Failed: ' + reason);
        });
    };
    // 获取用户权限
    AuthService.prototype.getAuthoritiesByUserId = function (id) {
        var that = this;
        var promise = new Promise(function (resolve, reject) {
            that.rightService.getAuthoritiesByUserId(id).subscribe({
                next: function (val) {
                    var res = that.getVaule(val);
                    that.routerList = [];
                    res.map(function (item, i) {
                        that.routerList.push(that.getVaule(item)[0]);
                    });
                },
                complete: function () {
                    resolve(that.routerList);
                },
                error: function (error) {
                    console.log(error);
                    reject(error);
                }
            });
        });
        return promise;
    };
    // 获取对象value
    AuthService.prototype.getkeys = function (obj) {
        if (!obj) {
            return;
        }
        return Object.keys(obj);
    };
    // 获取对象value
    AuthService.prototype.getVaule = function (obj) {
        if (!obj) {
            return;
        }
        return Object.values(obj);
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, ngx_cookie_1.CookieService, router_1.Router, angular_jwt_1.JwtHelperService,
            right_service_1.RightService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: auth.service.ts
@time: 2018 / 7 / 2 17: 18

*/
//# sourceMappingURL=auth.service.js.map