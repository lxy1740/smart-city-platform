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
var InstallZoneService = /** @class */ (function () {
    function InstallZoneService(http) {
        this.http = http;
    }
    // 城市列表
    InstallZoneService.prototype.getZoneDefault = function () {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get('/api/zone/default')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取行政区域
    InstallZoneService.prototype.getRegions = function () {
        return this.http.get("/api/geo_region/all")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取所有安装区域
    InstallZoneService.prototype.getZone = function (page, pageSize, queryStr) {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get("/api/zone?page=" + page + "&pageSize=" + pageSize + "&queryStr=" + queryStr)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 删除安装区域
    InstallZoneService.prototype.deleteInstall = function (body) {
        console.log(body);
        // const body1 = JSON.stringify(body);
        var httpOptions = {
            headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }), body: body
        };
        return this.http.delete("/api/zone", httpOptions)
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 新增安装区域
    InstallZoneService.prototype.addNewInstall = function (body) {
        return this.http.post('/api/zone', body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 修改安装区域
    InstallZoneService.prototype.updateInstall = function (body) {
        return this.http.put('/api/zone', body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    InstallZoneService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], InstallZoneService);
    return InstallZoneService;
}());
exports.InstallZoneService = InstallZoneService;
//# sourceMappingURL=install-zone.service.js.map