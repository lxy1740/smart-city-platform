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
var admin_service_1 = require("../../../service/admin.service");
var customer_service_1 = require("../../../service/customer.service");
var angular_jwt_1 = require("@auth0/angular-jwt");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(modalService, adminService, customerService, jwtHelper) {
        var _this = this;
        this.modalService = modalService;
        this.adminService = adminService;
        this.customerService = customerService;
        this.jwtHelper = jwtHelper;
        this.setting = {}; // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
        this.modelData = {
            title: '删除',
            body: 'hh',
        };
        this.user = {}; // 存储数据
        this.userList = []; // 用户表
        this.roleList = []; // 角色表
        this.roleList1 = []; // 不含“不限”项
        this.queryStr = ''; // 检索字符串
        this.page = 1;
        this.pageSize = 10;
        this.total2 = 0; // 分页
        this.page2 = 1; // 分页
        this.pageSize2 = 10; // 分页
        this.currentCustomer = {}; // 当前客户
        this.CustomerList = [];
        this.Customershow = false;
        this.alerts = [];
        this.alertsModal = [];
        var token = localStorage.getItem('token');
        this.customerId = this.jwtHelper.decodeToken(token) && this.jwtHelper.decodeToken(token).customerid;
        // 树的操作
        // 点击
        var that = this;
        // this.zTreeOnClick = (event, treeId, treeNode) => {    // 点击
        //   treeNode.checked = true;
        //   console.log(treeNode);
        // };
        this.zTreeOnCheck = function (event, treeId, treeNode) {
            _this.user.roleIds = []; // 重新赋值前先清空
            var treeObj = $.fn.zTree.getZTreeObj('treeDemo1');
            var nodes = treeObj.getCheckedNodes(true);
            nodes.map(function (item, i) {
                that.user.roleIds[i] = item.id;
            });
        };
    }
    AdminComponent.prototype.ngOnInit = function () {
        // this.zTreeObj = $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
        this.zTreeObj = $.fn.zTree.init($('#treeDemo'), this.setting);
        this.getUserList();
        this.getRoleList();
        this.getCustomer();
        // console.log(this.zNodes);
    };
    // 选择客户
    AdminComponent.prototype.selecteCustomer = function (item) {
        this.currentCustomer = item;
        this.Customershow = false;
    };
    // 分页获取客户
    AdminComponent.prototype.getCustomer = function () {
        var that = this;
        this.customerService.getCustomer(this.page2, this.pageSize2, '')
            .subscribe({
            next: function (val) {
                that.CustomerList = val.items;
                that.total2 = val.tota2;
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 分页
    AdminComponent.prototype.pageChange2 = function () {
        this.getCustomer();
    };
    // 显示客户
    AdminComponent.prototype.showCustomer = function () {
        this.Customershow = true;
    };
    // 离开客户
    AdminComponent.prototype.CustomerlistMouseleave = function () {
        this.Customershow = false;
    };
    // 获取用户列表
    AdminComponent.prototype.getUserList = function () {
        var that = this;
        this.adminService.getAllUser(this.queryStr, this.page, this.pageSize).subscribe({
            next: function (val) {
                console.log('user', val);
                that.userList = val.items;
                that.total = val.total;
            },
            complete: function () { },
            error: function (error) {
                // console.log('errorOnAdminpage');
                console.log(error);
            }
        });
    };
    // 获取角色列表
    AdminComponent.prototype.getRoleList = function () {
        var that = this;
        this.adminService.getAllRole().subscribe({
            next: function (val) {
                // console.log('role', val);
                that.roleList1 = val;
                // console.log(that.roleList1);
                that.roleList = val.map(function (item) { return Object.assign({}, item); });
                // console.log(that.roleList);
                that.roleList.unshift({ id: 0, name: '不限' }); // 所有项
                that.curRole = that.roleList[0];
                // console.log(that.curRole);
            },
            complete: function () { },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 分页
    AdminComponent.prototype.pageChange = function () {
        this.getUserList();
    };
    // 按角色筛选
    AdminComponent.prototype.roleChange = function () {
        // console.log(this.curRole);
    };
    // 检索用户的账户名或姓名
    AdminComponent.prototype.execQuery = function () {
        this.getUserList();
    };
    // 打开新增用户 框体
    AdminComponent.prototype.openAddUser = function (content) {
        var _this = this;
        var that = this;
        this.addOrUpdate = '新建用户';
        this.user.userName = '';
        this.user.password = '';
        this.user.email = '';
        this.user.mobile = '';
        this.user.fullName = '';
        this.user.nickName = '';
        this.user.gender = '0';
        this.user.avatar = '';
        this.currentCustomer = {};
        this.user.roleListCheck = []; // 新建用户时各角色的选中状态（check）
        this.user.roleIds = [];
        this.roleList1.map(function (item, i) {
            that.user.roleListCheck.push({ check: false }); // 一一对应角色表roleList1
        });
        var modal = this.modalService.open(content, { windowClass: 'ex-lg-modal' });
        this.mr = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
            console.log(_this.closeResult);
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
            console.log(_this.closeResult);
        });
        // 树状图里面内容为空号
        this.setZtreeNode([]);
    };
    AdminComponent.prototype.getDismissReason = function (reason) {
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
    // 新增用户点击事件
    AdminComponent.prototype.addUser = function () {
        var that = this;
        var body = {
            'userName': this.user.userName,
            'password': this.user.password,
            'gender': this.user.gender,
            'avatarurl': this.user.avatar,
            'email': this.user.email,
            'mobile': this.user.mobile,
            'fullName': this.user.fullName,
            'nickName': this.user.nickName,
            'roles': this.user.roleIds,
            'customerId': this.currentCustomer.id || this.customerId,
        };
        this.adminService.addNewUser(body).subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '新增成功！',
                });
            },
            complete: function () {
                that.mr.close();
                that.getUserList();
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
    // 打开修改用户信息框
    AdminComponent.prototype.openUpdateUser = function (content, item) {
        var _this = this;
        var that = this;
        this.addOrUpdate = '修改用户';
        this.user.curUser = item; // 所修改的用户
        this.user.userName = item.userName;
        this.user.password = item.password;
        this.user.email = item.email;
        this.user.mobile = item.mobile;
        this.user.fullName = item.fullName;
        this.user.nickName = item.nickName;
        this.currentCustomer.id = item.customerId;
        this.currentCustomer.name = item.customerName;
        this.user.gender = String(item.gender);
        console.log(item);
        console.log(item.gender);
        this.user.avatar = item.avatarurl;
        this.user.roleListCheck = []; // 新建及修改用户时各角色的选中状态（check）
        this.user.roleIds = [];
        var userRoles = item.roles ? item.roles : []; // 为空时避免因undefined报错
        // this.roleList1.find((name) => name === userRoles[0]);
        this.roleList1.map(function (item1, i) {
            var sign = true; // 标记是否已checked
            for (var index = 0; index < userRoles.length; index++) {
                if (userRoles[index] === item1.name) {
                    sign = false;
                    that.user.roleListCheck.push({ check: true }); // 一一对应角色表roleList1
                    break;
                }
            }
            if (sign) {
                that.user.roleListCheck.push({ check: false });
            }
        });
        var modal = this.modalService.open(content, { windowClass: 'ex-lg-modal' });
        this.mr = modal;
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
            console.log(_this.closeResult);
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
            console.log(_this.closeResult);
        });
        this.setZtreeNode(userRoles);
    };
    // 修改用户点击事件
    AdminComponent.prototype.updataUser = function () {
        var that = this;
        var body = {
            'id': this.user.curUser.id,
            'userName': this.user.userName,
            'password': this.user.password,
            'gender': this.user.gender,
            'avatarurl': this.user.avatar,
            'email': this.user.email,
            'mobile': this.user.mobile,
            'fullName': this.user.fullName,
            'nickName': this.user.nickName,
            'roles': this.user.roleIds,
            'customerId': this.currentCustomer.id || this.customerId,
        };
        this.adminService.updateUser(body).subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '修改成功！',
                });
            },
            complete: function () {
                that.mr.close();
                that.getUserList();
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
    // 新建/修改用户点击事件
    AdminComponent.prototype.addorUpdt = function () {
        if (this.addOrUpdate === '新建用户') {
            this.addUser();
        }
        else {
            this.updataUser();
        }
    };
    // 删除设备弹框
    AdminComponent.prototype.openDelUser = function (content, item) {
        var that = this;
        this.user.itemDelId = item.id;
        var modal = this.modalService.open(content, { size: 'sm' });
        this.mr = modal;
    };
    // 删除设备规则
    AdminComponent.prototype.closeUser = function ($event) {
        console.log($event);
        if ($event === 'ok') {
            this.delUser();
        }
        this.mr.close();
    };
    // 删除设备-接口处
    AdminComponent.prototype.delUser = function () {
        var that = this;
        var id = this.user.itemDelId;
        var flag = false;
        var pages = (this.total + this.pageSize - 1) / this.pageSize;
        if (this.page >= pages && this.userList.length === 1) {
            flag = true;
        }
        this.adminService.deleteUser(id).subscribe({
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
                    that.getUserList();
                }
                else {
                    that.getUserList();
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 为新建用户选定角色，多选按键点击事件
    AdminComponent.prototype.addRoleToUser = function () {
        var that = this;
        this.user.roleIds = [];
        this.user.roleListCheck.map(function (item, i) {
            if (item.check === true) {
                var item1 = that.roleList1[i].id;
                if (item1) {
                    that.user.roleIds.push(item1);
                }
            }
        });
        console.log(this.user.roleIds);
    };
    AdminComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    AdminComponent.prototype.closeAlertModal = function (alert) {
        var index = this.alertsModal.indexOf(alert);
        this.alertsModal.splice(index, 1);
    };
    // 搜索Enter事件
    AdminComponent.prototype.onKeydown = function (event) {
        if (event.keyCode === 13) {
            this.execQuery();
        }
    };
    AdminComponent.prototype.setZtreeNode = function (userRoles) {
        var that = this;
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
        var zNodes = this.roleList1;
        this.zTreeObj1 = $.fn.zTree.init($('#treeDemo1'), setting, zNodes);
        var treeObj = $.fn.zTree.getZTreeObj('treeDemo1');
        userRoles.map(function (item, i) {
            var node = treeObj.getNodeByParam('name', item, null);
            if (node) {
                treeObj.checkNode(node, true, true);
                that.user.roleIds[i] = that.roleList1.find(function (t) { return t.name === item; }).id;
            }
        });
        console.log(that.user.roleIds);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AdminComponent.prototype, "alerts", void 0);
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'app-admin',
            templateUrl: './admin.component.html',
            styleUrls: ['./admin.component.scss']
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal,
            admin_service_1.AdminService,
            customer_service_1.CustomerService,
            angular_jwt_1.JwtHelperService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map