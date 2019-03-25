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
var install_zone_service_1 = require("../../../service/install-zone.service");
var InstallComponent = /** @class */ (function () {
    function InstallComponent(modalService, installzoneService) {
        var _this = this;
        this.modalService = modalService;
        this.installzoneService = installzoneService;
        this.zNodes = [];
        this.install = {}; // 存储数据
        this.installModelDate = {
            'center': {
                'lat': 0,
                'lng': 0
            },
            'full_name': '',
            'level': 0,
            'name': '',
            'region_id': ''
        };
        this.InstallData = {
            title: '删除',
            body: 'hh',
        };
        // 安装区域列表
        this.installList = [];
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
            _this.install.geoRegion = {}; // 重新赋值前先清空
            // 获取树的节点
            var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
            var nodes = treeObj.getCheckedNodes(true);
            console.log(nodes);
            _this.installModelDate.center = nodes[0].center;
            _this.installModelDate.full_name = nodes[0].full_name;
            _this.installModelDate.region_id = nodes[0].id;
            _this.installModelDate.name = nodes[0].name;
            _this.installModelDate.level = nodes[0].level;
        };
        // this.zNodes = window.localStorage.regionsList ? JSON.parse(window.localStorage.regionsList) : [];
    }
    InstallComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    InstallComponent.prototype.closeAlertModal = function (alert) {
        var index = this.alertsModal.indexOf(alert);
        this.alertsModal.splice(index, 1);
    };
    InstallComponent.prototype.ngOnInit = function () {
        this.getInstallzone(); // 获取安装区域列表
        this.getRegions();
    };
    // 城市列表
    InstallComponent.prototype.getRegions = function () {
        var that = this;
        this.installzoneService.getRegions()
            .subscribe({
            next: function (val) {
                that.zNodes = val;
                // window.localStorage.regionsList = JSON.stringify(val);
            }
        });
    };
    InstallComponent.prototype.getDismissReason = function (reason) {
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
    InstallComponent.prototype.setZtreeNode = function (georegion) {
        // 树结构，树设置
        this.getZoneTree();
        // treeDemo界面中加载ztree的div
        var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
        if (!georegion) {
            return;
        }
        georegion.map(function (item, i) {
            var node = treeObj.getNodeByParam('id', item, null); // 传入id
            if (node) {
                treeObj.checkNode(node, true, false); // 此处是用户勾选
                // this.findParent(node.getParentNode());
            }
        });
    };
    InstallComponent.prototype.getZoneTree = function () {
        var that = this;
        var setting = {
            view: {
                selectedMulti: true,
                dblClickExpand: false,
                showLine: true,
            },
            check: {
                enable: true,
                chkStyle: 'radio',
                radioType: 'all',
                chkboxType: { 'Y': 'ps', 'N': 'ps' }
            },
            callback: {
                onClick: this.zTreeOnClick,
                onCheck: this.zTreeOnCheck // 勾选事件
            }
        };
        this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, this.zNodes);
    };
    // 获取安装区域列表 --ok
    InstallComponent.prototype.getInstallzone = function () {
        var that = this;
        this.installzoneService.getZone(this.page, this.pageSize, this.queryStr).subscribe({
            next: function (val) {
                console.log('安装区域列表');
                console.log(val);
                that.installList = val.items;
                that.total = val.total;
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    InstallComponent.prototype.pageChange = function () {
        this.getInstallzone();
    };
    InstallComponent.prototype.execQuery = function () {
        this.getInstallzone();
    };
    // 打开新增窗口
    InstallComponent.prototype.openNewInstallZone = function (content) {
        var _this = this;
        var that = this;
        this.AddorUpdate = '新增安装区域';
        this.installModelDate = {
            'center': {
                'lat': 0,
                'lng': 0
            },
            'full_name': '',
            'level': 0,
            'name': '',
            'region_id': ''
        };
        this.install.geoRegionChecked = []; // 新建用户时各角色的选中状态（check）
        this.install.geoRegion = '';
        // 此处添加树
        this.zNodes.map(function (item, i) {
            that.install.geoRegionChecked.push({ check: true }); // 对应树结构
        });
        // 关于弹框
        var modal = this.modalService.open(content, { windowClass: 'md' });
        this.mr = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
        // 树状图
        this.setZtreeNode([]);
    };
    // 打开 修改 弹框
    InstallComponent.prototype.openUpdataInstall = function (contentUpdate, item) {
        var _this = this;
        this.AddorUpdate = '修改角色';
        this.installModelDate = item;
        // 所修改的区域
        this.install.geoRegionChecked = []; // 新建及修改用户时各角色的选中状态（check）
        var modal = this.modalService.open(contentUpdate, { windowClass: 'md' });
        this.mr = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
        this.setZtreeNode([]);
    };
    // 删除 安装 区域 弹框
    InstallComponent.prototype.openDelInstall = function (content, install) {
        var that = this;
        that.install.itemDelId = install.id;
        var modal = that.modalService.open(content, { size: 'sm' });
        that.mr = modal;
    };
    // 新增/修改角色 - 模态框 确认点击事件
    InstallComponent.prototype.addorUpdt = function () {
        var that = this;
        if (this.AddorUpdate === '新增安装区域') {
            that.addInstall();
            console.log('新增');
        }
        else {
            that.updateInstall();
            console.log('修改');
        }
    };
    // 新增安装区域
    InstallComponent.prototype.addInstall = function () {
        var that = this;
        this.installzoneService.addNewInstall(this.installModelDate)
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
    InstallComponent.prototype.updateInstall = function () {
        var that = this;
        this.installzoneService.updateInstall(this.installModelDate)
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
    InstallComponent.prototype.delInstall = function () {
        var that = this;
        var id = this.install.itemDelId;
        var body = {
            ids: []
        };
        body.ids.push(id);
        console.log(id);
        this.installzoneService.deleteInstall(body).subscribe({
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
    InstallComponent.prototype.closeInstall = function ($event) {
        if ($event === 'ok') {
            this.delInstall();
        }
        this.mr.close();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], InstallComponent.prototype, "alerts", void 0);
    InstallComponent = __decorate([
        core_1.Component({
            selector: 'app-install',
            templateUrl: './install.component.html',
            styleUrls: ['./install.component.scss']
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal, install_zone_service_1.InstallZoneService])
    ], InstallComponent);
    return InstallComponent;
}());
exports.InstallComponent = InstallComponent;
//# sourceMappingURL=install.component.js.map