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
var DeviceHistoryService = /** @class */ (function () {
    // 2.在组件的构造函数中实例化 HttpClient
    function DeviceHistoryService(http) {
        this.http = http;
    }
    // 获取设备信息
    DeviceHistoryService.prototype.getDevice = function (deviceId) {
        return this.http.get("/api/device/" + deviceId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取设备实时数据
    DeviceHistoryService.prototype.getCurrentProperty = function (deviceId, page, pageSize) {
        return this.http.get("/api/device/property/current/" + deviceId + "?page=" + page + "&pageSize=" + pageSize)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取设备历史数据
    DeviceHistoryService.prototype.getHistoryProperty = function (deviceId, page, pageSize, queryStr, fromdate, todate) {
        var url = 'api/device/property/history/';
        return this.http.get("" + url + deviceId + "?page=" + page + "&pageSize=" + pageSize + "&queryStr=" + queryStr + "&from=" + fromdate + "&to=" + todate)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取历史数据的统计值
    DeviceHistoryService.prototype.getStatistics = function (id, field, agg, from, to, interval) {
        return this.http
            .get("api/device/property/stat/" + id + "/" + field + "/" + agg + "?from=" + from + "&to=" + to + "&interval=" + interval)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 历史安装记录
    DeviceHistoryService.prototype.getHistory = function (userId, page, pageSize, queryStr, fromdate, todate) {
        var url = '';
        if (!userId) {
            url = "api/install?page=" + page + "&pageSize=" + pageSize + "&queryStr=" + queryStr + "&from=" + fromdate + "&to=" + todate;
        }
        else {
            url = "api/install?userId=" + userId + "&page=" + page + "&pageSize=" + pageSize + "&queryStr=" + queryStr + "&from=" + fromdate + "&to=" + todate;
        }
        return this.http.get(url)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 设备上下线记录
    DeviceHistoryService.prototype.getlogs = function (userId, page, pageSize, queryStr, fromdate, todate) {
        var url = '';
        if (!userId) {
            url = "/api/device/online_log?page=" + page + "&pageSize=" + pageSize + "&queryStr=" + queryStr + "&from=" + fromdate + "&to=" + todate;
        }
        else {
            url = "api/install?userId=" + userId + "&page=" + page + "&pageSize=" + pageSize + "&queryStr=" + queryStr + "&from=" + fromdate + "&to=" + todate;
        }
        return this.http.get(url)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取某个设备的所有服务调用
    DeviceHistoryService.prototype.getDeviceService = function (modelId) {
        return this.http.get("/api/device/model/service/all?modelId=" + modelId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取服务调用所需的参数
    DeviceHistoryService.prototype.getServeParam = function (serviceId) {
        return this.http.get("/api/device/model/service/getServeParam?serviceId=" + serviceId)
            .pipe(operators_1.map(function (res) {
            console.log('res:' + res);
            return res;
        }));
    };
    // 服务调用
    DeviceHistoryService.prototype.addInvokeService = function (body) {
        console.log('body: ' + body.args + 'deviceName ' + body.deviceName);
        return this.http.post("/api/device/model/service/invokeService", body)
            .pipe(operators_1.map(function (res) {
            console.log('res: ' + res);
            return res;
        }));
    };
    DeviceHistoryService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DeviceHistoryService);
    return DeviceHistoryService;
}());
exports.DeviceHistoryService = DeviceHistoryService;
//# sourceMappingURL=device-history.service.js.map