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
var http_1 = require("@angular/http");
var ngx_cookie_1 = require("ngx-cookie");
var operators_1 = require("rxjs/operators");
var windowserver_1 = require("../windowserver");
require("rxjs/add/operator/map");
var UserLoginService = /** @class */ (function () {
    function UserLoginService(http, winRef, _cookieService) {
        this.http = http;
        this.winRef = winRef;
        this._cookieService = _cookieService;
        // set token if saved in local storage
        var currentUser;
        if (this._cookieService.getObject('currentUser')) {
            // currentUser = JSON.parse(this._cookieService.getObject('currentUser'));
            currentUser = this._cookieService.getObject('currentUser');
        }
        this.token = currentUser && currentUser.token;
        this.userId = currentUser && currentUser.userId;
    }
    UserLoginService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post('/manager/auth/login', JSON.stringify({ loginName: username, password: password }))
            .pipe(operators_1.map(function (res) {
            if (res.status === 200) {
                var token = res.json() && res.json().token;
                var userId = res.json() && res.json().userId;
                if (token) {
                    _this.token = token;
                    _this.userId = userId;
                    // 设置全局变量
                    _this.winRef.nativeWindow.userId = _this.userId;
                    _this._cookieService.putObject('currentUser', JSON.stringify({ loginName: username, token: token, userId: userId }));
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (res.status === 202) {
                return res.json().code.toString();
            }
        }));
    };
    UserLoginService.prototype.logout = function () {
        this.token = null;
        this._cookieService.remove('currentUser');
        // sessionStorage.removeItem('currentUser');
    };
    UserLoginService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            windowserver_1.WindowRef, ngx_cookie_1.CookieService])
    ], UserLoginService);
    return UserLoginService;
}());
exports.UserLoginService = UserLoginService;
//# sourceMappingURL=user.login.service.js.map