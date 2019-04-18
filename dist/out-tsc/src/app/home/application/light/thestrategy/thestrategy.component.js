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
@file: strategy.componen.ts
@time: 2018 /8 / 16 9: 00

*/
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ng_bootstrap_2 = require("@ng-bootstrap/ng-bootstrap");
var ng_bootstrap_3 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var router_1 = require("@angular/router");
var strategy_service_1 = require("../../../../service/strategy.service");
var equals = function (one, two) {
    return one && two && two.year === one.year && two.month === one.month && two.day === one.day;
};
var before = function (one, two) {
    return !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day < two.day : one.month < two.month : one.year < two.year;
};
var after = function (one, two) {
    return !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day > two.day : one.month > two.month : one.year > two.year;
};
/** Error when invalid control is dirty, touched, or submitted. */
var MyErrorStateMatcher = /** @class */ (function () {
    function MyErrorStateMatcher() {
    }
    MyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        var isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    };
    return MyErrorStateMatcher;
}());
exports.MyErrorStateMatcher = MyErrorStateMatcher;
var ThestrategyComponent = /** @class */ (function () {
    function ThestrategyComponent(modalService, strategyService, element, router, calendar, _formBuilder, config) {
        var _this = this;
        this.modalService = modalService;
        this.strategyService = strategyService;
        this.element = element;
        this.router = router;
        this._formBuilder = _formBuilder;
        this.isOptional = false;
        this.isEditable = false;
        this.numberFormControl = new forms_2.FormControl('', [
            forms_1.Validators.required,
        ]);
        this.number2FormControl = new forms_2.FormControl('', [
            forms_1.Validators.required,
        ]);
        this.matcher = new MyErrorStateMatcher();
        this.modelData = {
            title: '删除',
            body: 'hh',
        };
        this.navs = [
            {
                id: 0,
                name: '策略时间'
            },
            {
                id: 1,
                name: '策略范围'
            }
        ];
        this.sub_navs = [{
                id: 0,
                name: '节假日时间'
            },
            {
                id: 1,
                name: '工作日时间'
            }
        ];
        this.nav_index = 0; // 菜单索引
        this.strategyList = []; // 从接口获取的策略列表
        this.ruleList = []; // 规则集合
        this.dateList = []; // 日期策略
        this.holidayList = []; // 节假日策略
        this.workdayList = []; // 工作时间策略
        this.rangeListItems = []; // 规则集合
        this.regionList = []; // 策略所覆盖的区域ID集合
        this.strategy_index = 0; // 策略索引
        this.rule_index = 0; // 策略索引
        this.model = {}; // 存储数据
        this.brightness = 30; // 亮度
        this.workday_start_time = { hour: 6, minute: 30 }; // 工作日时间
        this.workday_end_time = { hour: 23, minute: 30 }; // 工作日时间
        this.workday_start_brightness = 30; // 亮度
        this.end_brightness = 0;
        this.holiday_start_time = { hour: 6, minute: 30 }; // 工作日时间
        this.holiday_end_time = { hour: 23, minute: 30 }; // 工作日时间
        this.holiday_start_brightness = 30; // 亮度
        this.step = 1; // 步骤
        this.nodeParentList = [];
        // hoveredDate: NgbDate;
        // fromDate: NgbDate;
        // toDate: NgbDate;
        this.isLinear = false; // 步骤
        this.page = 1; // 分页
        this.pageSize = 10; // 分页
        this.allCheck = true; // 全选
        this.regionbody = []; // 策略覆盖区域body
        this.setRegionMess = false; // 下发策略
        this.alerts = []; // 信息弹框
        this.alertsModal = []; // 信息弹框
        this.isHovered = function (date) { return _this.fromDate && !_this.toDate && _this.hoveredDate && after(date, _this.fromDate) && before(date, _this.hoveredDate); };
        this.isInside = function (date) { return after(date, _this.fromDate) && before(date, _this.toDate); };
        this.isFrom = function (date) { return equals(date, _this.fromDate); };
        this.isTo = function (date) { return equals(date, _this.toDate); };
        // isHovered = (date: NgbDateStruct) =>
        //   this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
        // isInside = (date: NgbDateStruct) =>
        //   date.after(this.fromDate) && date.before(this.toDate)
        this.isRange = function (date) {
            return equals(date, _this.fromDate) || equals(date, _this.toDate) || _this.isInside(date) || _this.isHovered(date);
        };
        this.fromDate = calendar.getToday(); // 日历
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 10); // 日历
        config.spinners = false; // 时间控制
        // this.dateList = this.strategyList[0].dateList;
        // 树的操作
        // 点击
        var that = this;
        this.zTreeOnClick = function (event, treeId, treeNode) {
            that.currentTreeNodeId = treeNode.id;
            that.getRegionLights(treeNode.id);
        };
        this.zTreeOnCheck = function (event, treeId, treeNode) {
            // 获取当前被勾选的节点集合
            that.regionbody = [];
            var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
            var nodes = treeObj.getCheckedNodes(true);
            console.log(nodes);
            if (nodes.length > 0) {
                nodes.map(function (item, i) {
                    var isParent = item.isParent;
                    if (!isParent) {
                        that.regionbody.push({
                            'allDevices': true,
                            'deviceIds': [
                                0
                            ],
                            'regionId': item.id
                        });
                    }
                });
            }
        };
    }
    ThestrategyComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    ThestrategyComponent.prototype.reset = function () {
        this.alerts = this.backup.map(function (alert) { return Object.assign({}, alert); });
    };
    ThestrategyComponent.prototype.ngOnInit = function () {
        this.getStrategyList();
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', forms_1.Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', forms_1.Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
            thirdCtrl: ['', forms_1.Validators.required]
        });
        this.getZoneDefault(); // 获取城市
    };
    // 获取策略表
    ThestrategyComponent.prototype.getStrategyList = function () {
        var that = this;
        this.strategyService.getStrategy().subscribe({
            next: function (val) {
                that.strategyList = val;
                that.currentStrategy = that.currentStrategy || val[0];
            },
            complete: function () {
                that.getRules(that.currentStrategy);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 点击策略及初始化时调用
    ThestrategyComponent.prototype.getRules = function (item) {
        var that = this;
        var strategyId = item.id;
        this.strategyService.getRules(strategyId).subscribe({
            next: function (val) {
                that.ruleList = val;
            },
            complete: function () {
                that.selectRule(that.ruleList[0], 0);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 在左侧中点击一策略
    ThestrategyComponent.prototype.selectStrategy = function (item, index) {
        // 策略范围视图下切换策略，会回到策略时间视图
        if (this.nav_index === 1) {
            this.nav_index = 0;
        }
        this.strategy_index = index;
        this.strategy_item = item;
        var that = this;
        // this.currentRule = []; // 切换到其他策略时，当前所选规则置空
        this.currentStrategy = item;
        this.getRules(item);
    };
    // 点击一个规则
    ThestrategyComponent.prototype.selectRule = function (item, i) {
        this.currentRule = item;
        this.getWorkdayList(item);
        this.rule_index = i;
    };
    // 获取工作日中间段时间
    ThestrategyComponent.prototype.getWorkdayList = function (rule) {
        this.workdayList = [];
        this.holidayList = [];
        if (!rule) {
            return;
        }
        var len = rule.workdayRules && rule.workdayRules.length;
        var len1 = rule.holidayRules && rule.holidayRules.length;
        if (len > 2) {
            this.workdayList = rule.workdayRules.slice(1, len - 1);
        }
        if (len1 > 2) {
            this.holidayList = rule.holidayRules.slice(1, len1 - 1);
        }
    };
    // 添加策略弹框操作
    ThestrategyComponent.prototype.openAddStrategy = function (content) {
        var _this = this;
        // 初始参数
        var that = this;
        var modal = this.modalService.open(content, { size: 'sm' });
        this.mr = modal;
        this.strategyName = '';
        modal.result.then(function (result) {
            console.log('strategy--add');
            that.addStrategy(); // 接口处-添加策略
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    // 接口处-添加策略
    ThestrategyComponent.prototype.addStrategy = function () {
        var that = this;
        this.strategyService.addStrategy(this.strategyName).subscribe({
            next: function (val) {
                that.getStrategyList(); // 重新获取策略
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '添加成功！',
                });
            },
            complete: function () {
            },
            error: function (error) {
                var message = error.error.errors[0].defaultMessage;
                that.alerts.push({
                    id: 1,
                    type: 'danger',
                    message: "\u6DFB\u52A0\u5931\u8D25: " + message + "\uFF01",
                });
            }
        });
    };
    // 更新策略-弹框操作
    ThestrategyComponent.prototype.openUpdataStrategy = function (content, item, index) {
        var _this = this;
        var that = this;
        var modal = this.modalService.open(content, { size: 'sm' });
        this.mr = modal;
        this.strategyName = item.name;
        modal.result.then(function (result) {
            console.log('strategy -updata');
            that.updateStrategy(item.id, that.strategyName); // 接口处-更新策略
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    // 接口处-更新策略
    ThestrategyComponent.prototype.updateStrategy = function (id, name) {
        var that = this;
        this.strategyService.updateStrategy(id, name).subscribe({
            next: function (val) {
                that.currentStrategy.name = name;
                that.getStrategyList(); // 重新获取策略
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '更新成功！',
                });
            },
            complete: function () {
            },
            error: function (error) {
                var message = error.error.errors[0].defaultMessage;
                that.alerts.push({
                    id: 1,
                    type: 'danger',
                    message: "\u66F4\u65B0\u5931\u8D25: " + message + "\uFF01",
                });
            }
        });
    };
    // 删除策略弹框
    ThestrategyComponent.prototype.openDelStrategy = function (content, item, i) {
        var that = this;
        this.strategy_del_id = item.id;
        this.strategy_del_index = i;
        var modal = this.modalService.open(content, { size: 'sm' });
        this.mr = modal;
    };
    // 删除策略
    ThestrategyComponent.prototype.closeDelStrategy = function ($event) {
        console.log($event);
        if ($event === 'ok') {
            this.delStrategy();
        }
        this.mr.close();
    };
    // 接口处-删除策略
    ThestrategyComponent.prototype.delStrategy = function () {
        var index = this.strategy_del_index;
        this.strategyList.splice(index, 1);
        var that = this;
        var id = this.strategy_del_id;
        this.strategyService.delStrategy(id).subscribe({
            next: function (val) {
                that.strategy_index = 0;
                that.currentStrategy = null;
                that.getStrategyList(); // 重新获取策略
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '删除成功！',
                });
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
                var message = error.error.errors[0].defaultMessage;
                that.alerts.push({
                    id: 1,
                    type: 'danger',
                    message: "\u5220\u9664\u5931\u8D25: " + message + "\uFF01",
                });
            }
        });
    };
    // 打开添加规则-弹框操作
    ThestrategyComponent.prototype.openAddRule = function (content) {
        var _this = this;
        this.step = 1;
        this.workday_start_time = { hour: 6, minute: 30 }; // 工作日时间
        this.workday_end_time = { hour: 23, minute: 30 }; // 工作日时间
        this.workday_start_time1 = null; // 工作日时间
        this.workday_start_time2 = null; // 工作日时间
        this.workday_start_time3 = null; // 工作日时间
        this.workday_start_brightness = 30; // 亮度
        this.workday_start_brightness1 = null; // 亮度
        this.workday_start_brightness2 = null; // 亮度
        this.workday_start_brightness3 = null; // 亮度
        this.end_brightness = 0;
        this.holiday_start_time = { hour: 6, minute: 30 }; // 工作日时间
        this.holiday_end_time = { hour: 23, minute: 30 }; // 工作日时间
        this.holiday_start_time1 = null; // 工作日时间
        this.holiday_start_time2 = null; // 工作日时间
        this.holiday_start_time3 = null; // 工作日时间
        this.holiday_start_brightness = 30; // 亮度
        this.holiday_start_brightness1 = null; // 亮度
        this.holiday_start_brightness2 = null; // 亮度
        this.holiday_start_brightness3 = null; // 亮度
        var that = this;
        var modal = this.modalService.open(content, { size: 'lg' });
        this.mr = modal;
        modal.result.then(function (result) {
            console.log('rule-add');
            that.addRules(); // 接口处-添加策略
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    // 添加策略规则
    ThestrategyComponent.prototype.addRules = function () {
        var that = this;
        var item = this.currentStrategy;
        var id = this.currentStrategy.id;
        var start = {
            day: this.fromDate.day,
            month: this.fromDate.month
        };
        var toDate = this.toDate ? this.toDate : this.fromDate;
        var end = {
            day: toDate.day,
            month: toDate.month
        };
        var workdayRules = [];
        var holidayRules = [];
        if (this.workday_start_time && this.workday_start_brightness) {
            workdayRules.push({
                'lightLevel': this.workday_start_brightness,
                'smart': true,
                'start': this.workday_start_time
            });
            if (this.workday_start_time1 && this.workday_start_time1.hour && this.workday_start_time1.minute && this.workday_start_brightness1) {
                workdayRules.push({
                    'lightLevel': this.workday_start_brightness1,
                    'smart': true,
                    'start': this.workday_start_time1
                });
            }
            if (this.workday_start_time2 && this.workday_start_time2.hour && this.workday_start_time2.minute && this.workday_start_brightness2) {
                workdayRules.push({
                    'lightLevel': this.workday_start_brightness2,
                    'smart': true,
                    'start': this.workday_start_time2
                });
            }
            if (this.workday_start_time3 && this.workday_start_time3.hour && this.workday_start_time3.minute && this.workday_start_brightness3) {
                workdayRules.push({
                    'lightLevel': this.workday_start_brightness3,
                    'smart': true,
                    'start': this.workday_start_time3
                });
            }
            if (this.workday_end_time && this.workday_end_time.hour && this.workday_end_time.minute) {
                workdayRules.push({
                    'lightLevel': this.end_brightness,
                    'smart': true,
                    'start': this.workday_end_time
                });
            }
        }
        if (this.holiday_start_time && this.holiday_start_brightness) {
            holidayRules.push({
                'lightLevel': this.holiday_start_brightness,
                'smart': true,
                'start': this.holiday_start_time
            });
            if (this.holiday_start_time1 && this.holiday_start_brightness1) {
                holidayRules.push({
                    'lightLevel': this.holiday_start_brightness1,
                    'smart': true,
                    'start': this.holiday_start_time1
                });
            }
            if (this.holiday_start_time2 && this.holiday_start_brightness2) {
                holidayRules.push({
                    'lightLevel': this.holiday_start_brightness2,
                    'smart': true,
                    'start': this.holiday_start_time2
                });
            }
            if (this.holiday_start_time3 && this.holiday_start_brightness3) {
                holidayRules.push({
                    'lightLevel': this.holiday_start_brightness3,
                    'smart': true,
                    'start': this.holiday_start_time3
                });
            }
            if (this.holiday_end_time) {
                holidayRules.push({
                    'lightLevel': this.end_brightness,
                    'smart': true,
                    'start': this.holiday_end_time
                });
            }
        }
        this.strategyService.addRules(id, start, end, workdayRules, holidayRules).subscribe({
            next: function (val) {
                // that.selectStrategy(item, i); // 重新获取策略
                that.getRules(item);
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 打开更新规则-弹框操作
    ThestrategyComponent.prototype.openUpdataRule = function (content, item, index) {
        var _this = this;
        this.step = 1;
        var currentRule = this.currentRule;
        // 初始参数
        this.workday_start_time = currentRule.workdayRules && currentRule.workdayRules[0] && currentRule.workdayRules[0].start; // 工作日时间
        var len = currentRule.workdayRules.length;
        this.workday_end_time = currentRule.workdayRules && currentRule.workdayRules[len - 1] &&
            currentRule.workdayRules[len - 1].start; // 工作日时间
        if (len === 3) {
            this.workday_start_time1 = currentRule.workdayRules && currentRule.workdayRules[1] && currentRule.workdayRules[1].start; // 工作日时间
            this.workday_start_brightness1 = currentRule.workdayRules &&
                currentRule.workdayRules[1] && currentRule.workdayRules[1].lightLevel; // 亮度
        }
        else if (len === 4) {
            this.workday_start_time1 = currentRule.workdayRules && currentRule.workdayRules[1] && currentRule.workdayRules[1].start; // 工作日时间
            this.workday_start_time2 = currentRule.workdayRules && currentRule.workdayRules[2] && currentRule.workdayRules[2].start; // 工作日时间
            this.workday_start_brightness1 = currentRule.workdayRules &&
                currentRule.workdayRules[1] && currentRule.workdayRules[1].lightLevel; // 亮度
            this.workday_start_brightness2 = currentRule.workdayRules &&
                currentRule.workdayRules[2] && currentRule.workdayRules[2].lightLevel; // 亮度
        }
        else if (len === 5) {
            this.workday_start_time1 = currentRule.workdayRules && currentRule.workdayRules[1] && currentRule.workdayRules[1].start; // 工作日时间
            this.workday_start_time2 = currentRule.workdayRules && currentRule.workdayRules[2] && currentRule.workdayRules[2].start; // 工作日时间
            this.workday_start_time3 = currentRule.workdayRules && currentRule.workdayRules[2] && currentRule.workdayRules[3].start; // 工作日时间
            this.workday_start_brightness1 = currentRule.workdayRules &&
                currentRule.workdayRules[1] && currentRule.workdayRules[1].lightLevel; // 亮度
            this.workday_start_brightness2 = currentRule.workdayRules &&
                currentRule.workdayRules[2] && currentRule.workdayRules[2].lightLevel; // 亮度
            this.workday_start_brightness3 = currentRule.workdayRules &&
                currentRule.workdayRules[3] && currentRule.workdayRules[3].lightLevel; // 亮度
        }
        this.workday_start_brightness = currentRule.workdayRules && currentRule.workdayRules[0] && currentRule.workdayRules[0].lightLevel; // 亮度
        this.end_brightness = 0;
        this.holiday_start_time = currentRule.holidayRules && currentRule.holidayRules[0] && currentRule.holidayRules[0].start; // 工作日时间
        var len1 = currentRule.holidayRules.length;
        this.holiday_end_time = currentRule.holidayRules && currentRule.holidayRules[len1 - 1] &&
            currentRule.holidayRules[len1 - 1].start; // 工作日时间
        if (len1 === 3) {
            this.holiday_start_time1 = currentRule.holidayRules && currentRule.holidayRules[1] && currentRule.holidayRules[1].start; // 工作日时间
            this.holiday_start_brightness1 = currentRule.holidayRules &&
                currentRule.holidayRules[1] && currentRule.holidayRules[1].lightLevel; // 亮度
        }
        else if (len1 === 4) {
            this.holiday_start_time1 = currentRule.holidayRules && currentRule.holidayRules[1] && currentRule.holidayRules[1].start; // 工作日时间
            this.holiday_start_time2 = currentRule.holidayRules && currentRule.holidayRules[2] && currentRule.holidayRules[2].start; // 工作日时间
            this.holiday_start_brightness1 = currentRule.holidayRules &&
                currentRule.holidayRules[1] && currentRule.holidayRules[1].lightLevel; // 亮度
            this.holiday_start_brightness2 = currentRule.holidayRules &&
                currentRule.holidayRules[2] && currentRule.holidayRules[2].lightLevel; // 亮度
        }
        else if (len1 === 5) {
            this.holiday_start_time1 = currentRule.holidayRules && currentRule.holidayRules[1] && currentRule.holidayRules[1].start; // 工作日时间
            this.holiday_start_time2 = currentRule.holidayRules && currentRule.holidayRules[2] && currentRule.holidayRules[2].start; // 工作日时间
            this.holiday_start_time3 = currentRule.holidayRules && currentRule.holidayRules[3] && currentRule.holidayRules[3].start; // 工作日时间
            this.holiday_start_brightness1 = currentRule.holidayRules &&
                currentRule.holidayRules[1] && currentRule.holidayRules[1].lightLevel; // 亮度
            this.holiday_start_brightness2 = currentRule.holidayRules &&
                currentRule.holidayRules[2] && currentRule.holidayRules[2].lightLevel; // 亮度
            this.holiday_start_brightness3 = currentRule.holidayRules &&
                currentRule.holidayRules[3] && currentRule.holidayRules[3].lightLevel; // 亮度
        }
        this.holiday_start_brightness = currentRule.holidayRules &&
            currentRule.holidayRules[0] && currentRule.holidayRules[0].lightLevel; // 亮度
        var that = this;
        var modal = this.modalService.open(content, { size: 'lg' });
        this.mr = modal;
        modal.result.then(function (result) {
            console.log('rule-add');
            that.updataRules(item); // 接口处-添加策略
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    // 添加更新策略规则
    ThestrategyComponent.prototype.updataRules = function (item) {
        var that = this;
        var currentStrategy = this.currentStrategy;
        var id = this.currentStrategy.id;
        var start = {
            day: this.fromDate.day,
            month: this.fromDate.month
        };
        var toDate = this.toDate ? this.toDate : this.fromDate;
        var end = {
            day: toDate.day,
            month: toDate.month
        };
        var workdayRules = [];
        var holidayRules = [];
        if (this.workday_start_time && this.workday_start_brightness) {
            workdayRules.push({
                'lightLevel': this.workday_start_brightness,
                'smart': true,
                'start': this.workday_start_time
            });
            if (this.workday_start_time1 && this.workday_start_brightness1) {
                workdayRules.push({
                    'lightLevel': this.workday_start_brightness1,
                    'smart': true,
                    'start': {
                        hour: this.workday_start_time1.hour,
                        minute: this.workday_start_time1.minute
                    }
                });
            }
            if (this.workday_start_time2 && this.workday_start_brightness2) {
                workdayRules.push({
                    'lightLevel': this.workday_start_brightness2,
                    'smart': true,
                    'start': {
                        hour: this.workday_start_time2.hour,
                        minute: this.workday_start_time2.minute
                    }
                });
            }
            if (this.workday_start_time3 && this.workday_start_brightness3) {
                workdayRules.push({
                    'lightLevel': this.workday_start_brightness3,
                    'smart': true,
                    'start': {
                        hour: this.workday_start_time3.hour,
                        minute: this.workday_start_time3.minute
                    }
                });
            }
            if (this.workday_end_time) {
                workdayRules.push({
                    'lightLevel': this.end_brightness,
                    'smart': true,
                    'start': this.workday_end_time
                });
            }
        }
        if (this.holiday_start_time && this.holiday_start_brightness) {
            holidayRules.push({
                'lightLevel': this.holiday_start_brightness,
                'smart': true,
                'start': this.holiday_start_time
            });
            if (this.holiday_start_time1 && this.holiday_start_brightness1) {
                holidayRules.push({
                    'lightLevel': this.holiday_start_brightness1,
                    'smart': true,
                    'start': {
                        hour: this.holiday_start_time1.hour,
                        minute: this.holiday_start_time1.minute
                    }
                });
            }
            if (this.holiday_start_time2 && this.holiday_start_brightness2) {
                holidayRules.push({
                    'lightLevel': this.holiday_start_brightness2,
                    'smart': true,
                    'start': {
                        hour: this.holiday_start_time2.hour,
                        minute: this.holiday_start_time2.minute
                    }
                });
            }
            if (this.holiday_start_time3 && this.holiday_start_brightness3) {
                holidayRules.push({
                    'lightLevel': this.holiday_start_brightness3,
                    'smart': true,
                    'start': {
                        hour: this.holiday_start_time3.hour,
                        minute: this.holiday_start_time3.minute
                    }
                });
            }
            if (this.holiday_end_time) {
                holidayRules.push({
                    'lightLevel': this.end_brightness,
                    'smart': true,
                    'start': this.holiday_end_time
                });
            }
        }
        this.strategyService.updataRules(id, item.id, start, end, workdayRules, holidayRules).subscribe({
            next: function (val) {
                // that.selectStrategy(item, i); // 重新获取策略
                that.getRules(currentStrategy);
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 删除策略规则弹框
    ThestrategyComponent.prototype.openDelRule = function (content, item, i) {
        this.strategy_rule_del_id = item.id;
        this.strategy_rule_del_index = i;
        var modal = this.modalService.open(content, { size: 'sm' });
        this.mr = modal;
    };
    // 删除策略规则
    ThestrategyComponent.prototype.closeDelRule = function ($event) {
        console.log($event);
        if ($event === 'ok') {
            this.delRule();
        }
        this.mr.close();
    };
    // 接口处-删除策略
    ThestrategyComponent.prototype.delRule = function () {
        var that = this;
        var index = this.strategy_rule_del_index;
        this.ruleList.splice(index, 1);
        var id = this.currentStrategy.id;
        var rule_data_id = this.strategy_rule_del_id;
        this.strategyService.delRule(id, rule_data_id).subscribe({
            next: function (val) {
                // that.strategy_index = 0;
                that.getRules(that.currentStrategy); // 重新获取策略
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 关闭弹框
    ThestrategyComponent.prototype.colseModal = function () {
        this.mr.close();
    };
    // 下一步
    ThestrategyComponent.prototype.nextStep = function () {
        this.step = this.step + 1;
    };
    // 上一步
    ThestrategyComponent.prototype.preStep = function () {
        this.step = this.step - 1;
    };
    ThestrategyComponent.prototype.onDateSelection = function (date) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        }
        else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
            this.toDate = date;
        }
        else {
            this.toDate = null;
            this.fromDate = date;
        }
        if (this.fromDate !== null && this.toDate !== null) {
            console.log('from :' + this.fromDate.day);
            console.log('to :' + this.toDate.day);
            // const fromStr = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
            // const toStr = this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day;
        }
    };
    // 按钮响应事件
    ThestrategyComponent.prototype.showDatepicker = function (d) {
        d.toggle();
    };
    ThestrategyComponent.prototype.getDismissReason = function (reason) {
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
    // 切换菜单项-策略时间- 策略范围
    ThestrategyComponent.prototype.changeNav = function (index) {
        this.nav_index = index;
        if (index === 1) {
            this.getZtreeRegion();
        }
    };
    ThestrategyComponent.prototype.setZtreeNode = function () {
        var _this = this;
        var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
        this.regionList.map(function (item) {
            var node = treeObj.getNodeByParam('id', item.regionId, null);
            if (node) {
                treeObj.checkNode(node, true, true);
                _this.findParent(node.getParentNode());
            }
        });
    };
    ThestrategyComponent.prototype.findParent = function (node) {
        var p = node.getParentNode();
        if (p && !p.open) {
            console.log(444);
            p.open = true;
        }
    };
    // 获取策略所覆盖的区域集合
    ThestrategyComponent.prototype.getZtreeRegion = function () {
        var that = this;
        this.strategyService.getZtreeRegion(this.currentStrategy.id).subscribe({
            next: function (val) {
                that.regionList = val;
                console.log(val);
            },
            complete: function () {
                that.getZoneTree();
                that.setZtreeNode();
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 策略范围-策略下发
    //
    //
    // 获取城市列表
    ThestrategyComponent.prototype.getZoneTree = function () {
        // const that = this;
        var setting = {
            view: {
                selectedMulti: true
            },
            check: {
                enable: true,
                chkStyle: 'checkbox',
                chkboxType: { 'Y': 'ps', 'N': 'ps' }
            },
            callback: {
                onClick: this.zTreeOnClick,
                onCheck: this.zTreeOnCheck // 勾选事件
            }
        };
        var zNodes = this.zNodes;
        this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, zNodes);
    };
    // 接口处-删除策略
    ThestrategyComponent.prototype.getRegionLights = function (id) {
        var that = this;
        var page = this.page;
        var pageSize = this.pageSize;
        this.strategyService.getRegionLights(id, page, pageSize).subscribe({
            next: function (val) {
                that.rangeList = val;
                that.rangeListItems = val.items;
                that.total = val.total; // 分页
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 获取城市列表
    ThestrategyComponent.prototype.getZoneDefault = function () {
        var that = this;
        this.strategyService.getZoneDefault()
            .subscribe({
            next: function (res) {
                that.model.ZoneDefault = res;
                that.zNodes = res.regions;
                that.zNodes['open'] = true;
                var id = that.currentTreeNodeId = res.regions[0].id;
                that.getRegionLights(id);
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 下发策略
    ThestrategyComponent.prototype.setRegion = function () {
        var that = this;
        var body = this.regionbody;
        var ruleId = this.currentStrategy.id;
        this.strategyService.setRegion(ruleId, body)
            .subscribe({
            next: function (res) {
                console.log('ok!');
                that.setRegionMess = true;
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 分页
    ThestrategyComponent.prototype.pageChange = function () {
        var id = this.currentTreeNodeId;
        this.getRegionLights(id);
    };
    // 路由跳转
    ThestrategyComponent.prototype.jumpHandle = function (url) {
        this.router.navigate([url]);
    };
    __decorate([
        core_1.ViewChild('map2'),
        __metadata("design:type", core_1.ElementRef)
    ], ThestrategyComponent.prototype, "map_container", void 0);
    __decorate([
        core_1.ViewChild('map3'),
        __metadata("design:type", core_1.ElementRef)
    ], ThestrategyComponent.prototype, "map_container3", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ThestrategyComponent.prototype, "alerts", void 0);
    ThestrategyComponent = __decorate([
        core_1.Component({
            selector: 'app-thestrategy',
            templateUrl: './thestrategy.component.html',
            styleUrls: ['./thestrategy.component.scss']
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal, strategy_service_1.StrategyService,
            core_1.ElementRef, router_1.Router,
            ng_bootstrap_2.NgbCalendar,
            forms_1.FormBuilder,
            ng_bootstrap_3.NgbTimepickerConfig])
    ], ThestrategyComponent);
    return ThestrategyComponent;
}());
exports.ThestrategyComponent = ThestrategyComponent;
//# sourceMappingURL=thestrategy.component.js.map