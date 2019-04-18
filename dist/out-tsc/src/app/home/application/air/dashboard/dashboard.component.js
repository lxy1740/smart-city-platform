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
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: dashboard.component.ts
@time: 2018 /8 / 9 9: 00

*/
var core_1 = require("@angular/core");
var airmonitor_service_1 = require("../../../../service/airmonitor.service");
var router_1 = require("@angular/router");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(airmonitorService, router) {
        this.airmonitorService = airmonitorService;
        this.router = router;
        this.model = {}; // 存储数据
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
        // JSON.stringify({ id: id, agg, fromdate, todate, interval })
        this.dashData = JSON.parse(localStorage.getItem('dash_data'));
        var fromdate = this.dashData.fromdate.slice(0, 10);
        var todate = this.dashData.todate.slice(0, 10);
        if (fromdate === todate) {
            this.intervals = [
                { id: 1, name: 'm', type: '分钟' },
                { id: 2, name: 'h', type: '小时' },
            ];
        }
        this.agg = this.aggs[0];
        this.interval = this.intervals[0];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        if (this.dashData) {
            this.getStatistics();
        }
    };
    // 获取历史数据的统计值
    DashboardComponent.prototype.getStatistics = function () {
        // id: number, field: string, agg: string, from: string, to: string, interval: string
        var _this = this;
        var that = this;
        var id = this.dashData.id;
        var fromdate = this.dashData.fromdate;
        var todate = this.dashData.todate;
        var field = this.fields[0].name;
        var agg = this.agg.name;
        var interval = this.interval.name;
        this.fields.map(function (item, index) {
            _this.airmonitorService.getStatistics(id, item.name, agg, fromdate, todate, interval).subscribe({
                next: function (val) {
                    that.echartLine(val, item.type, "line_container" + (index + 1));
                },
                complete: function () {
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    };
    DashboardComponent.prototype.aggsChange = function () {
        this.getStatistics();
    };
    // 可视化
    DashboardComponent.prototype.echartLine = function (data, type, id) {
        var option = {
            title: {
                text: type
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
                name: type,
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
    // 路由跳转
    DashboardComponent.prototype.jumpHandle = function (url) {
        this.router.navigate([url]);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        }),
        __metadata("design:paramtypes", [airmonitor_service_1.AirmonitorService, router_1.Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map