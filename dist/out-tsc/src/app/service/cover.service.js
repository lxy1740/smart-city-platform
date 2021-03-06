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
var CoverService = /** @class */ (function () {
    function CoverService(http) {
        this.http = http;
    }
    // 获取详细的位置数据
    CoverService.prototype.getCovers = function (ne, sw) {
        return this.http.post('/api/manhole/inbounds', {
            'ne': ne,
            'sw': sw
        })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取指定类型的事件
    CoverService.prototype.getIssues = function (deviceType, state) {
        return this.http.get("/api/issue/open?deviceType=" + deviceType + "&state=" + state)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取指定设备的事件
    CoverService.prototype.getDeviceIssues = function (deviceId, state) {
        return this.http.get("/api/issue/open?deviceId=" + deviceId + "&state=" + state)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 设置指定事件状态0-1
    CoverService.prototype.setIssues = function (issueId, state, comment) {
        return this.http.post("/api/issue/" + issueId + "/state", {
            'comment': comment,
            'state': state
        })
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 设置指定设备事件状态
    CoverService.prototype.setDeviceIssues = function (deviceId, orgState, state, comment, assigneeId) {
        return this.http.post("/api/issue/state?deviceId=" + deviceId, {
            'comment': comment,
            'orgState': orgState,
            'state': state,
            'assigneeId': assigneeId
        })
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 获取指定设备类型的不同状态的统计
    CoverService.prototype.getStatus = function (deviceType, state, comment) {
        return this.http.post("/api/issue/open/stat?deviceType=" + deviceType, {
            'comment': comment,
            'state': state
        })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取所有用户 - 分页
    CoverService.prototype.getAllUser = function () {
        return this.http.get("/security/user/all")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CoverService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CoverService);
    return CoverService;
}());
exports.CoverService = CoverService;
//# sourceMappingURL=cover.service.js.map