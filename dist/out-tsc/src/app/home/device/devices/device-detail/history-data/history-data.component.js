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
var device_history_service_1 = require("../../../../../service/device-history.service");
var now = new Date();
var HistoryDataComponent = /** @class */ (function () {
    function HistoryDataComponent(routerinfo, router, deviceHistoryService) {
        this.routerinfo = routerinfo;
        this.router = router;
        this.deviceHistoryService = deviceHistoryService;
        this.page = 1; // 分页
        this.pageSize = 10; // 分页
        this.total = 0; // 分页
        this.historydatalist = []; // 数据列表
        this.startDate = { year: now.getFullYear() - 1, month: now.getMonth() + 1, day: now.getDate() > 28 ? 28 : now.getDate() }; // 开始日期
        this.endDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期
        this.startTime = { hour: 0, minute: 0, second: 0 };
        this.endTime = { hour: 23, minute: 59, second: 59 };
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
        this.flag = 1;
        this.agg = this.aggs[0];
        this.interval = this.intervals[0];
    }
    HistoryDataComponent.prototype.ngOnInit = function () {
        this.deviceId = this.routerinfo.snapshot.params.deviceId;
        this.dataKey = this.routerinfo.snapshot.params.dataKey;
        console.log(this.deviceId);
        console.log(this.dataKey);
        this.getHistoryData();
    };
    // tab切换
    HistoryDataComponent.prototype.goToChange = function () {
        if (this.flag === 1) {
            this.flag = 2;
            this.getStatistics();
        }
        else {
            this.flag = 1;
        }
    };
    HistoryDataComponent.prototype.aggsChange = function () {
        this.getStatistics();
    };
    // 获取历史数据的统计值
    HistoryDataComponent.prototype.getStatistics = function () {
        // id: number, field: string, agg: string, from: string, to: string, interval: string
        var that = this;
        var id = this.deviceId;
        var field = this.dataKey;
        var agg = this.agg.name;
        var interval = this.interval.name;
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
        this.deviceHistoryService.getStatistics(id, field, agg, fromdate, todate, interval).subscribe({
            next: function (val) {
                that.echartLine(val, "line_container1");
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 可视化
    HistoryDataComponent.prototype.echartLine = function (data, id) {
        var option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: data.map(function (item) {
                    return item.label;
                })
            },
            yAxis: {
                splitLine: {
                    show: false
                }
            },
            toolbox: {
                left: 'center',
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            dataZoom: [{
                    startValue: '2014-06-01'
                }, {
                    type: 'inside'
                }],
            visualMap: {
                top: 10,
                right: 10,
                pieces: [{
                        gt: 0,
                        lte: 50,
                        color: '#096'
                    }, {
                        gt: 50,
                        lte: 100,
                        color: '#ffde33'
                    }, {
                        gt: 100,
                        lte: 150,
                        color: '#ff9933'
                    }, {
                        gt: 150,
                        lte: 200,
                        color: '#cc0033'
                    }, {
                        gt: 200,
                        lte: 300,
                        color: '#660099'
                    }, {
                        gt: 300,
                        color: '#7e0023'
                    }],
                outOfRange: {
                    color: '#999'
                }
            },
            series: {
                name: 'type',
                type: 'line',
                data: data.map(function (item) {
                    return item.value;
                }),
                markLine: {
                    silent: true,
                    data: [{
                            yAxis: 50
                        }, {
                            yAxis: 100
                        }, {
                            yAxis: 150
                        }, {
                            yAxis: 200
                        }, {
                            yAxis: 300
                        }]
                }
            }
        };
        var bmapChart = echarts.init(document.getElementById(id));
        bmapChart.setOption(option);
    };
    // 返回
    HistoryDataComponent.prototype.goback = function () {
        window.history.back();
    };
    // 页面跳转
    HistoryDataComponent.prototype.jumpHandle = function (url) {
        this.router.navigate([url]);
    };
    // 获取指定设备的历史数据记录
    HistoryDataComponent.prototype.getHistoryData = function () {
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
        this.deviceHistoryService.getHistoryProperty(this.deviceId, this.page, this.pageSize, this.dataKey, fromdate, todate).subscribe({
            next: function (val) {
                that.historydatalist = val.items;
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
    HistoryDataComponent.prototype.pageChange = function () {
        this.getHistoryData();
    };
    // 搜索
    HistoryDataComponent.prototype.dataSearch = function () {
        this.page = 1;
        this.getHistoryData();
    };
    HistoryDataComponent = __decorate([
        core_1.Component({
            selector: 'app-history-data',
            templateUrl: './history-data.component.html',
            styleUrls: ['./history-data.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            device_history_service_1.DeviceHistoryService])
    ], HistoryDataComponent);
    return HistoryDataComponent;
}());
exports.HistoryDataComponent = HistoryDataComponent;
//# sourceMappingURL=history-data.component.js.map