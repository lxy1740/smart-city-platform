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
var operators_1 = require("rxjs/operators");
var ProductService = /** @class */ (function () {
    function ProductService(http) {
        this.http = http;
    }
    // 城市列表
    ProductService.prototype.getZoneDefault = function () {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get('/api/zone/default')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 设备列表
    ProductService.prototype.getDevice = function () {
        return this.http.get('/api/device/type/all')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取设备型号
    ProductService.prototype.getModel = function (queryStr, type, page, pagesize) {
        return this.http.get("/api/device/model?queryStr=" + queryStr + "&type=" + type + "&page=" + page + "&pageSize=" + pagesize)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 新增设备型号
    ProductService.prototype.setModel = function (body) {
        return this.http.post("/api/device/model", body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 修改设备型号
    ProductService.prototype.updateModel = function (body) {
        return this.http.put("/api/device/model", body)
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 设备型号/api/position?id=1
    ProductService.prototype.delModel = function (id) {
        return this.http.delete("/api/device/model?id=" + id)
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    ProductService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map