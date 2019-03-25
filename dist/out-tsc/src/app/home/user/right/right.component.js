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
var Authority_tree_1 = require("../../../data/Authority.tree");
var right_service_1 = require("../../../service/right.service");
var RightComponent = /** @class */ (function () {
    function RightComponent(modalService, rightService) {
        var _this = this;
        this.modalService = modalService;
        this.rightService = rightService;
        this.zNodes = Authority_tree_1.AUTHORITYTREE;
        // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
        this.role = {}; // 存储数据
        this.modelData = {
            title: '删除',
            body: 'hh',
        };
        this.roleList = []; // 角色表
        this.queryStr = ''; // 检索字符串
        this.pageSize = 10;
        this.alerts = [];
        this.alertsModal = [];
        this.page = 1;
        // 树的操作
        // 点击
        var that = this;
        // const a = Object.values( this.role.authorities );
        this.zTreeOnCheck = function (event, treeId, treeNode) {
            _this.role.authorities = {}; // 重新赋值前先清空
            // 获取树的节点
            var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
            var nodes = treeObj.getCheckedNodes(true);
            // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值
            nodes.map(function (item, i) {
                that.role.authorities[item.id] = item.name;
            });
        };
    }
    RightComponent.prototype.ngOnInit = function () {
        this.getRoleList();
    };
    // 获取所有角色
    RightComponent.prototype.getRoleList = function () {
        var that = this;
        this.rightService.getAllRole(this.queryStr, this.page, this.pageSize).subscribe({
            next: function (val) {
                that.roleList = val.items;
                that.total = val.total;
            },
            complete: function () { },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 打开新增角色 框
    RightComponent.prototype.openAddRole = function (content) {
        var _this = this;
        var that = this;
        this.AddorUpdate = '新增角色';
        this.role.name = '';
        // this.role.deskListChecked = []; // 新建用户时各角色的选中状态（check）
        this.role.authorities = {};
        // 此处添加树
        // this.zNodes.map((item, i) => {
        //   that.role.deskListChecked.push({check: true}); // 对应树结构
        // });
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
    // 新增角色
    RightComponent.prototype.addRole = function () {
        var that = this;
        this.rightService.addNewRole(this.role.name, this.role.authorities).subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '新增成功！',
                });
                that.mr.close();
            },
            complete: function () {
                that.getRoleList();
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
    // 打开修改角色 框
    RightComponent.prototype.openUpdateRole = function (content, item) {
        var _this = this;
        var that = this;
        this.AddorUpdate = '修改角色';
        this.role.curRole = item; // 所修改的用户
        this.role.name = item.name;
        this.role.authorityIds = this.getkeys(item.authorities);
        this.role.authorities = item.authorities; // 权限加上
        // this.role.deskListCheck = []; // 新建及修改用户时各角色的选中状态（check）
        var modal = this.modalService.open(content, { windowClass: 'md' });
        this.mr = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
        this.setZtreeNode(this.role.authorityIds);
    };
    // 修改角色点击事件
    RightComponent.prototype.updateRole = function () {
        var that = this;
        this.rightService.updateRole(this.role.curRole.id, this.role.name, this.role.authorities).subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '修改成功！',
                });
                that.mr.close();
            },
            complete: function () {
                that.getRoleList(); // 获取所有角色
            },
            error: function (error) {
                console.log(error);
                var message = error.errovr.errors[0].defaultMessage;
                that.alertsModal.push({
                    id: 1,
                    type: 'danger',
                    message: "\u4FEE\u6539\u5931\u8D25\uFF1A" + message + "\uFF01",
                });
            }
        });
    };
    // 新增/修改角色 - 模态框 确认点击事件
    RightComponent.prototype.addorUpdt = function () {
        var that = this;
        if (this.AddorUpdate === '新增角色') {
            that.addRole();
        }
        else {
            that.updateRole();
        }
    };
    // 删除 弹框
    RightComponent.prototype.openDelRole = function (content, item) {
        var that = this;
        that.role.itemDelId = item.id;
        var modal = that.modalService.open(content, { size: 'sm' });
        that.mr = modal;
    };
    // 删除设备规则
    RightComponent.prototype.closeUser = function ($event) {
        if ($event === 'ok') {
            this.delRole();
        }
        this.mr.close();
    };
    // 删除设备-接口处
    RightComponent.prototype.delRole = function () {
        var that = this;
        var id = this.role.itemDelId;
        var flag = false;
        var pages = (this.total + this.pageSize - 1) / this.pageSize;
        if (this.page >= pages && this.roleList.length === 1) {
            flag = true;
        }
        this.rightService.deleteRole(id).subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '删除成功！',
                });
            },
            complete: function () {
                if (flag) {
                    that.page = that.page - 1;
                    that.getRoleList();
                }
                else {
                    that.getRoleList();
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 分页
    RightComponent.prototype.pageChange = function () {
        this.getRoleList();
    };
    // 检索用户的账户名或姓名
    RightComponent.prototype.execQuery = function () {
        this.getRoleList();
    };
    RightComponent.prototype.getDismissReason = function (reason) {
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
    RightComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    RightComponent.prototype.closeAlertModal = function (alert) {
        var index = this.alertsModal.indexOf(alert);
        this.alertsModal.splice(index, 1);
    };
    // 搜索Enter事件
    RightComponent.prototype.onKeydown = function (event) {
        if (event.keyCode === 13) {
            this.execQuery();
        }
    };
    RightComponent.prototype.getZoneTree = function () {
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
                chkboxType: { 'Y': 'ps', 'N': 'ps' }
            },
            callback: {
                onClick: this.zTreeOnClick,
                onCheck: this.zTreeOnCheck // 勾选事件
            }
        };
        this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, this.zNodes);
    };
    RightComponent.prototype.setZtreeNode = function (roleRoles) {
        var that = this;
        // 树结构，树设置
        this.getZoneTree();
        // treeDemo界面中加载ztree的div
        var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
        if (!roleRoles) {
            return;
        }
        roleRoles.map(function (item, i) {
            var node = treeObj.getNodeByParam('id', item, null); // 传入id
            if (node) {
                treeObj.checkNode(node, true, false); // 此处是用户勾选
                // this.findParent(node.getParentNode());
            }
        });
    };
    RightComponent.prototype.findParent = function (node) {
        // 判断node为空的时候
        if (!node) {
            return;
        }
        var p = node.getParentNode();
        if (p && !p.open) {
            p.open = true;
        }
    };
    // 获取对象value
    RightComponent.prototype.getkeys = function (obj) {
        if (!obj) {
            return;
        }
        return Object.keys(obj);
    };
    // 获取对象value
    RightComponent.prototype.getVaule = function (obj) {
        if (!obj) {
            return;
        }
        return Object.values(obj);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], RightComponent.prototype, "alerts", void 0);
    RightComponent = __decorate([
        core_1.Component({
            selector: 'app-right',
            templateUrl: './right.component.html',
            styleUrls: ['./right.component.scss']
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal, right_service_1.RightService])
    ], RightComponent);
    return RightComponent;
}());
exports.RightComponent = RightComponent;
//# sourceMappingURL=right.component.js.map