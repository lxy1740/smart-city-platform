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
var CustomerService = /** @class */ (function () {
    function CustomerService(http) {
        this.http = http;
    }
    // 城市列表
    CustomerService.prototype.getZoneDefault = function () {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get('/api/zone/default')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取行政区域
    CustomerService.prototype.getRegions = function () {
        return this.http.get("/api/geo_region/all")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取所有Customer
    CustomerService.prototype.getCustomer = function (page, pageSize, queryStr) {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get("/api/customer?page=" + page + "&pageSize=" + pageSize + "&queryStr=" + queryStr)
            .pipe(operators_1.map(function (res) {
            console.log(res);
            return res;
        }));
    };
    // 删除Customer
    CustomerService.prototype.deleteCustomer = function (id) {
        // const httpOptions = {
        //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: body
        // };
        return this.http.delete("/api/customer?id=" + id)
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 新增Customer
    CustomerService.prototype.addNewCustomer = function (body) {
        console.log('body: ' + body);
        return this.http.post('/api/customer', body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 修改Customer
    CustomerService.prototype.updateCustomer = function (body) {
        return this.http.put('/api/customer', body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CustomerService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CustomerService);
    return CustomerService;
}());
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map