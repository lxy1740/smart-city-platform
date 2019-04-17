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
var FunctionDefinitionService = /** @class */ (function () {
    function FunctionDefinitionService(http) {
        this.http = http;
    }
    // 获取数据定义 /api/device/model/service/all
    FunctionDefinitionService.prototype.getProperty = function (modelId) {
        return this.http.get("/api/device/model/property/all?modelId=" + modelId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取数据定义 /api/device/model/service/all
    FunctionDefinitionService.prototype.getService = function (modelId) {
        return this.http.get("/api/device/model/service/all?modelId=" + modelId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 添加数据定义
    FunctionDefinitionService.prototype.addProperty = function (body) {
        return this.http.post("/api/device/model/property", body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 修改数据定义
    FunctionDefinitionService.prototype.updateProperty = function (body) {
        return this.http.put("/api/device/model/property", body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 删除数据定义 /api/device/model/property/{id}
    FunctionDefinitionService.prototype.delProperty = function (id) {
        return this.http.delete("/api/device/model/property/" + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 添加服务定义
    FunctionDefinitionService.prototype.addService = function (body) {
        return this.http.post("/api/device/model/service", body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 修改服务定义 /api/device/model/property/{id}
    FunctionDefinitionService.prototype.updateService = function (body) {
        return this.http.put("/api/device/model/service", body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 删除服务定义 /api/device/model/property/{id}
    FunctionDefinitionService.prototype.delService = function (id) {
        return this.http.delete("/api/device/model/service/" + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    FunctionDefinitionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FunctionDefinitionService);
    return FunctionDefinitionService;
}());
exports.FunctionDefinitionService = FunctionDefinitionService;
//# sourceMappingURL=function-definition.js.map