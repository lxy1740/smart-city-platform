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
var StrategyService = /** @class */ (function () {
    function StrategyService(http) {
        this.http = http;
    }
    // 获取策略表
    StrategyService.prototype.getStrategy = function () {
        return this.http.get("/api/streetlight/rule")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 新增策略
    StrategyService.prototype.addStrategy = function (name) {
        return this.http.post("/api/streetlight/rule", {
            'name': name
        })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 修改策略
    StrategyService.prototype.updateStrategy = function (id, name) {
        return this.http.put("/api/streetlight/rule", {
            'id': id,
            'name': name
        })
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 删除策略
    StrategyService.prototype.delStrategy = function (id) {
        return this.http.delete("/api/streetlight/rule?id=" + id)
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 获取指定策略的规则
    StrategyService.prototype.getRules = function (ruleId) {
        return this.http.get("/api/streetlight/rule/" + ruleId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 新增策略的日期规则
    StrategyService.prototype.addRules = function (ruleId, start, end, workdayRules, holidayRules) {
        return this.http.post("/api/streetlight/rule/" + ruleId, {
            'start': start,
            'end': end,
            'holidayRules': holidayRules,
            'workdayRules': workdayRules
        })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 更新策略的日期规则
    StrategyService.prototype.updataRules = function (ruleId, ruleDateId, start, end, workdayRules, holidayRules) {
        return this.http.put("/api/streetlight/rule/" + ruleId, {
            'start': start,
            'end': end,
            'id': ruleDateId,
            'holidayRules': holidayRules,
            'workdayRules': workdayRules
        })
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 删除策略的日期规则
    StrategyService.prototype.delRule = function (ruleId, ruleDateId) {
        return this.http.delete("/api/streetlight/rule/" + ruleId + "?ruleDateId=" + ruleDateId)
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 策略范围
    // 城市列表
    StrategyService.prototype.getZoneDefault = function () {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get('/api/zone/default')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取指定安装在区域内的路灯
    StrategyService.prototype.getRegionLights = function (regionId, page, pageSize) {
        return this.http.get("/api/streetlight/region/" + regionId + "?page=" + page + "&pageSize=" + pageSize)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取策略覆盖区域
    StrategyService.prototype.getRegion = function (ruleId) {
        return this.http.get("/api/streetlight/rule/" + ruleId + "/region")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 设置策略覆盖区域
    // [
    //     {
    //         'allDevices': true,
    //         'deviceIds': [
    //             0
    //         ],
    //         'regionId': 'string'
    //     }
    // ]
    StrategyService.prototype.setRegion = function (ruleId, body) {
        return this.http.put("/api/streetlight/rule/" + ruleId + "/region", body)
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 获取策略覆盖区域
    StrategyService.prototype.getZtreeRegion = function (ruleId) {
        return this.http.get("/api/streetlight/rule/" + ruleId + "/region")
            .pipe(operators_1.map(function (res) {
            return res;
            // const data = res.json();
            // return data;
        }));
    };
    StrategyService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], StrategyService);
    return StrategyService;
}());
exports.StrategyService = StrategyService;
//# sourceMappingURL=strategy.service.js.map