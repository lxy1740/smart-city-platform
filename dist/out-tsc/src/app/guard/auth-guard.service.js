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
var router_1 = require("@angular/router");
var ngx_cookie_1 = require("ngx-cookie");
var Authority_tree_copy_1 = require("../data/Authority.tree.copy");
var Auth_system_1 = require("../data/Auth.system");
var angular_jwt_1 = require("@auth0/angular-jwt");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, _cookieService, jwtHelper) {
        this.router = router;
        this._cookieService = _cookieService;
        this.jwtHelper = jwtHelper;
        var token = localStorage.getItem('token');
        this.customerId = this.jwtHelper.decodeToken(token) && this.jwtHelper.decodeToken(token).customerid;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        // CanActivate 这种类型的 Guard用来控制是否允许进入当前的路径
        // console.log(route);
        // console.log(state.url);
        var url = state.url;
        this.geturlid(url);
        return this.checkLogin(url);
    };
    AuthGuard.prototype.canActivateChild = function (route, state) {
        // CanActivateChild 这种类型的 Guard用来控制是否允许进入当前路径的所有子路径
        // console.log(11);
        return this.canActivate(route, state);
    };
    AuthGuard.prototype.canLoad = function (route) {
        // CanLoad 用于控制一个异步加载的子模块是否允许被加载。
        var url = "/" + route.path;
        return this.checkLogin(url);
    };
    AuthGuard.prototype.checkLogin = function (url) {
        if (this._cookieService.getObject('currentUser')) {
            // const token = localStorage.getItem('token');
            var Authorities = JSON.parse(localStorage.getItem('Authorities'));
            // console.log('urlid');
            // console.log(this.urlid);
            // logged in so return true
            // console.log(Authorities);
            if (this.urlid === 'HP-000') {
                return true;
            }
            else {
                if (Authorities) {
                    return this.getture(Authorities.Authorities, this.urlid);
                }
            }
            // return true;
        }
        else {
            // not logged in so redirect to login page
            this.router.navigate(['/login']);
            return false;
        }
    };
    // 获取对象value
    AuthGuard.prototype.getkeys = function (obj) {
        if (!obj) {
            return;
        }
        return Object.keys(obj);
    };
    // 获取对象value
    AuthGuard.prototype.getVaule = function (obj) {
        if (!obj) {
            return;
        }
        return Object.values(obj);
    };
    //  // 判断数组中是否存在值
    AuthGuard.prototype.getture = function (arr, str) {
        var res = false;
        if (str === 'HP-000') {
            res = true;
            return res;
        }
        if (this.customerId && str === 'DM-007') {
            res = false;
            return res;
        }
        if (this.customerId) {
            res = true;
            Auth_system_1.AUTHSYSTEM.map(function (item) {
                if (item.id === str) {
                    res = false;
                    return res;
                }
            });
            return res;
        }
        arr.map(function (item) {
            if (item === str) {
                res = true;
                return res;
            }
        });
        return res;
    };
    AuthGuard.prototype.geturlid = function (url) {
        var that = this;
        var urlArr1 = url.split(';');
        var urlArr = urlArr1[0].split('/home/');
        if (urlArr[1] === 'homepage') {
            console.log('首页');
            that.urlid = 'HP-000';
            return;
        }
        Authority_tree_copy_1.AUTHORITYTREECOPY.map(function (item) {
            // console.log(item.routeLink);
            if (item.routeLink === urlArr[1]) {
                that.urlid = item.id;
                return;
            }
            else {
                console.log('no-->leave');
            }
        });
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, ngx_cookie_1.CookieService,
            angular_jwt_1.JwtHelperService])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
//# sourceMappingURL=auth-guard.service.js.map