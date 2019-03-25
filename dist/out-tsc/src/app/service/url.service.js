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
var UrlService = /** @class */ (function () {
    function UrlService() {
    }
    // 设置url中参数值
    UrlService.prototype.setURLParam = function (param, value) {
        var query = location.search.substring(1);
        var p = new RegExp('(^|)' + param + '=([^&]*)(|$)');
        if (p.test(query)) {
            var firstParam = query.split(param)[0];
            var secondParam = query.split(param)[1];
            if (secondParam.indexOf('&') > -1) {
                var lastPraam = secondParam.substring(secondParam.indexOf('&') + 1);
                return '?' + firstParam + param + '=' + value + '&' + lastPraam;
            }
            else {
                if (firstParam) {
                    return '?' + firstParam + param + '=' + value;
                }
                else {
                    return '?' + param + '=' + value;
                }
            }
        }
        else {
            if (query === '') {
                return '?' + param + '=' + value;
            }
            else {
                return '?' + query + '&' + param + '=' + value;
            }
        }
    };
    // 在当前浏览器url添加参数
    UrlService.prototype.addURLParam = function (key, value) {
        var url = window.location.href; // 获取当前url
        // let href;
        if (url.indexOf('?') > 0) {
            url = url.split('?')[0];
        }
        window.location.href = url + this.setURLParam(key, value);
        // href = url + this.setURLParam(key, value);
        // return href;
    };
    // 打开新的窗口并url添加参数
    UrlService.prototype.addURLParamAddOpen = function (key, value) {
        var url = window.location.href; // 获取当前url
        var href;
        if (url.indexOf('?') > 0) {
            url = url.split('?')[0];
        }
        // window.location.href = url + this.setParam(key, value);
        href = url + this.setURLParam(key, value);
        // return href;
        window.open(href, '_blank');
    };
    // 获取参数
    UrlService.prototype.getURLParam = function (paraName) {
        var url = document.location.toString();
        var arrObj = url.split('?');
        if (arrObj.length > 1) {
            var arrPara = arrObj[1].split('&');
            var arr = void 0;
            for (var i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split('=');
                if (arr != null && arr[0] === paraName) {
                    return arr[1];
                }
            }
            return '';
        }
        else {
            return '';
        }
    };
    UrlService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], UrlService);
    return UrlService;
}());
exports.UrlService = UrlService;
//# sourceMappingURL=url.service.js.map