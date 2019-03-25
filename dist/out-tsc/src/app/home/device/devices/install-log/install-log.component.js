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
var device_history_service_1 = require("../../../../service/device-history.service");
var now = new Date();
var InstallLogComponent = /** @class */ (function () {
    function InstallLogComponent(deviceHistoryService) {
        this.deviceHistoryService = deviceHistoryService;
        this.historyList = [];
        this.queryStr = '';
        this.page = 1;
        this.pageSize = 10;
        this.total = 0;
        this.startDate = { year: now.getFullYear() - 1, month: now.getMonth() + 1, day: now.getDate() > 28 ? 28 : now.getDate() }; // 开始日期
        this.endDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期
        this.startTime = { hour: 0, minute: 0, second: 0 };
        this.endTime = { hour: 23, minute: 59, second: 59 };
    }
    InstallLogComponent.prototype.ngOnInit = function () {
        this.getHistory();
    };
    InstallLogComponent.prototype.getHistory = function () {
        var that = this;
        if (typeof (this.startDate) === 'string') {
            console.log('日期错误！');
            console.log(this.startDate);
            return;
        }
        var smonth = this.startDate.month.toString().length > 1 ? this.startDate.month.toString() : "0" + this.startDate.month.toString();
        var sday = this.startDate.day.toString().length > 1 ? this.startDate.day.toString() : "0" + this.startDate.day.toString();
        var shour = this.startTime.hour.toString().length > 1 ? this.startTime.hour.toString() : "0" + this.startTime.hour.toString();
        var sminute = this.startTime.minute.toString().length > 1 ? this.startTime.minute.toString() : "0" + this.startTime.minute.toString();
        var emonth = this.endDate.month.toString().length > 1 ? this.endDate.month.toString() : "0" + this.endDate.month.toString();
        var eday = this.endDate.day.toString().length > 1 ? this.endDate.day.toString() : "0" + this.endDate.day.toString();
        var ehour = this.endTime.hour.toString().length > 1 ? this.endTime.hour.toString() : "0" + this.endTime.hour.toString();
        var eminute = this.endTime.minute.toString().length > 1 ? this.endTime.minute.toString() : "0" + this.endTime.minute.toString();
        var fromdate = this.startDate.year + "-" + smonth + "-" + sday + "T" + shour + ":" + sminute;
        var todate = this.endDate.year + "-" + emonth + "-" + eday + "T" + ehour + ":" + eminute;
        this.deviceHistoryService.getHistory(this.userId, this.page, this.pageSize, this.queryStr, fromdate, todate)
            .subscribe({
            next: function (val) {
                that.historyList = val.items;
                that.total = val.total;
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 返回
    InstallLogComponent.prototype.goback = function () {
        window.history.back();
    };
    // 分页获取数据
    InstallLogComponent.prototype.pageChange = function () {
        this.getHistory();
    };
    // 搜索
    InstallLogComponent.prototype.dataSearch = function () {
        this.page = 1;
        this.getHistory();
    };
    InstallLogComponent = __decorate([
        core_1.Component({
            selector: 'app-install-log',
            templateUrl: './install-log.component.html',
            styleUrls: ['./install-log.component.scss']
        }),
        __metadata("design:paramtypes", [device_history_service_1.DeviceHistoryService])
    ], InstallLogComponent);
    return InstallLogComponent;
}());
exports.InstallLogComponent = InstallLogComponent;
//# sourceMappingURL=install-log.component.js.map