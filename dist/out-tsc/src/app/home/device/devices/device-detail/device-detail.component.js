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
var device_history_service_1 = require("../../../../service/device-history.service");
var DeviceDetailComponent = /** @class */ (function () {
    function DeviceDetailComponent(router, modalService, deviceHistoryService, routerinfo) {
        this.router = router;
        this.modalService = modalService;
        this.deviceHistoryService = deviceHistoryService;
        this.routerinfo = routerinfo;
        this.deviceInfo = {}; // 设备信息
        this.CurrentPropertyList = []; // 数据列表
        this.functionList = []; // 服务列表
        this.outPutList = []; // 输出服务参数列表
        this.inPutList = []; // 输入服务参数列表
        this.page = 1; // 分页
        this.pageSize = 10; // 分页
        this.total = 0; // 分页
        this.page1 = 1; // 分页
        this.pageSize1 = 10; // 分页
        this.total1 = 0; // 分页
        this.navs = [
            {
                id: 0,
                name: '设备属性'
            },
            {
                id: 1,
                name: '服务调用'
            }
        ];
        this.nav_index = 1; // 默认菜单
        this.alertsModal = [];
        this.alerts = [];
    }
    DeviceDetailComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    DeviceDetailComponent.prototype.closeAlertModal = function (alert) {
        var index = this.alertsModal.indexOf(alert);
        this.alertsModal.splice(index, 1);
    };
    DeviceDetailComponent.prototype.ngOnInit = function () {
        this.deviceId = this.routerinfo.snapshot.params.deviceId;
        this.modelId = this.routerinfo.snapshot.params.modelId;
        this.deviceName = this.routerinfo.snapshot.params.deviceName;
        this.getDevice();
        this.getCurrentProperty();
        this.getDeviceService();
    };
    // 切换菜单
    DeviceDetailComponent.prototype.changeNav = function (i) {
        this.nav_index = i;
    };
    // 刷新数据
    DeviceDetailComponent.prototype.getDataNew = function () {
        this.getDevice();
        this.getCurrentProperty();
    };
    // 返回
    DeviceDetailComponent.prototype.jumpHandle = function (url) {
        this.router.navigate([url]);
    };
    // 属性页面
    DeviceDetailComponent.prototype.goToZheRoute = function (para, dataKey) {
        this.router.navigate([para, { deviceId: this.deviceId, dataKey: dataKey }]);
    };
    // 获取设备信息
    DeviceDetailComponent.prototype.getDevice = function () {
        var that = this;
        this.deviceHistoryService.getDevice(this.deviceId)
            .subscribe({
            next: function (val) {
                that.deviceInfo = val;
            }
        });
    };
    // 获取某个设备的所有服务调用
    DeviceDetailComponent.prototype.getDeviceService = function () {
        var that = this;
        this.deviceHistoryService.getDeviceService(this.modelId)
            .subscribe({
            next: function (val) {
                that.functionList = val;
            }
        });
    };
    // 获取服务调用所需的参数
    DeviceDetailComponent.prototype.getServeParam = function (serviceId) {
        var that = this;
        this.deviceHistoryService.getServeParam(serviceId)
            .subscribe({
            next: function (val) {
                that.inPutList = val && val.length > 0 ? val.filter(function (item) { return item.isOutput === 0; }) : [];
                that.outPutList = val && val.length > 0 ? val.filter(function (item) { return item.isOutput === 1; }) : [];
            }
        });
    };
    // 弹出服务调用框
    DeviceDetailComponent.prototype.openServiceModel = function (serviceCall, service) {
        var _this = this;
        this.identifier = service.identifier;
        this.serviceName = service.name;
        this.getServeParam(service.id);
        var modal = this.mr = this.modalService.open(serviceCall, { windowClass: 'myCustomModalClass' });
        // const modal = this.modalService.open(serviceCall, { size: 'lg' });
        this.mr = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
        });
    };
    // 添加服务调用
    DeviceDetailComponent.prototype.addInvokeService = function () {
        var that = this;
        var body;
        var param = {};
        for (var _i = 0, _a = this.inPutList; _i < _a.length; _i++) {
            var item = _a[_i];
            if ((item.dataType.toLowerCase() === 'text' && !item.value) ||
                (item.dataType.toLowerCase() === 'text' && item.value.trim() === '')) {
                that.alertsModal.push({
                    id: 1,
                    type: 'danger',
                    message: item.dataKey + "\u7684\u503C\u4E0D\u80FD\u4E3A\u7A7A\uFF01",
                });
                return;
            }
            else if ((item.dataType.toLowerCase() === 'int' || item.dataType.toLowerCase() === 'float' ||
                item.dataType.toLowerCase() === 'double') && item.value === null) {
                that.alertsModal.push({
                    id: 1,
                    type: 'danger',
                    message: item.dataKey + "\u7684\u503C\u4E3A\u6570\u5B57\uFF01",
                });
                return;
            }
            else if (item.value === '' || item.value === undefined) {
                that.alertsModal.push({
                    id: 1,
                    type: 'danger',
                    message: item.dataKey + "\u7684\u503C\u4E0D\u80FD\u4E3A\u7A7A\uFF01",
                });
                return;
            }
            param[item.dataKey] = item.value;
        }
        body = {
            'args': param,
            'deviceId': this.deviceId,
            'deviceName': this.deviceName,
            'identifier': this.identifier
        };
        this.deviceHistoryService.addInvokeService(body)
            .subscribe({
            next: function (val) {
                that.alertsModal.push({
                    id: 1,
                    type: 'success',
                    message: '服务调用成功！',
                });
                // if (that.inPutList.length !== 0) { // 有模态框弹出，才需要关闭
                //   that.mr.close();
                // }
            },
            complete: function () {
                // that.getDeviceService();
            },
            error: function (error) {
                var message = error.error.errors[0].defaultMessage;
                if (that.inPutList.length === 0) {
                    that.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: message + "\uFF01",
                    });
                }
                else {
                    that.alertsModal.push({
                        id: 1,
                        type: 'danger',
                        message: message + "\uFF01",
                    });
                }
            }
        });
    };
    // 获取实时数据
    DeviceDetailComponent.prototype.getCurrentProperty = function () {
        var that = this;
        this.deviceHistoryService.getCurrentProperty(this.deviceId, this.page, this.pageSize)
            .subscribe({
            next: function (val) {
                that.CurrentPropertyList = val.items;
                that.total = val.total;
            }
        });
    };
    DeviceDetailComponent.prototype.pageChange = function () {
        this.getCurrentProperty();
    };
    DeviceDetailComponent.prototype.pageChange1 = function () {
        this.getCurrentProperty();
    };
    DeviceDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-device-detail',
            templateUrl: './device-detail.component.html',
            styleUrls: ['./device-detail.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            ng_bootstrap_1.NgbModal,
            device_history_service_1.DeviceHistoryService,
            router_1.ActivatedRoute])
    ], DeviceDetailComponent);
    return DeviceDetailComponent;
}());
exports.DeviceDetailComponent = DeviceDetailComponent;
//# sourceMappingURL=device-detail.component.js.map