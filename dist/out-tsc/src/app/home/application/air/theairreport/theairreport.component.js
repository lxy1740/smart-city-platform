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
var router_1 = require("@angular/router");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ng_bootstrap_2 = require("@ng-bootstrap/ng-bootstrap");
var airmonitor_service_1 = require("../../../../service/airmonitor.service");
var file_saver_1 = require("file-saver");
var now = new Date();
var TheairreportComponent = /** @class */ (function () {
    function TheairreportComponent(router, airmonitorService, config) {
        this.router = router;
        this.airmonitorService = airmonitorService;
        this.historydatalist = []; // 指定设备的历史数据集合
        this.historydatalistItems = [];
        this.deviceIndx = 0;
        this.page = 1;
        this.startDate = { year: now.getFullYear() - 1, month: now.getMonth() + 1, day: now.getDate() > 28 ? 28 : now.getDate() }; // 开始日期
        this.endDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期
        this.startTime = { hour: 0, minute: 0, second: 0 };
        this.endTime = { hour: 23, minute: 59, second: 59 };
        this.seconds = true;
        this.fields = [
            { id: 1, name: 'pm25', type: 'PM2.5' },
            { id: 2, name: 'pm10', type: 'PM10' },
            { id: 3, name: 'tvoc', type: 'TVOC' },
            { id: 3, name: 'temperature', type: '温度' },
            { id: 3, name: 'humidity', type: '湿度' },
        ];
        this.aggs = [
            { id: 1, name: 'avg', type: '平均值' },
            { id: 2, name: 'max', type: '最大值' },
            { id: 3, name: 'min', type: '最小值' },
        ];
        this.intervals = [
            { id: 1, name: 'm', type: '分钟' },
            { id: 2, name: 'h', type: '小时' },
            { id: 3, name: 'd', type: '天' },
        ];
        this.dashtrue = false; // 可视化图表
        // 获取坐标范围
        this.NorthEast = JSON.parse(localStorage.getItem('NE'));
        this.SouthWest = JSON.parse(localStorage.getItem('SW'));
        config.spinners = false; // 时间控制
    }
    TheairreportComponent.prototype.ngOnInit = function () {
        this.getDevices();
    };
    // 根据当前坐标范围，获取所有在内的设备
    TheairreportComponent.prototype.getDevices = function () {
        var that = this;
        this.airmonitorService.getAirDevice(this.NorthEast, this.SouthWest).subscribe({
            next: function (val) {
                that.devicelist = val;
                that.currentdevice = val[0];
            },
            complete: function () {
                that.getHistoryData();
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 点击左侧监测点
    TheairreportComponent.prototype.selectPoint = function (index, device) {
        this.currentdevice = device;
        this.deviceIndx = index;
        this.getHistoryData();
    };
    // 获取指定设备的历史数据记录
    TheairreportComponent.prototype.getHistoryData = function () {
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
        var page = this.page;
        var pageSize = 10;
        this.airmonitorService.getHistoryData(this.currentdevice.id, fromdate, todate, page, pageSize).subscribe({
            next: function (val) {
                that.historydatalist = val;
                that.historydatalistItems = val.items;
                that.total = val.total;
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 分页获取数据
    TheairreportComponent.prototype.pageChange = function () {
        this.getHistoryData();
    };
    // 搜索
    TheairreportComponent.prototype.dataSearch = function () {
        this.page = 1;
        this.getHistoryData();
    };
    // 本地存储数据
    TheairreportComponent.prototype.getStatistics = function () {
        var id = this.currentdevice.id;
        var agg = this.aggs[0].name;
        var fromdate = this.fromdate;
        var todate = this.todate;
        var interval = this.intervals[0].name;
        localStorage.setItem('dash_data', JSON.stringify({ id: id, agg: agg, fromdate: fromdate, todate: todate, interval: interval }));
    };
    // 路由跳转
    TheairreportComponent.prototype.jumpHandle = function (url) {
        this.router.navigate([url]);
    };
    // 获取当前设备的离线状态
    TheairreportComponent.prototype.getdevicestatus = function (val) {
        if (val.offline) {
            return '离线';
        }
        else {
            return '在线';
        }
    };
    // 导出表格
    TheairreportComponent.prototype.exportTable = function () {
        var blob = new Blob([document.getElementById('exportableTable').innerHTML], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        });
        file_saver_1.saveAs(blob, 'test.xls');
    };
    // 生成图表
    TheairreportComponent.prototype.openGenerateTables = function () {
        var that = this;
        this.dashtrue = true;
        this.getStatistics();
        this.jumpHandle('home/application/air/dashboard');
    };
    TheairreportComponent.prototype.getDismissReason = function (reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    TheairreportComponent = __decorate([
        core_1.Component({
            selector: 'app-airreport',
            templateUrl: './theairreport.component.html',
            styleUrls: ['./theairreport.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            airmonitor_service_1.AirmonitorService, ng_bootstrap_2.NgbTimepickerConfig])
    ], TheairreportComponent);
    return TheairreportComponent;
}());
exports.TheairreportComponent = TheairreportComponent;
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: airreport.component.ts
@ introduction: 监测大数据
@ln:196
@time: 2018 / 7 / 2 17: 18

*/
//# sourceMappingURL=theairreport.component.js.map