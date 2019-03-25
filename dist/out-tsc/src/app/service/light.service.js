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
var LightService = /** @class */ (function () {
    function LightService(http) {
        this.http = http;
    }
    // 获取策略表
    LightService.prototype.getLightByDeviceName = function (lightName) {
        console.log(lightName);
        return this.http.get("/api/streetlight?lightName=" + lightName)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取详细的位置数据
    LightService.prototype.getLights = function (ne, sw) {
        // 获取接口数据
        return this.http.post('/api/streetlight/inbounds', {
            'ne': ne,
            'sw': sw
        })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 临时控制路灯
    LightService.prototype.setLightsContr = function (id, level, stopTime) {
        return this.http.put('/api/streetlight/level', {
            'id': id,
            'level': level,
            'stopTime': stopTime
        })
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 修改路灯控制策略
    LightService.prototype.setStrategyRule = function (id, ruleId) {
        return this.http.put('/api/streetlight/setrule', {
            'id': id,
            'ruleId': ruleId
        })
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 获取策略表
    LightService.prototype.getStrategy = function () {
        return this.http.get("/api/streetlight/rule")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 设置多个指定路灯亮度
    LightService.prototype.setLightsLevel = function (ids, level, stopTime) {
        return this.http.put('/api/streetlight/levels', {
            'ids': ids,
            'level': level,
            'stopTime': stopTime
        })
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 设置多个指定路灯策略并下发
    LightService.prototype.setLightsRule = function (ids, ruleId) {
        return this.http.put('/api/streetlight/setrules', {
            'ids': ids,
            'ruleId': ruleId
        })
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
            // if (res.status === 200) {
            //     const data = { status: 200 };
            //     // console.log(res.json());
            //     return data;
            // } else if (res.status === 202) {
            //     return res.json().code.toString();
            // }
        }));
    };
    LightService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], LightService);
    return LightService;
}());
exports.LightService = LightService;
//# sourceMappingURL=light.service.js.map