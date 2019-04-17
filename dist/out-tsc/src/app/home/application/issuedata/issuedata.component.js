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
var issuedata_service_1 = require("../../../service/issuedata.service");
var router_1 = require("@angular/router");
var now = new Date();
var IssuedataComponent = /** @class */ (function () {
    function IssuedataComponent(issuedataService, router) {
        this.issuedataService = issuedataService;
        this.router = router;
        this.issueList = [];
        this.issue = {};
        this.pageSize = 10;
        this.startDate = { year: now.getFullYear() - 1, month: now.getMonth() + 1, day: now.getDate() > 28 ? 28 : now.getDate() }; // 开始日期
        this.endDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期
        this.startTime = { hour: 0, minute: 0, second: 0 };
        this.endTime = { hour: 23, minute: 59, second: 59 };
        this.seconds = true;
        this.alerts = [];
        this.page = 1;
        this.issue.posNum = '';
    }
    IssuedataComponent.prototype.ngOnInit = function () {
        this.getIssueHistoryList();
    };
    // 获取消息记录
    IssuedataComponent.prototype.getIssueHistoryList = function () {
        var that = this;
        var smonth = this.startDate.month.toString().length > 1 ? this.startDate.month.toString() : "0" + this.startDate.month.toString();
        var sday = this.startDate.day.toString().length > 1 ? this.startDate.day.toString() : "0" + this.startDate.day.toString();
        var shour = this.startTime.hour.toString().length > 1 ? this.startTime.hour.toString() : "0" + this.startTime.hour.toString();
        var sminute = this.startTime.minute.toString().length > 1 ? this.startTime.minute.toString() : "0" + this.startTime.minute.toString();
        var emonth = this.endDate.month.toString().length > 1 ? this.endDate.month.toString() : "0" + this.endDate.month.toString();
        var eday = this.endDate.day.toString().length > 1 ? this.endDate.day.toString() : "0" + this.endDate.day.toString();
        var ehour = this.endTime.hour.toString().length > 1 ? this.endTime.hour.toString() : "0" + this.endTime.hour.toString();
        var eminute = this.endTime.minute.toString().length > 1 ? this.endTime.minute.toString() : "0" + this.endTime.minute.toString();
        var fromdate = this.fromdate =
            this.startDate.year + "-" + smonth + "-" + sday + "T" + shour + ":" + sminute;
        var todate = this.todate = this.endDate.year + "-" + emonth + "-" + eday + "T" + ehour + ":" + eminute;
        this.issuedataService.getIssueHistoryData(this.issue.posNum, fromdate, todate, this.page, this.pageSize).subscribe({
            next: function (val) {
                that.issueList = val.items;
                that.total = val.total;
            },
            complete: function () { },
            error: function (error) {
                console.log(error);
                var message = error.error.errors[0].defaultMessage;
                that.alerts.push({
                    id: 1,
                    type: 'danger',
                    message: "\u67E5\u8BE2\u5931\u8D25\uFF1A" + message + "\uFF01",
                });
            }
        });
    };
    // 搜索按键点击事件
    IssuedataComponent.prototype.execQuery = function () {
        this.getIssueHistoryList();
    };
    // 换页
    IssuedataComponent.prototype.pageChange = function () {
        this.getIssueHistoryList();
    };
    // 路由跳转
    IssuedataComponent.prototype.jumpHandle = function (url) {
        history.back();
        // this.router.navigate([url]);
    };
    IssuedataComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], IssuedataComponent.prototype, "alerts", void 0);
    IssuedataComponent = __decorate([
        core_1.Component({
            selector: 'app-issuedata',
            templateUrl: './issuedata.component.html',
            styleUrls: ['./issuedata.component.scss']
        }),
        __metadata("design:paramtypes", [issuedata_service_1.IssuedataService, router_1.Router])
    ], IssuedataComponent);
    return IssuedataComponent;
}());
exports.IssuedataComponent = IssuedataComponent;
//# sourceMappingURL=issuedata.component.js.map