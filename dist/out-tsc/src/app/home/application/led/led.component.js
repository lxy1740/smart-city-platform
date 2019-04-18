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
var led_service_1 = require("../../../service/led.service");
var airmonitor_service_1 = require("../../../service/airmonitor.service");
var LedComponent = /** @class */ (function () {
    function LedComponent(ledService, airmonitorService) {
        this.ledService = ledService;
        this.airmonitorService = airmonitorService;
        this.url = 'http://172.18.8.46:3000';
        this.model = {}; // 存储数据
        this.user = {}; // 用户列表
        this.task1 = {}; // 开关屏
        this.task2 = {}; // 设置亮度
        this.task3 = {}; // 更新节目单
        this.task4 = {}; // 更新欢迎词
        this.plays = {}; // 设置播放内容
        this.airs = {}; // 设置空气质量播放内容
        this.users = []; // 用户列表
        this.tasks = []; // 任务列表
        this.medias = []; // 媒体列表
        this.programs = []; // 节目列表
        this.search_tasks = []; // led任务列表
        this.search_tasks_check = [];
        this.regions = [];
        this.regions_list = [];
        this.pagesize = 10;
        this.contrL1 = false; // 临时控制
        this.contrL2 = false; // 临时控制
        this.playTypes = [
            {
                type: 'text'
            },
            {
                type: 'image'
            },
            {
                type: 'git'
            },
            {
                type: 'video'
            },
            {
                type: 'slide_text'
            },
            {
                type: 'metrics_text'
            }
        ];
        this.page = 1;
        this.page_1 = 1;
        this.page_4 = 1;
        this.task2.value = 0;
        this.currentType = this.playTypes[0];
        this.model.airdevicelist = [];
        this.task1.id = 'DE1700220125';
        this.task2.id = 'DE1700220125';
        this.task3.id = 'DE1700220125';
        this.task4.id = 'DE1700220125';
        this.task4.fontsice = '16';
    }
    LedComponent.prototype.ngOnInit = function () {
        this.getTasks();
        this.getPrograms();
        // this.getAirdevices();
    };
    LedComponent.prototype.viewRegions = function (item) {
        console.log(item);
        this.regions_list = item;
    };
    // 分页获取节目单
    LedComponent.prototype.getPrograms = function () {
        var that = this;
        var page = this.page_4;
        var pagesize = this.pagesize;
        this.ledService.getPrograms(page, pagesize).subscribe({
            next: function (val) {
                that.programs = val.data;
                that.total_4 = val.total;
                console.log(val);
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 获取空气质量点
    LedComponent.prototype.getAirdevices = function () {
        var that = this;
        var NorthEast = {
            'lng': 113.998944,
            'lat': 22.590191
        }; // 返回矩形区域的东北角
        var SouthWest = {
            'lng': 113.902502,
            'lat': 22.527578
        }; // 返回矩形区域的西南角
        this.airmonitorService.getAirDevice(NorthEast, SouthWest).subscribe({
            next: function (val) {
                that.model.airdevicelist = val; // 变为新值
            },
            complete: function () {
            },
            error: function (error) {
            }
        });
    };
    LedComponent.prototype.getUsers = function () {
        var that = this;
        var page = this.page;
        var pagesize = this.pagesize;
        this.ledService.getUsers(page, pagesize).subscribe({
            next: function (val) {
                that.users = val.data;
                that.total = val.total;
                console.log(val);
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    LedComponent.prototype.createUser = function () {
        var that = this;
        var body = {
            name: this.user.name,
            password: '123456',
        };
        this.ledService.createUser(body).subscribe({
            next: function (val) {
                console.log(val);
            },
            complete: function () {
                that.getUsers();
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 删除任务
    LedComponent.prototype.delTask = function (id) {
        var that = this;
        this.ledService.delTask(id).subscribe({
            next: function (val) {
                console.log(val);
            },
            complete: function () {
                that.getTasks();
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 分页获取任务
    LedComponent.prototype.getTasks = function () {
        var that = this;
        var page = this.page_1;
        var pagesize = this.pagesize;
        this.ledService.getTasks(page, pagesize).subscribe({
            next: function (val) {
                that.tasks = val.data;
                that.total_1 = val.total;
                console.log(val);
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 创建任务接口
    LedComponent.prototype.createTask = function (body) {
        var that = this;
        this.ledService.createTask(body).subscribe({
            next: function (val) {
                console.log(val);
            },
            complete: function () {
                that.getTasks();
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 开关屏
    LedComponent.prototype.createTask1 = function () {
        var id = this.task1.id;
        var value = this.contrL1 ? 1 : 0;
        var body = {
            'id': id,
            'name': '开关屏',
            'proid': '',
            'status': 'PENDING',
            'datagram': {
                'request': 'screen_switch',
                'arguments': [
                    {
                        'value': value
                    }
                ]
            }
        };
        this.createTask(body);
    };
    // 控制亮度
    LedComponent.prototype.createTask2 = function () {
        var id = this.task2.id;
        var value = Number(this.task2.value);
        var auto_value = this.contrL2 ? '1' : '0';
        var body = {
            'id': id,
            'name': '控制亮度',
            'proid': '',
            'status': 'PENDING',
            'datagram': {
                'request': 'set_brightness',
                'arguments': [
                    {
                        'auto_mode': auto_value,
                        'value': value
                    }
                ]
            }
        };
        this.createTask(body);
    };
    // 欢迎词任务
    LedComponent.prototype.createTask4 = function (_pro_id) {
        // 创建任务
        var tid = this.task4.id;
        var wellname = this.task4.wellname;
        var task_body = {
            'id': tid || 'DE1700220125',
            'name': wellname,
            'proid': _pro_id,
            'status': 'PENDING',
            'datagram': {
                'request': 'update_program',
                'arguments': [
                    {
                        'link': this.url + "/programs/getProgram?id=" + _pro_id,
                        'local': "/mnt/user/data/programs.json"
                    }
                ]
            }
        };
        this.createTask(task_body);
    };
    // 删除节目单
    LedComponent.prototype.delProgram = function (id) {
        var that = this;
        this.ledService.delProgram(id).subscribe({
            next: function (val) {
                console.log(val);
            },
            complete: function () {
                that.getPrograms();
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 创建节目单
    LedComponent.prototype.createProgram = function (name) {
        var that = this;
        var body = {
            'name': name,
            'id': '1',
            'display_time': 0,
            'width': 96,
            'height': 192,
            'type': 0,
            regions: this.regions
        };
        console.log(this.regions);
        this.ledService.createProgram(body).subscribe({
            next: function (val) {
                console.log(val);
                that.createTask4(val.id);
            },
            complete: function () {
                that.getPrograms();
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 空气质量播报节目单
    LedComponent.prototype.gProgram = function (item) {
        this.regions = [];
        this.regions.push({
            'id': '1',
            'name': 'row1',
            'x': 0,
            'y': 0,
            'width': 96,
            'height': 38,
            'items': [
                {
                    'font_name': 'msyh',
                    'font_size': '9',
                    'font_color': '#009CFF',
                    'background_color': '#00000000',
                    'effect_entry': '0',
                    'effect_exit': '18',
                    'time_entry': '3000',
                    'time_exit': '3000',
                    'id': '0',
                    'type': 'text',
                    'name': 'no name',
                    'loop': '1',
                    'length': 10000,
                    'contents': [
                        {
                            'content': "PM10: " + item.pm10
                        }
                    ]
                }
            ]
        });
        this.regions.push({
            'id': '2',
            'name': 'row2',
            'x': 0,
            'y': 39,
            'width': 96,
            'height': 38,
            'items': [
                {
                    'font_name': 'msyh',
                    'font_size': '9',
                    'font_color': '#009CFF',
                    'background_color': '#00000000',
                    'effect_entry': '0',
                    'effect_exit': '18',
                    'time_entry': '3000',
                    'time_exit': '3000',
                    'id': '0',
                    'type': 'text',
                    'name': 'no name',
                    'loop': '1',
                    'length': 10000,
                    'contents': [
                        {
                            'content': "PM2.5: " + item.pm25
                        }
                    ]
                }
            ]
        });
        this.regions.push({
            'id': '31',
            'name': 'row3-1',
            'x': 0,
            'y': 80,
            'width': 96,
            'height': 38,
            'items': [
                {
                    'font_name': 'msyh',
                    'font_size': '9',
                    'font_color': '#009CFF',
                    'background_color': '#00000000',
                    'effect_entry': '0',
                    'effect_exit': '18',
                    'time_entry': '3000',
                    'time_exit': '3000',
                    'id': '0',
                    'type': 'text',
                    'name': 'no name',
                    'loop': '1',
                    'length': 10000,
                    'contents': [
                        {
                            'content': "TVOC: " + item.tvoc
                        }
                    ]
                }
            ]
        });
        this.regions.push({
            'id': '41',
            'name': 'row4-1',
            'x': 0,
            'y': 115,
            'width': 96,
            'height': 38,
            'items': [
                {
                    'font_name': 'msyh',
                    'font_size': '9',
                    'font_color': '#009CFF',
                    'background_color': '#00000000',
                    'effect_entry': '0',
                    'effect_exit': '18',
                    'time_entry': '3000',
                    'time_exit': '3000',
                    'id': '0',
                    'type': 'text',
                    'name': 'no name',
                    'loop': '1',
                    'length': 10000,
                    'contents': [
                        {
                            'content': "\u6E29\u5EA6: " + item.temperature
                        }
                    ]
                }
            ]
        });
        this.regions.push({
            'id': '51',
            'name': 'row5-1',
            'x': 0,
            'y': 152,
            'width': 96,
            'height': 38,
            'items': [
                {
                    'font_name': 'msyh',
                    'font_size': '9',
                    'font_color': '#009CFF',
                    'background_color': '#00000000',
                    'effect_entry': '0',
                    'effect_exit': '18',
                    'time_entry': '3000',
                    'time_exit': '3000',
                    'id': '0',
                    'type': 'text',
                    'name': 'no name',
                    'loop': '1',
                    'length': 10000,
                    'contents': [
                        {
                            'content': "\u6E7F\u5EA6: " + item.humidity
                        }
                    ]
                }
            ]
        });
        this.createProgram('空气质量播报');
    };
    // 欢迎词节目单
    LedComponent.prototype.gProgram1 = function () {
        this.regions = [
            {
                'id': '1',
                'name': 'Text Message',
                'x': 0,
                'y': 0,
                'width': 96,
                'height': 192,
                'items': [
                    {
                        'background_color': '#00000000',
                        'id': '0',
                        'name': 'no name',
                        'length': 5000,
                        'type': 'text',
                        'effect_entry': '0',
                        'effect_exit': '18',
                        'font_name': 'msyh',
                        'font_size': this.task4.fontsice,
                        'font_color': '#ff0000',
                        'contents': [
                            {
                                'content': this.task4.wellname
                            }
                        ]
                    }
                ]
            }
        ];
        this.createProgram('欢迎词');
    };
    LedComponent.prototype.getProgram = function (item) {
        this.ledService.getProgram(item._id).subscribe({
            next: function (val) {
                console.log(val);
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    LedComponent.prototype.pageChange_1 = function () {
        this.getTasks();
    };
    LedComponent.prototype.pageChange_4 = function () {
        this.getPrograms();
    };
    LedComponent.prototype.changeContr1 = function () {
        this.contrL1 = !this.contrL1;
    };
    LedComponent.prototype.changeContr2 = function () {
        this.contrL2 = !this.contrL2;
    };
    // 路灯控制页亮度调节
    LedComponent.prototype.formatLabel = function (value) {
        // this.prompt = false;
        if (!value) {
            return 0;
        }
        if (value > 64) {
            return Math.round(value / 64) + '%';
        }
        return value + '%';
    };
    // 亮度改变
    LedComponent.prototype.changeSlider = function (arg) {
        console.log('亮度改变');
        console.log(arg);
        this.task2.value = arg;
    };
    LedComponent = __decorate([
        core_1.Component({
            selector: 'app-led',
            templateUrl: './led.component.html',
            styleUrls: ['./led.component.scss']
        }),
        __metadata("design:paramtypes", [led_service_1.LedService, airmonitor_service_1.AirmonitorService])
    ], LedComponent);
    return LedComponent;
}());
exports.LedComponent = LedComponent;
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: led-test.component.ts
@ introduction: led
@ln:637
@time: 2018 / 7 / 2 17: 18

*/
//# sourceMappingURL=led.component.js.map