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
// import { Http, Headers, Response } from '@angular/http';
var operators_1 = require("rxjs/operators");
var MonitorService = /** @class */ (function () {
    function MonitorService(http) {
        this.http = http;
    }
    // 设备列表
    MonitorService.prototype.getDevice = function () {
        return this.http.get('/api/device/type/all')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 城市列表
    MonitorService.prototype.getZoneDefault = function () {
        var deviceTypeId = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            deviceTypeId[_i] = arguments[_i];
        }
        var url = '/api/zone/default';
        if (deviceTypeId) {
            url = "/api/zone/default?deviceTypeId=" + deviceTypeId;
        }
        return this.http.get(url)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取按区域汇总的位置数据
    MonitorService.prototype.getRegions = function (sw, ne, level, type) {
        return this.http.post("/api/position/inbounds/sum/" + level, {
            'bounds': {
                'ne': ne,
                'sw': sw
            },
            'device_type': type
        })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取策略表
    // 获取详细的位置数据
    MonitorService.prototype.getDetails = function (sw, ne, zoom, type) {
        return this.http.post('/api/position/inbounds/details', {
            'bounds': {
                'ne': ne,
                'sw': sw
            },
            'device_type': type
        })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取详细的位置数据ByDeviceNumber
    MonitorService.prototype.getDetailsByDeviceNumber = function (number) {
        return this.http.post("/api/position/inbounds/details/" + number, {})
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取指定位置所挂设备参数定义
    MonitorService.prototype.getDeviceDetails = function (positionId, deviceType, page, pageSize, queryStr) {
        return this.http.get("/api/position/device?positionId=\n        " + positionId + "&deviceType=" + deviceType + "&page=" + page + "&pageSize=" + pageSize + "&queryStr=" + queryStr)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取指定位置所挂设备参数定义
    MonitorService.prototype.getDeviceDetailsAll = function (positionId, deviceType) {
        return this.http.get("/api/position/device?positionId=" + positionId + "&deviceType=" + deviceType)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取设备型号
    MonitorService.prototype.getModels = function () {
        return this.http.get("/api/device/model/all")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取设备信息
    MonitorService.prototype.getDeviceByName = function (name) {
        return this.http.get("/api/device/getByName?name=" + name)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    MonitorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MonitorService);
    return MonitorService;
}());
exports.MonitorService = MonitorService;
//# sourceMappingURL=monitor.service.js.map