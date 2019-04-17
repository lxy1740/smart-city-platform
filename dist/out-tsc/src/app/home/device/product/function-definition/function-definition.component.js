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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var router_1 = require("@angular/router");
var type_data_1 = require("../../../../data/type-data");
var unit_data_1 = require("../../../../data/unit-data");
var function_definition_1 = require("../../../../service/function-definition");
var FunctionDefinitionComponent = /** @class */ (function () {
    function FunctionDefinitionComponent(modalService, router, routerinfo, functionDefinitionService) {
        this.modalService = modalService;
        this.router = router;
        this.routerinfo = routerinfo;
        this.functionDefinitionService = functionDefinitionService;
        this.dataModel = {}; // 数据定义数据
        this.functionModel = {}; // 服务定义数据
        this.deviceParams = {}; // 设备信息
        this.TYPEDATA1 = type_data_1.TYPEDATA; // 数据类型
        this.UNITDATA1 = unit_data_1.UNITDATA; // 单位
        this.TYPEDATA2 = type_data_1.TYPEDATA1; // 数据类型
        this.dataListItems = []; // 数据定义数据列表
        this.functionListItems = []; // 服务定义数据列表
        this.total = 1; // 分页
        this.page = 1; // 分页
        this.modelData = {
            title: '删除',
        };
        this.navs = [
            {
                id: 0,
                name: '数据定义'
            },
            {
                id: 1,
                name: '服务定义'
            }
        ];
        this.nav_index = 0; // 菜单索引
        this.AddParamModel = {}; // 新增参数窗口数据
        this.AddParam = []; // 新增参数窗口
        this.messageIssue = {};
        this.addorupdate = '添加数据定义';
        this.delDataItemFlag = 'property';
        this.alerts = []; // 信息弹框
        this.alertsModal = []; // 信息弹框
        // 1 数据定义弹框
        this.dataModel.readOnly = false; // 读写
        this.dataModel.dataType = this.TYPEDATA1[0]; // 数据类型
        this.dataModel.unit = this.UNITDATA1[0]; // int参数
        this.dataModel.enums = []; // BOOL参数
        this.dataModel.BOOL = {}; // BOOL参数
        this.dataModel.dataLength = 1024; // TEXT参数
        // 2、添加参数弹框
        this.AddParamModel.dataType = this.TYPEDATA2[0]; // 新增参数窗口数据类型
        this.AddParamModel.unit = this.UNITDATA1[0]; // 单位{  // int参数
        this.AddParamModel.enums = []; // BOOL参数
        this.AddParamModel.BOOL = {}; // BOOL参数
        this.AddParamModel.dataLength = 1024; // TEXT参数
        // 3.服务定义弹框
        this.functionModel.synchrony = 1; // 异步同步 调用方式
        this.functionModel.param = []; // 参数列表
        this.functionModel.inputparam = []; // 输入参数列表
        this.functionModel.outputparam = []; // 输出参数列表
    }
    FunctionDefinitionComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    FunctionDefinitionComponent.prototype.closeAlertModal = function (alert) {
        var index = this.alertsModal.indexOf(alert);
        this.alertsModal.splice(index, 1);
    };
    FunctionDefinitionComponent.prototype.reset = function () {
        this.alerts = this.backup.map(function (alert) { return Object.assign({}, alert); });
    };
    FunctionDefinitionComponent.prototype.ngOnInit = function () {
        this.deviceParams = JSON.parse(this.routerinfo.snapshot.params.param);
        console.log(this.deviceParams);
        this.getProperty();
        this.getService();
    };
    // 获取数据定义
    FunctionDefinitionComponent.prototype.getProperty = function () {
        var that = this;
        var id = this.deviceParams.id;
        this.functionDefinitionService.getProperty(id).subscribe({
            next: function (val) {
                console.log(val);
                that.dataListItems = val;
            },
            error: function (error) {
                console.log(error);
                // const message = error.error.errors[0].defaultMessage;
                that.messageIssue = error.error.errors[0];
                // that.alerts.push({
                //   id: 1,
                //   type: 'danger',
                //   message: `${message}！`,
                // });
            }
        });
    };
    // 删除数据定义
    FunctionDefinitionComponent.prototype.delProperty = function () {
        var that = this;
        var id = this.delDataItemId;
        this.functionDefinitionService.delProperty(id).subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: "\u5220\u9664\u6210\u529F\uFF01",
                });
            },
            complete: function () {
                that.getProperty();
            },
            error: function (error) {
                console.log(error);
                var message = error.error.errors[0].defaultMessage;
                that.alerts.push({
                    id: 1,
                    type: 'danger',
                    message: "\u5220\u9664\u5931\u8D25\uFF1A" + message + "\uFF01",
                });
            }
        });
    };
    // 获取服务定义
    FunctionDefinitionComponent.prototype.getService = function () {
        var that = this;
        var id = this.deviceParams.id;
        this.functionDefinitionService.getService(id).subscribe({
            next: function (val) {
                console.log(val);
                that.functionListItems = val;
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
                // const message = error.error.errors[0].defaultMessage;
                that.messageIssue = error.error.errors[0];
                // that.alerts.push({
                //   id: 1,
                //   type: 'danger',
                //   message: `${message}！`,
                // });
            }
        });
    };
    //    // 添加数据定义
    FunctionDefinitionComponent.prototype.addProperty = function () {
        var that = this;
        if (!this.dataModel.name) {
            that.alertsModal.push({
                id: 1,
                type: 'danger',
                message: "\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\uFF01",
            });
            return;
        }
        else if (!this.dataModel.dataKey) {
            that.alertsModal.push({
                id: 1,
                type: 'danger',
                message: "\u6807\u8BC6\u7B26\u4E0D\u80FD\u4E3A\u7A7A\uFF01",
            });
            return;
        }
        var body;
        switch (this.dataModel.dataType.Value.toLowerCase()) {
            case 'int':
            case 'float':
            case 'double':
                body = {
                    // 'dataLength': this.dataModel.dataLength,
                    'dataMax': this.dataModel.dataMax,
                    'dataMin': this.dataModel.dataMin,
                    'unit': this.dataModel.unit.Symbol,
                    'dataType': this.dataModel.dataType.Value,
                    // 'id': 0,
                    'dataKey': this.dataModel.dataKey,
                    'modelId': this.deviceParams.id,
                    'name': this.dataModel.name,
                    'readOnly': this.dataModel.readOnly,
                    'resolution': this.dataModel.resolution,
                    'describe': this.dataModel.describe,
                };
                break;
            case 'date':
                body = {
                    // 'dataLength': this.dataModel.dataLength,
                    // 'dataMax': this.dataModel.dataMax,
                    // 'dataMin': this.dataModel.dataMin,
                    // 'unit': this.dataModel.unit.Symbol,
                    'dataType': this.dataModel.dataType.Value,
                    // 'id': 0,
                    'dataKey': this.dataModel.dataKey,
                    'modelId': this.deviceParams.id,
                    'name': this.dataModel.name,
                    'readOnly': this.dataModel.readOnly,
                    // 'resolution': this.dataModel.resolution,
                    'describe': this.dataModel.describe,
                };
                break;
            case 'text':
                body = {
                    'dataLength': this.dataModel.dataLength,
                    // 'dataMax': this.dataModel.dataMax,
                    // 'dataMin': this.dataModel.dataMin,
                    // 'unit': this.dataModel.unit.Symbol,
                    'dataType': this.dataModel.dataType.Value,
                    // 'id': 0,
                    'dataKey': this.dataModel.dataKey,
                    'modelId': this.deviceParams.id,
                    'name': this.dataModel.name,
                    'readOnly': this.dataModel.readOnly,
                    // 'resolution': this.dataModel.resolution,
                    'describe': this.dataModel.describe,
                };
                break;
            case 'bool':
                var enums = [];
                enums.push({ name: this.dataModel.BOOL.no, value: 0 });
                enums.push({ name: this.dataModel.BOOL.yes, value: 1 });
                body = {
                    // 'dataLength': this.dataModel.dataLength,
                    // 'dataMax': this.dataModel.dataMax,
                    // 'dataMin': this.dataModel.dataMin,
                    // 'unit': this.dataModel.unit.Symbol,
                    'dataType': this.dataModel.dataType.Value,
                    // 'id': 0,
                    'dataKey': this.dataModel.dataKey,
                    'modelId': this.deviceParams.id,
                    'name': this.dataModel.name,
                    'readOnly': this.dataModel.readOnly,
                    // 'resolution': this.dataModel.resolution,
                    // 'describe': this.dataModel.describe,
                    'enums': enums
                };
                break;
            default:
                break;
        }
        this.functionDefinitionService.addProperty(body).subscribe({
            next: function (val) {
                console.log(val);
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '数据添加成功！',
                });
                that.mr.close();
            },
            complete: function () {
                that.getProperty();
            },
            error: function (error) {
                console.log(error);
                var message = error.error.errors[0].defaultMessage;
                that.alertsModal.push({
                    id: 1,
                    type: 'danger',
                    message: message + "\uFF01",
                });
            }
        });
    };
    //    // 修改数据定义
    FunctionDefinitionComponent.prototype.updateProperty = function () {
        var that = this;
        if (!this.dataModel.name) {
            that.alertsModal.push({
                id: 1,
                type: 'danger',
                message: "\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\uFF01",
            });
            return;
        }
        else if (!this.dataModel.dataKey) {
            that.alertsModal.push({
                id: 1,
                type: 'danger',
                message: "\u6807\u8BC6\u7B26\u4E0D\u80FD\u4E3A\u7A7A\uFF01",
            });
            return;
        }
        var body;
        switch (this.dataModel.dataType.Value.toLowerCase()) {
            case 'int':
            case 'float':
            case 'double':
                body = {
                    'dataMax': this.dataModel.dataMax,
                    'dataMin': this.dataModel.dataMin,
                    'unit': this.dataModel.unit.Symbol,
                    'dataType': this.dataModel.dataType.Value,
                    'id': this.dataModel.updateId,
                    'dataKey': this.dataModel.dataKey,
                    'modelId': this.deviceParams.id,
                    'name': this.dataModel.name,
                    'readOnly': this.dataModel.readOnly,
                    'resolution': this.dataModel.resolution,
                    'describe': this.dataModel.describe,
                };
                break;
            case 'date':
                body = {
                    'dataType': this.dataModel.dataType.Value,
                    'id': this.dataModel.updateId,
                    'dataKey': this.dataModel.dataKey,
                    'modelId': this.deviceParams.id,
                    'name': this.dataModel.name,
                    'readOnly': this.dataModel.readOnly,
                    'describe': this.dataModel.describe,
                };
                break;
            case 'text':
                body = {
                    'dataLength': this.dataModel.dataLength,
                    'dataType': this.dataModel.dataType.Value,
                    'id': this.dataModel.updateId,
                    'dataKey': this.dataModel.dataKey,
                    'modelId': this.deviceParams.id,
                    'name': this.dataModel.name,
                    'readOnly': this.dataModel.readOnly,
                    'describe': this.dataModel.describe,
                };
                break;
            case 'bool':
                var enums = [];
                enums.push({ name: this.dataModel.BOOL.no, value: 0 });
                enums.push({ name: this.dataModel.BOOL.yes, value: 1 });
                body = {
                    'dataType': this.dataModel.dataType.Value,
                    'id': this.dataModel.updateId,
                    'dataKey': this.dataModel.dataKey,
                    'modelId': this.deviceParams.id,
                    'name': this.dataModel.name,
                    'readOnly': this.dataModel.readOnly,
                    'describe': this.dataModel.describe,
                };
                break;
            default:
                break;
        }
        this.functionDefinitionService.updateProperty(body).subscribe({
            next: function (val) {
                console.log(val);
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '数据修改成功！',
                });
                that.mr.close();
            },
            complete: function () {
                that.getProperty();
            },
            error: function (error) {
                console.log(error);
                var message = error.error.errors[0].defaultMessage;
                that.alertsModal.push({
                    id: 1,
                    type: 'danger',
                    message: message + "\uFF01",
                });
            }
        });
    };
    // 添加服务定义参数列表
    FunctionDefinitionComponent.prototype.addParam = function () {
        var that = this;
        if (!this.AddParamModel.name) {
            that.alertsModal.push({
                id: 1,
                type: 'danger',
                message: "\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\uFF01",
            });
            return;
        }
        else if (!this.AddParamModel.dataKey) {
            that.alertsModal.push({
                id: 1,
                type: 'danger',
                message: "\u6807\u8BC6\u7B26\u4E0D\u80FD\u4E3A\u7A7A\uFF01",
            });
            return;
        }
        if (!this.AddParamModel.dataType || !this.AddParamModel.dataType.Value) {
            return;
        }
        var isOutput = 'inputparam';
        if (this.AddParamModel.isOutput) {
            isOutput = 'outputparam';
        }
        switch (this.AddParamModel.dataType.Value.toLowerCase()) {
            case 'int':
            case 'float':
            case 'double':
                this.functionModel[isOutput].push({
                    'dataKey': this.AddParamModel.dataKey,
                    // 'dataLength': this.AddParamModel.dataLength,
                    'dataMax': this.AddParamModel.dataMax,
                    'dataMin': this.AddParamModel.dataMin,
                    'dataOrder': this.AddParamModel.dataOrder,
                    'dataType': this.AddParamModel.dataType.Value,
                    'dataUnit': this.AddParamModel.unit.Symbol,
                    // 'id': 0,
                    'isOutput': this.AddParamModel.isOutput,
                    // 'modelServeId': 0,
                    'name': this.AddParamModel.name
                });
                break;
            case 'date':
                this.functionModel[isOutput].push({
                    'dataKey': this.AddParamModel.dataKey,
                    // 'dataLength': this.AddParamModel.dataLength,
                    // 'dataMax': this.AddParamModel.dataMax,
                    // 'dataMin': this.AddParamModel.dataMin,
                    // 'dataUnit': this.AddParamModel.unit.Symbol,
                    'dataOrder': this.AddParamModel.dataOrder,
                    'dataType': this.AddParamModel.dataType.Value,
                    // 'id': 0,
                    'isOutput': this.AddParamModel.isOutput,
                    // 'modelServeId': 0,
                    'name': this.AddParamModel.name
                });
                break;
            case 'text':
                this.functionModel[isOutput].push({
                    'dataKey': this.AddParamModel.dataKey,
                    'dataLength': this.AddParamModel.dataLength,
                    // 'dataMax': this.AddParamModel.dataMax,
                    // 'dataMin': this.AddParamModel.dataMin,
                    // 'dataUnit': this.AddParamModel.unit.Symbol,
                    'dataOrder': this.AddParamModel.dataOrder,
                    'dataType': this.AddParamModel.dataType.Value,
                    // 'id': 0,
                    'isOutput': this.AddParamModel.isOutput,
                    // 'modelServeId': 0,
                    'name': this.AddParamModel.name
                });
                break;
            case 'bool':
                var enums = [];
                enums.push({ name: this.AddParamModel.BOOL.no, value: 0 });
                enums.push({ name: this.AddParamModel.BOOL.yes, value: 1 });
                this.functionModel[isOutput].push({
                    'dataKey': this.AddParamModel.dataKey,
                    // 'dataLength': this.AddParamModel.dataLength,
                    // 'dataMax': this.AddParamModel.dataMax,
                    // 'dataMin': this.AddParamModel.dataMin,
                    // 'dataUnit': this.AddParamModel.unit.Symbol,
                    'dataOrder': this.AddParamModel.dataOrder,
                    'dataType': this.AddParamModel.dataType.Value,
                    // 'id': 0,
                    'isOutput': this.AddParamModel.isOutput,
                    // 'modelServeId': 0,
                    'name': this.AddParamModel.name,
                    'paramEnums': enums
                });
                break;
            default:
                break;
        }
        console.log(this.functionModel.param);
        this.mr2.close();
    };
    FunctionDefinitionComponent.prototype.delParam = function (i, isOutput) {
        this.functionModel[isOutput].splice(i, 1);
    };
    // 添加服务定义
    FunctionDefinitionComponent.prototype.addService = function () {
        var that = this;
        if (!this.functionModel.name) {
            that.alertsModal.push({
                id: 1,
                type: 'danger',
                message: "\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\uFF01",
            });
            return;
        }
        else if (!this.functionModel.identifier) {
            that.alertsModal.push({
                id: 1,
                type: 'danger',
                message: "\u6807\u8BC6\u7B26\u4E0D\u80FD\u4E3A\u7A7A\uFF01",
            });
            return;
        }
        console.log(this.functionModel.inputparam);
        console.log(this.functionModel.outputparam);
        var param = this.functionModel.inputparam.concat(this.functionModel.outputparam);
        console.log(param);
        var body = {
            'description': this.functionModel.description,
            'identifier': this.functionModel.identifier,
            'modelId': this.deviceParams.id,
            'name': this.functionModel.name,
            'params': param,
            'synchrony': this.functionModel.synchrony
        };
        this.functionDefinitionService.addService(body).subscribe({
            next: function (val) {
                console.log(val);
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '服务添加成功！',
                });
                that.mr.close();
            },
            complete: function () {
                that.getService();
            },
            error: function (error) {
                console.log(error);
                var message = error.error.errors[0].defaultMessage;
                that.alertsModal.push({
                    id: 1,
                    type: 'danger',
                    message: message + "\uFF01",
                });
            }
        });
    };
    // 修改服务定义
    FunctionDefinitionComponent.prototype.updateService = function () {
        var that = this;
        if (!this.functionModel.name) {
            that.alertsModal.push({
                id: 1,
                type: 'danger',
                message: "\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\uFF01",
            });
            return;
        }
        else if (!this.functionModel.identifier) {
            that.alertsModal.push({
                id: 1,
                type: 'danger',
                message: "\u6807\u8BC6\u7B26\u4E0D\u80FD\u4E3A\u7A7A\uFF01",
            });
            return;
        }
        var param = this.functionModel.inputparam.concat(this.functionModel.outputparam);
        var body = {
            'id': this.functionModel.updateId,
            'description': this.functionModel.description,
            'identifier': this.functionModel.identifier,
            'modelId': this.deviceParams.updateId,
            'name': this.functionModel.name,
            'params': param,
            'synchrony': this.functionModel.synchrony
        };
        this.functionDefinitionService.updateService(body).subscribe({
            next: function (val) {
                console.log(val);
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '服务修改成功！',
                });
                that.mr.close();
            },
            complete: function () {
                that.getService();
            },
            error: function (error) {
                console.log(error);
                var message = error.error.errors[0].defaultMessage;
                that.alertsModal.push({
                    id: 1,
                    type: 'danger',
                    message: message + "\uFF01",
                });
            }
        });
    };
    // 删除服务定义
    FunctionDefinitionComponent.prototype.delService = function () {
        var that = this;
        var id = this.delDataItemId;
        this.functionDefinitionService.delService(id).subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: "\u5220\u9664\u6210\u529F\uFF01",
                });
            },
            complete: function () {
                that.getService();
            },
            error: function (error) {
                console.log(error);
                var message = error.error.errors[0].defaultMessage;
                that.alerts.push({
                    id: 1,
                    type: 'danger',
                    message: "\u5220\u9664\u5931\u8D25\uFF1A" + message + "\uFF01",
                });
            }
        });
    };
    FunctionDefinitionComponent.prototype.addorupdateProperty = function () {
        if (this.addorupdate === '添加数据定义') {
            this.addProperty();
        }
        else {
            this.updateProperty();
        }
    };
    FunctionDefinitionComponent.prototype.addorupdateService = function () {
        if (this.addorupdate === '添加服务定义') {
            this.addService();
        }
        else {
            this.updateService();
        }
    };
    // 删除
    FunctionDefinitionComponent.prototype.closeModal = function ($event) {
        console.log($event);
        if ($event === 'ok') {
            if (this.delDataItemFlag === 'property') {
                this.delProperty();
            }
            else {
                this.delService();
            }
        }
        this.mr.close();
    };
    // 切换菜单
    FunctionDefinitionComponent.prototype.changeNav = function (i) {
        this.nav_index = i;
    };
    // 属性页面
    FunctionDefinitionComponent.prototype.goToZheRoute = function (para) {
        var item = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            item[_i - 1] = arguments[_i];
        }
        if (item) {
            this.router.navigate([para, { param: item }]);
        }
        else {
            this.router.navigate([para]);
        }
    };
    FunctionDefinitionComponent.prototype.findTYPEDATA = function (Value) {
        if (!Value) {
            return this.TYPEDATA1[0];
        }
        return this.TYPEDATA1.find(function (n) { return n.Value.toLowerCase() === Value.toLowerCase(); });
    };
    FunctionDefinitionComponent.prototype.findTUNITDATA = function (Value) {
        if (!Value) {
            return this.UNITDATA1[0];
        }
        return this.UNITDATA1.find(function (n) { return n.Symbol === Value; });
    };
    // 修改数据定义弹框
    FunctionDefinitionComponent.prototype.openUpdataModal = function (content, item) {
        var _this = this;
        this.addorupdate = '修改数据定义';
        this.dataModel.name = item.name;
        this.dataModel.updateId = item.id;
        this.dataModel.dataKey = item.dataKey;
        this.dataModel.dataMin = item.dataMin;
        this.dataModel.dataMax = item.dataMax;
        this.dataModel.resolution = item.resolution;
        this.dataModel.readOnly = item.readOnly;
        this.dataModel.describe = item.describe;
        this.dataModel.enums = item.enums;
        this.dataModel.BOOL.no = '';
        this.dataModel.BOOL.yes = '';
        if (item.dataType === 'Bool') {
            this.dataModel.BOOL.no = item.enums[0].name;
            this.dataModel.BOOL.yes = item.enums[1].name;
        }
        this.dataModel.dataType = this.findTYPEDATA(item.dataType);
        this.dataModel.unit = this.findTUNITDATA(item.unit);
        var modal = this.modalService.open(content, { windowClass: 'myCustomModalClass' });
        this.mr = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
        });
    };
    // 修改服务定义弹框
    FunctionDefinitionComponent.prototype.openUpdataServiceModal = function (content, item) {
        var _this = this;
        this.addorupdate = '修改服务定义';
        this.functionModel.updateId = item.id;
        this.functionModel.description = item.description;
        this.functionModel.identifier = item.identifier;
        this.functionModel.name = item.name;
        this.functionModel.synchrony = item.synchrony;
        this.functionModel.inputparam = item.params && item.params.length > 0 ? item.params.filter(function (ite) { return ite.isOutput === 0; }) : []; // 输入参数列表
        this.functionModel.outputparam = item.params && item.params.length > 0 ? item.params.filter(function (ite) { return ite.isOutput === 1; }) : []; // 输出参数列表
        this.AddParamModel.BOOL.no = '';
        this.AddParamModel.BOOL.yes = '';
        // if (item.dataType === 'Bool') {
        //   this.AddParamModel.BOOL.no = item.enums[0].name;
        //   this.AddParamModel.BOOL.yes = item.enums[1].name;
        // }
        this.dataModel.dataType = this.findTYPEDATA(item.dataType);
        this.dataModel.unit = this.findTUNITDATA(item.unit);
        var modal = this.modalService.open(content, { windowClass: 'myCustomModalClass' });
        this.mr = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
        });
    };
    // 删除弹框
    FunctionDefinitionComponent.prototype.openDelModal = function (content, item, flag) {
        this.delDataItemId = item.id;
        this.delDataItemFlag = flag;
        var modal = this.modalService.open(content, { size: 'sm' });
        this.mr = modal;
    };
    // 删除弹框
    FunctionDefinitionComponent.prototype.openDelServiceModal = function (content, item) {
        this.delDataItemId = item.id;
        var modal = this.modalService.open(content, { size: 'sm' });
        this.mr = modal;
    };
    // 新建数据定义弹框
    FunctionDefinitionComponent.prototype.openNewModal = function (content) {
        var _this = this;
        this.addorupdate = '添加数据定义';
        this.dataModel.name = '';
        this.dataModel.dataKey = '';
        this.dataModel.dataMin = null;
        this.dataModel.dataMax = null;
        this.dataModel.resolution = null;
        this.dataModel.readOnly = false;
        this.dataModel.describe = '';
        this.dataModel.dataType = this.TYPEDATA1[0];
        this.dataModel.unit = this.UNITDATA1[0];
        var modal = this.modalService.open(content, { windowClass: 'myCustomModalClass' });
        this.mr = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
        });
    };
    // 新建服务定义弹框
    FunctionDefinitionComponent.prototype.openNewServiceModal = function (content) {
        var _this = this;
        this.addorupdate = '添加服务定义';
        this.functionModel.description = '';
        this.functionModel.identifier = '';
        this.functionModel.name = '';
        this.functionModel.synchrony = 1;
        this.functionModel.inputparam = []; // 输入参数列表
        this.functionModel.outputparam = []; // 输出参数列表
        this.AddParamModel.BOOL.no = '';
        this.AddParamModel.BOOL.yes = '';
        var modal = this.modalService.open(content, { windowClass: 'myCustomModalClass' });
        this.mr = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
        });
    };
    // 添加参数弹框
    FunctionDefinitionComponent.prototype.openParameterModal = function (content, isOutput) {
        var _this = this;
        this.AddParamModel.name = '';
        this.AddParamModel.dataKey = '';
        this.AddParamModel.dataType = this.TYPEDATA2[0];
        this.AddParamModel.unit = this.UNITDATA1[0];
        this.AddParamModel.dataMin = null;
        this.AddParamModel.dataMax = null;
        this.AddParamModel.resolution = null;
        this.AddParamModel.isOutput = isOutput;
        var modal = this.modalService.open(content);
        this.mr2 = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
        });
    };
    // 分页
    FunctionDefinitionComponent.prototype.pageChange = function () { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FunctionDefinitionComponent.prototype, "alerts", void 0);
    FunctionDefinitionComponent = __decorate([
        core_1.Component({
            selector: 'app-function-definition',
            templateUrl: './function-definition.component.html',
            styleUrls: ['./function-definition.component.scss']
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal,
            router_1.Router,
            router_1.ActivatedRoute,
            function_definition_1.FunctionDefinitionService])
    ], FunctionDefinitionComponent);
    return FunctionDefinitionComponent;
}());
exports.FunctionDefinitionComponent = FunctionDefinitionComponent;
//# sourceMappingURL=function-definition.component.js.map