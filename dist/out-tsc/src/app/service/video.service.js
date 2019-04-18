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
var VideoService = /** @class */ (function () {
    // public url: string;
    function VideoService(http) {
        this.http = http;
    }
    // 获取详细的位置数据;
    VideoService.prototype.getCalamity = function (ne, sw) {
        // 获取接口数据
        return this.http.post('/api/disaster/inbounds', {
            'ne': ne,
            'sw': sw
        })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // getCalamity(): Observable<any> {
    //     const list = CALAMITYLIST.light_list;
    //     list.map((item, i) => {
    //         const val = this.getRandomIntInclusive(0, 10); // 调用方法，得到两个数重的随机数
    //         // console.log(val);
    //         if (val < 5) {
    //             list[i].error = 0;
    //         } else {
    //             list[i].error = 1;
    //         }
    //     });
    //     return of(list);
    // }
    // // 得到一个两数之间的随机整数，包括两个数在内
    // getRandomIntInclusive(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
    // }
    // 获取指定类型的事件
    VideoService.prototype.getIssues = function (deviceType, state) {
        return this.http.get("/api/issue/open?deviceType=" + deviceType + "&state=" + state)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 获取指定设备的事件
    VideoService.prototype.getDeviceIssues = function (deviceId, state) {
        return this.http.get("/api/issue/open?deviceId=" + deviceId + "&state=" + state)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 设置指定设备事件状态
    VideoService.prototype.setDeviceIssues = function (deviceId, orgState, state, comment, assigneeId) {
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
    // 获取所有用户 - 分页
    VideoService.prototype.getAllUser = function () {
        return this.http.get("/security/user/all")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    VideoService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], VideoService);
    return VideoService;
}());
exports.VideoService = VideoService;
//# sourceMappingURL=video.service.js.map