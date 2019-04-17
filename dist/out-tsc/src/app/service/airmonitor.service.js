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
var AirmonitorService = /** @class */ (function () {
    function AirmonitorService(http) {
        this.http = http;
    }
    // 获取指定坐标范围内的所有设备
    AirmonitorService.prototype.getAirDevice = function (ne, sw) {
        return this.http.post("/api/airmonitor/inbounds", {
            'ne': ne,
            'sw': sw
        })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取指定设备的多项历史数据
    AirmonitorService.prototype.getHistoryData = function (id, from, to, page, pageSize) {
        return this.http.get("/api/airmonitor/history/" + id + "?from=" + from + "&to=" + to + "&page=" + page + "&pageSize=" + pageSize)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取历史数据的统计值
    AirmonitorService.prototype.getStatistics = function (id, field, agg, from, to, interval) {
        return this.http
            .get("/api/airmonitor/stat/" + id + "/" + field + "/" + agg + "?from=" + from + "&to=" + to + "&interval=" + interval)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    AirmonitorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AirmonitorService);
    return AirmonitorService;
}());
exports.AirmonitorService = AirmonitorService;
//# sourceMappingURL=airmonitor.service.js.map