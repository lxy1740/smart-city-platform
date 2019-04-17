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
var PositionService = /** @class */ (function () {
    function PositionService(http) {
        this.http = http;
    }
    // 城市列表
    PositionService.prototype.getZoneDefault = function () {
        var cusid = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cusid[_i] = arguments[_i];
        }
        // return Observable.of(ARTICLESTYPE);
        // console.log(cusid);
        // console.log(typeof cusid);
        var url = cusid && cusid[0] ? "/api/zone/default?cusid=" + cusid : "/api/zone/default";
        return this.http.get(url)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 设备列表
    PositionService.prototype.getPositionType = function () {
        return this.http.get('/api/position/type')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取位置分页
    PositionService.prototype.getPosition = function (queryStr, type, page, pagesize) {
        return this.http.get("/api/position?queryStr=" + queryStr + "&type=" + type + "&page=" + page + "&pageSize=" + pagesize)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 新增
    PositionService.prototype.setPosition = function (body) {
        return this.http.post("/api/position", body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 删除位置 /api/position?id=1
    PositionService.prototype.delPosition = function (id) {
        return this.http.delete("/api/position?id=" + id)
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 修改位置
    PositionService.prototype.updataPosition = function (body) {
        return this.http.put("/api/position", body)
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 分页获取道路
    PositionService.prototype.getRoads = function (page, pageSize, queryStr) {
        return this.http.get("api/geo_way/?page=" + page + "&pageSize=" + pageSize + "&queryStr=" + queryStr)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取所有Customer
    PositionService.prototype.getCustomer = function (page, pageSize, queryStr) {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get("/api/customer?page=" + page + "&pageSize=" + pageSize + "&queryStr=" + queryStr)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    PositionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PositionService);
    return PositionService;
}());
exports.PositionService = PositionService;
//# sourceMappingURL=position.service.js.map