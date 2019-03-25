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
var customer_service_1 = require("../../../service/customer.service");
var Authority_tree_1 = require("../../../data/Authority.tree");
var CustomerComponent = /** @class */ (function () {
    function CustomerComponent(modalService, customerService) {
        var _this = this;
        this.modalService = modalService;
        this.customerService = customerService;
        this.customerModelDate = {};
        this.zNodes = [];
        this.rNodes = Authority_tree_1.AUTHORITYTREE;
        this.InstallData = {
            title: '删除',
            body: 'hh',
        };
        // 安装区域列表
        this.List = [];
        this.queryStr = ''; // 检索字符串
        this.page = 1;
        this.pageSize = 10;
        this.total = 0;
        this.alerts = [];
        this.alertsModal = [];
        // 树的操作
        // 点击
        var that = this;
        this.zTreeOnCheck = function (event, treeId, treeNode) {
            // 获取树的节点
            var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
            var nodes = treeObj.getCheckedNodes(true);
            console.log(nodes);
            _this.customerModelDate.regionIds = [];
            nodes.map(function (item) {
                that.customerModelDate.regionIds.push(item.id);
            });
        };
        // 新增客户权限树
        this.rTreeOnCheck = function (event, treeId, treeNode) {
            _this.customerModelDate.authorities = {}; // 重新赋值前先清空
            // 获取树的节点
            var treeObj = $.fn.zTree.getZTreeObj('rTreeDemo');
            var node = treeObj.getCheckedNodes(true);
            console.log(node);
            // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值
            node.map(function (item, i) {
                that.customerModelDate.authorities[item.id] = item.name;
            });
            console.log(that.customerModelDate.authorities);
        };
        // this.zNodes = window.localStorage.regionsList ? JSON.parse(window.localStorage.regionsList) : [];
    }
    CustomerComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    CustomerComponent.prototype.closeAlertModal = function (alert) {
        var index = this.alertsModal.indexOf(alert);
        this.alertsModal.splice(index, 1);
    };
    CustomerComponent.prototype.ngOnInit = function () {
        this.getInstallzone(); // 获取安装区域列表
        this.getRegions();
    };
    // 城市列表
    CustomerComponent.prototype.getRegions = function () {
        var that = this;
        this.customerService.getRegions()
            .subscribe({
            next: function (val) {
                that.zNodes = val;
                // window.localStorage.regionsList = JSON.stringify(val);
            }
        });
    };
    CustomerComponent.prototype.getDismissReason = function (reason) {
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
    CustomerComponent.prototype.setZtreeNode = function (georegion, roles) {
        // 树结构，树设置
        this.getZoneTree();
        this.getRZoneTree();
        console.log(roles);
        if ('' + roles === '' + {} || roles === undefined) {
            roles = [];
        }
        console.log(roles);
        // treeDemo界面中加载ztree的div
        var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
        var rRreeObj = $.fn.zTree.getZTreeObj('rTreeDemo');
        if (!georegion && !roles) {
            return;
        }
        roles.map(function (item, i) {
            var node = rRreeObj.getNodeByParam('id', item, null); // 传入id
            if (node) {
                rRreeObj.checkNode(node, true, false); // 此处是用户勾选
                // this.findParent(node.getParentNode());
            }
        });
        georegion.map(function (item, i) {
            var node = treeObj.getNodeByParam('id', item, null); // 传入id
            if (node) {
                treeObj.checkNode(node, true, false); // 此处是用户勾选
                // this.findParent(node.getParentNode());
            }
        });
    };
    CustomerComponent.prototype.getRZoneTree = function () {
        var that = this;
        var setting = {
            view: {
                selectedMulti: true,
                dblClickExpand: false,
                showLine: true,
            },
            check: {
                enable: true,
                chkStyle: 'checkbox',
                chkboxType: { 'Y': '', 'N': '' }
            },
            callback: {
                onClick: this.rTreeOnClick,
                onCheck: this.rTreeOnCheck // 勾选事件
            }
        };
        this.rTreeObj = $.fn.zTree.init($('#rTreeDemo'), setting, this.rNodes);
        console.log(this.zTreeObj);
    };
    CustomerComponent.prototype.getZoneTree = function () {
        var that = this;
        var setting = {
            view: {
                selectedMulti: true,
                dblClickExpand: false,
                showLine: true,
            },
            check: {
                enable: true,
                chkStyle: 'checkbox',
                radioType: 'all',
                chkboxType: { 'Y': '', 'N': '' }
            },
            callback: {
                onClick: this.zTreeOnClick,
                onCheck: this.zTreeOnCheck // 勾选事件
            }
        };
        this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, this.zNodes);
        console.log(this.zTreeObj);
    };
    // 获取安装区域列表 --ok
    CustomerComponent.prototype.getInstallzone = function () {
        var that = this;
        this.customerService.getCustomer(this.page, this.pageSize, this.queryStr).subscribe({
            next: function (val) {
                that.List = val.items;
                that.total = val.total;
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    CustomerComponent.prototype.pageChange = function () {
        this.getInstallzone();
    };
    CustomerComponent.prototype.execQuery = function () {
        this.page = 1;
        this.getInstallzone();
    };
    // 打开新增窗口
    CustomerComponent.prototype.openNewInstallZone = function (content) {
        var _this = this;
        var that = this;
        this.AddorUpdate = '新增客户';
        this.customerModelDate.name = '';
        this.customerModelDate.code = '';
        // 关于弹框
        var modal = this.modalService.open(content, { size: 'lg' });
        this.mr = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
        // 树状图
        // this.setRtreeNode([]);
        this.setZtreeNode([], []);
    };
    // 打开 修改 弹框
    CustomerComponent.prototype.openUpdata = function (contentUpdate, item) {
        var _this = this;
        console.log('item' + item.regionIds + ': ' + item.authorities);
        console.log(item.authorities);
        this.AddorUpdate = '修改客户';
        this.customerModelDate.id = item.id;
        this.customerModelDate.name = item.name;
        this.customerModelDate.code = item.code;
        this.customerModelDate.regionIds = item.regionIds;
        this.customerModelDate.authorityIds = this.getkeys(item.authorities);
        this.customerModelDate.authorities = item.authorities;
        // 所修改的区域
        console.log(this.customerModelDate.authorityIds);
        // this.customerModelDate.geoRegionChecked = []; // 新建及修改用户时各角色的选中状态（check）
        var modal = this.modalService.open(contentUpdate, { size: 'lg' });
        this.mr = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
        console.log(this.customerModelDate.authorityIds);
        this.setZtreeNode(item.regionIds, this.customerModelDate.authorityIds);
    };
    // 删除 安装 区域 弹框
    CustomerComponent.prototype.openDel = function (content, item) {
        var that = this;
        that.customerModelDate.itemDelId = item.id;
        var modal = that.modalService.open(content, { size: 'sm' });
        that.mr = modal;
    };
    // 新增/修改角色 - 模态框 确认点击事件
    CustomerComponent.prototype.addorUpdt = function () {
        var that = this;
        if (this.AddorUpdate === '新增客户') {
            that.addCustomer();
            console.log('新增');
        }
        else {
            that.updateCustomer();
            console.log('修改');
        }
    };
    // 新增客户
    CustomerComponent.prototype.addCustomer = function () {
        var that = this;
        var body = {
            name: this.customerModelDate.name,
            code: this.customerModelDate.code,
            authorities: this.customerModelDate.authorities,
            regionIds: this.customerModelDate.regionIds
        };
        this.customerService.addNewCustomer(body)
            .subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '新增成功！',
                });
                that.mr.close();
            },
            complete: function () {
                that.getInstallzone(); // 获取安装区域列表
            },
            error: function (error) {
                console.log(error);
                var message = error.error.errors[0].defaultMessage;
                that.alertsModal.push({
                    id: 1,
                    type: 'danger',
                    message: "\u65B0\u589E\u5931\u8D25\uFF1A" + message + "\uFF01",
                });
            }
        });
    };
    // 修改安装区域
    CustomerComponent.prototype.updateCustomer = function () {
        var that = this;
        var body = {
            id: this.customerModelDate.id,
            name: this.customerModelDate.name,
            code: this.customerModelDate.code,
            authorities: this.customerModelDate.authorities,
            regionIds: this.customerModelDate.regionIds
        };
        this.customerService.updateCustomer(body)
            .subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '修改成功！',
                });
                that.mr.close();
            },
            complete: function () {
                that.getInstallzone(); // 获取安装区域列表
            },
            error: function (error) {
                console.log(error);
                var message = error.error.errors[0].defaultMessage;
                that.alertsModal.push({
                    id: 1,
                    type: 'danger',
                    message: "\u4FEE\u6539\u5931\u8D25\uFF1A" + message + "\uFF01",
                });
            }
        });
    };
    // 删除接口处
    CustomerComponent.prototype.delCustomer = function () {
        var that = this;
        var id = this.customerModelDate.itemDelId;
        // const body = {
        //   ids: []
        // };
        // body.ids.push(id);
        // console.log(id);
        this.customerService.deleteCustomer(id).subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '删除成功！',
                });
            },
            complete: function () {
                that.getInstallzone();
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 删除规则
    CustomerComponent.prototype.closeCustomer = function ($event) {
        if ($event === 'ok') {
            this.delCustomer();
        }
        this.mr.close();
    };
    // 获取对象value
    CustomerComponent.prototype.getkeys = function (obj) {
        if (!obj) {
            return;
        }
        return Object.keys(obj);
    };
    // 获取对象value
    CustomerComponent.prototype.getVaule = function (obj) {
        if (!obj) {
            return;
        }
        return Object.values(obj);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CustomerComponent.prototype, "alerts", void 0);
    CustomerComponent = __decorate([
        core_1.Component({
            selector: 'app-customer',
            templateUrl: './customer.component.html',
            styleUrls: ['./customer.component.scss']
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal, customer_service_1.CustomerService])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map