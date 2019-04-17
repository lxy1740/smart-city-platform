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
var DeviceService = /** @class */ (function () {
    // 2.在组件的构造函数中实例化 HttpClient
    function DeviceService(http) {
        this.http = http;
    }
    // 城市列表
    DeviceService.prototype.getZoneDefault = function () {
        var cusid = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cusid[_i] = arguments[_i];
        }
        var url = cusid && cusid[0] ? "/api/zone/default?cusid=" + cusid : "/api/zone/default";
        return this.http.get(url)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取所有设备-分页
    DeviceService.prototype.getAllDevice = function (page, pageSize) {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get("/api/device?page=" + page + "&pageSize=" + pageSize)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取指定型号设备-分页
    DeviceService.prototype.getAllDeviceByModel = function (queryStr, model, page, pageSize, parentId) {
        // return Observable.of(ARTICLESTYPE);
        var url;
        if (parentId === undefined) {
            url = "/api/device?queryStr=" + queryStr + "&model=" + model + "&page=" + page + "&pageSize=" + pageSize;
        }
        else {
            url = "/api/device?queryStr=" + queryStr + "&model=" + model + "&page=" + page + "&pageSize=" + pageSize + "&parentId=" + parentId;
        }
        return this.http.get(url)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取所有设备型号-分页
    DeviceService.prototype.getAllDeviceModel = function (type, page, pageSize) {
        return this.http.get("/api/device/model?type=" + type + "&page=" + page + "&pageSize=" + pageSize)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 新增设备
    DeviceService.prototype.addNewDevice = function (body) {
        return this.http.post('/api/device', body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 删除设备
    DeviceService.prototype.delDevice = function (id) {
        return this.http.delete("/api/device?id=" + id)
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 修改设备
    DeviceService.prototype.updateDevice = function (body) {
        return this.http.put("/api/device", body)
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 获取指定区域内的所有位置点-分页
    DeviceService.prototype.getAllPosiByRegionId = function (queryStr, regionId, page, pageSize) {
        return this.http.get("/api/position/region/" + regionId + "?queryStr=" + queryStr + "&page=" + page + "&pageSize=" + pageSize)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取指定位置点
    DeviceService.prototype.getPosiById = function (id) {
        return this.http.get("/api/position/" + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取所有Customer
    DeviceService.prototype.getCustomer = function (page, pageSize, queryStr) {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get("/api/customer?page=" + page + "&pageSize=" + pageSize + "&queryStr=" + queryStr)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取位置信息
    DeviceService.prototype.getPositionById = function (id) {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get("/api/position/" + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    DeviceService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DeviceService);
    return DeviceService;
}());
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map