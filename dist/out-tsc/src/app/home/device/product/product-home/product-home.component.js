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
var product_service_1 = require("../../../../service/product.service");
var ProductHomeComponent = /** @class */ (function () {
    function ProductHomeComponent(modalService, router, productService) {
        this.modalService = modalService;
        this.router = router;
        this.productService = productService;
        this.model = {};
        this.productListItems = [];
        this.pagesize = 10;
        this.type = 0;
        this.deviceList = []; // 设备列表
        this.deviceTypes = []; // 设备列表
        this.modelData = {
            title: '删除',
            body: 'hh',
        };
        this.addOrUpdate = '';
        this.alerts = [];
        this.alertsModal = [];
        this.page = 1;
        this.queryStr = '';
        this.model.iotPlatform = 0;
    }
    ProductHomeComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    ProductHomeComponent.prototype.closeAlertModal = function (alert) {
        var index = this.alertsModal.indexOf(alert);
        this.alertsModal.splice(index, 1);
    };
    ProductHomeComponent.prototype.reset = function () {
        this.alerts = this.backup.map(function (alert) { return Object.assign({}, alert); });
    };
    ProductHomeComponent.prototype.ngOnInit = function () {
        this.getDevice();
        this.getModel(0, this.page, this.pagesize);
    };
    // 属性页面
    ProductHomeComponent.prototype.goToZheRoute = function (para, item) {
        if (item) {
            this.router.navigate([para, { param: JSON.stringify(item) }]);
        }
        else {
            this.router.navigate([para]);
        }
    };
    // 产品关键词检索 点击事件
    ProductHomeComponent.prototype.execQuery = function () {
        this.page = 1;
        this.getModel(this.currentType.id, 1, this.pagesize);
    };
    // 获取设备型号
    ProductHomeComponent.prototype.getModel = function (type, page, pagesize) {
        var that = this;
        this.productService.getModel(this.queryStr, type, page, pagesize).subscribe({
            next: function (val) {
                that.productList = val;
                that.total = val.total;
                that.productListItems = val.items;
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // fenye
    ProductHomeComponent.prototype.pageChange = function () {
        this.getModel(this.currentType.id, this.page, this.pagesize);
    };
    // 获取设备列表
    ProductHomeComponent.prototype.getDevice = function () {
        var that = this;
        this.productService.getDevice().subscribe({
            next: function (val) {
                that.deviceList = val;
                that.model.device = val[0];
                that.deviceTypes = val.map(function (item) { return Object.assign({}, item); });
                that.deviceTypes.unshift({ id: 0, name: '不限' }); // 所有项
                that.currentType = that.deviceTypes[0];
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    ProductHomeComponent.prototype.deviceTypeChange = function () {
        this.page = 1;
        this.getModel(this.currentType.id, this.page, this.pagesize);
    };
    ProductHomeComponent.prototype.changeName = function (modelId) {
        var modelName;
        this.deviceTypes.map(function (item, i) {
            if (item.id === modelId) {
                modelName = item.name;
            }
        });
        return modelName;
    };
    // 打开心建产品弹框
    ProductHomeComponent.prototype.openNewProduct = function (content) {
        var _this = this;
        this.addOrUpdate = '新建产品';
        this.model.name = ''; // name
        this.model.description = ''; // description
        this.model.device = this.deviceList[0]; // 类型
        var modal = this.modalService.open(content, { size: 'lg' });
        this.mr = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
        });
    };
    // 修改产品型号弹窗
    ProductHomeComponent.prototype.openUpdataModal = function (content, item) {
        var _this = this;
        this.addOrUpdate = '修改产品';
        var that = this;
        this.model.name = item.name; // name
        this.model.description = item.description; // description
        this.model.updateItemId = item.id; // id
        this.model.iotPlatform = item.iotPlatform; // id
        var id = item.type; // 类型
        for (var index = 0; index < this.deviceList.length; index++) {
            var element = this.deviceList[index];
            if (id === element.id) {
                that.model.device = this.deviceList[index];
            }
        }
        var modal = this.modalService.open(content, { size: 'lg' });
        this.mr = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
        });
    };
    ProductHomeComponent.prototype.addorupdate = function () {
        if (this.addOrUpdate === '新建产品') {
            this.setModel();
        }
        else {
            this.updateModel();
        }
    };
    // 添加设备型号
    ProductHomeComponent.prototype.setModel = function () {
        var that = this;
        var body = {
            name: this.model.name,
            description: this.model.description,
            type: this.model.device.id,
            isGateway: this.model.device.id === 1 ? true : false,
            iotPlatform: this.model.iotPlatform
        };
        this.productService.setModel(body).subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '新建成功！',
                });
                that.mr.close();
            },
            complete: function () {
                that.getModel(that.currentType.id, that.page, that.pagesize);
            },
            error: function (error) {
                console.log(error);
                var message = error.error.errors[0].defaultMessage;
                that.alertsModal.push({
                    id: 1,
                    type: 'danger',
                    message: "\u65B0\u5EFA\u5931\u8D25: " + message + "\uFF01",
                });
            }
        });
    };
    // 修改设备型号
    ProductHomeComponent.prototype.updateModel = function () {
        var that = this;
        var body = {
            id: this.model.updateItemId,
            name: this.model.name,
            description: this.model.description,
            type: this.model.device.id,
            isGateway: this.model.device.id === 1 ? true : false,
            iotPlatform: this.model.iotPlatform
        };
        this.productService.updateModel(body).subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '修改成功！',
                });
                that.mr.close();
            },
            complete: function () {
                that.getModel(that.currentType.id, that.page, that.pagesize);
            },
            error: function (error) {
                console.log(error);
                var message = error.error.errors[0].defaultMessage;
                that.alertsModal.push({
                    id: 1,
                    type: 'danger',
                    message: "\u4FEE\u6539\u5931\u8D25: " + message + "\uFF01",
                });
            }
        });
    };
    // 删除设备型号弹框
    ProductHomeComponent.prototype.openDelModal = function (content, item) {
        var that = this;
        this.model.itemDelId = item.id;
        var modal = this.modalService.open(content, { size: 'sm' });
        this.mr = modal;
    };
    // 删除设备型号
    ProductHomeComponent.prototype.closeModal = function ($event) {
        console.log($event);
        if ($event === 'ok') {
            this.delModal();
        }
        this.mr.close();
    };
    // 删除设备型号-接口处
    ProductHomeComponent.prototype.delModal = function () {
        var that = this;
        var id = this.model.itemDelId;
        var flag = false;
        var pages = (this.total + this.pagesize - 1) / this.pagesize;
        if (this.page >= pages && this.productListItems.length === 1) {
            flag = true;
        }
        this.productService.delModel(id).subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '删除成功！',
                });
                that.backup = that.alerts.map(function (alert) { return Object.assign({}, alert); });
            },
            complete: function () {
                if (flag) {
                    that.page = that.page - 1;
                    that.getModel(that.currentType.id, that.page, that.pagesize);
                }
                else {
                    that.getModel(that.currentType.id, that.page, that.pagesize);
                }
            },
            error: function (error) {
                console.log(error);
                var message = error.error.errors[0].defaultMessage;
                that.alerts.push({
                    id: 1,
                    type: 'danger',
                    message: "\u4FEE\u6539\u5931\u8D25: " + message,
                });
            }
        });
    };
    ProductHomeComponent.prototype.openAddParams = function (content) {
        var _this = this;
        var that = this;
        this.modalService.open(content, { windowClass: 'md-modal' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
            console.log(_this.closeResult);
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
            console.log(_this.closeResult);
        });
    };
    // 搜索Enter事件
    ProductHomeComponent.prototype.onKeydown = function (event) {
        if (event.keyCode === 13) {
            this.execQuery();
        }
    };
    ProductHomeComponent.prototype.getDismissReason = function (reason) {
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ProductHomeComponent.prototype, "alerts", void 0);
    ProductHomeComponent = __decorate([
        core_1.Component({
            selector: 'app-product-home',
            templateUrl: './product-home.component.html',
            styleUrls: ['./product-home.component.scss']
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal,
            router_1.Router,
            product_service_1.ProductService])
    ], ProductHomeComponent);
    return ProductHomeComponent;
}());
exports.ProductHomeComponent = ProductHomeComponent;
//# sourceMappingURL=product-home.component.js.map