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
var http_1 = require("@angular/common/http"); // 1.引入HTTP模块
var operators_1 = require("rxjs/operators");
var RoadService = /** @class */ (function () {
    // 2.在组件的构造函数中实例化 HttpClient
    function RoadService(http) {
        this.http = http;
    }
    // 添加道路
    RoadService.prototype.addRoads = function (body) {
        return this.http.post("/api/geo_way", body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 修改道路
    RoadService.prototype.updetaRoads = function (body) {
        return this.http.put("/api/geo_way", body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 删除道路
    RoadService.prototype.delRoads = function (body) {
        var httpOptions = {
            headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }), body: body
        };
        return this.http.delete("/api/geo_way", httpOptions)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 分页获取道路
    RoadService.prototype.getRoads = function (page, pageSize, queryStr) {
        return this.http.get("api/geo_way/?page=" + page + "&pageSize=" + pageSize + "&queryStr=" + queryStr)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取孩子行政区域-
    RoadService.prototype.getChildRegions = function (parentId, page, pageSize, queryStr) {
        return this.http.get("/api/geo_region/children?page=" + page + "&pageSize=" + pageSize + "&parentId=" + parentId + "&queryStr=" + queryStr)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取行政区域
    RoadService.prototype.getRegions = function () {
        return this.http.get("/api/geo_region/all")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 删除
    RoadService.prototype.delRegions = function (body) {
        var httpOptions = {
            headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }), body: body
        };
        return this.http.delete("/api/geo_region", httpOptions)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 新增
    RoadService.prototype.addRegions = function (body) {
        return this.http.post("/api/geo_region", body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 修改
    RoadService.prototype.updetRegions = function (body) {
        return this.http.put("/api/geo_region", body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    RoadService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RoadService);
    return RoadService;
}());
exports.RoadService = RoadService;
//# sourceMappingURL=road.service.js.map