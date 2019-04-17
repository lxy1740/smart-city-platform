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
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var operators_2 = require("rxjs/operators");
var _1 = require("rxjs/");
var ngx_cookie_1 = require("ngx-cookie");
var InterceptorService = /** @class */ (function () {
    function InterceptorService(injector, _cookieService) {
        this.injector = injector;
        this._cookieService = _cookieService;
    }
    InterceptorService.prototype.goTo = function (url) {
        var _this = this;
        setTimeout(function () { return _this.injector.get(router_1.Router).navigateByUrl(url); });
    };
    InterceptorService.prototype.handleData = function (event) {
        // 业务处理：一些通用操作
        var that = this;
        switch (event.status) {
            case 200:
                var jwt = event.headers.get('jwt');
                if (jwt) {
                    localStorage.setItem('token', jwt);
                }
                return _1.of(event); // break;
            case 403:// 过期状态码
                localStorage.removeItem('token');
                that.goTo('/login');
                // if (event['error'].message && event['error'].message.indexOf('expired') > 0) {
                //     localStorage.removeItem('token');
                //     that.goTo('/login');
                // } else if (event['message'] && event['message'] === 'Missing or invalid Authorization header') {
                //     localStorage.removeItem('token');
                //     that.goTo('/login');
                // }
                return _1.throwError(event); // break;
            default:
                return _1.throwError(event); // break;
        }
        // return of(event);
    };
    InterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        var url = req.url;
        var newReq = req.clone({
            url: url,
        });
        return next.handle(newReq).pipe(operators_1.catchError(function (httpError) {
            return _this.handleData(httpError);
        }), operators_2.mergeMap(function (event) {
            // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
            if (event instanceof http_1.HttpResponse && event.status === 200) {
                return _this.handleData(event);
            }
            // 若一切都正常，则后续操作
            return _1.of(event);
        }));
    };
    InterceptorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.Injector, ngx_cookie_1.CookieService])
    ], InterceptorService);
    return InterceptorService;
}());
exports.InterceptorService = InterceptorService;
//# sourceMappingURL=interceptorService.js.map