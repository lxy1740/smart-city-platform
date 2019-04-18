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
var road_service_1 = require("../../../service/road.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var RoadComponent = /** @class */ (function () {
    function RoadComponent(roadService, modalService) {
        this.roadService = roadService;
        this.modalService = modalService;
        this.roadList = [];
        this.regionsList = [];
        this.queryStr = '';
        this.page = 1;
        this.pageSize = 10;
        this.total = 0;
        this.addOrUpdate = '新建道路'; // 新建/修改标识
        this.ROADMODEL = {};
        this.road = {};
        this.regionsIds = [];
        this.modelData = {
            title: '删除',
        };
        this.alerts = []; // 信息弹框
        this.alertsModal = []; // 信息弹框
        var that = this;
        // 树的操作
        // 点击
        this.zTreeOnCheck = function (event, treeId, treeNode) {
            // 获取树的节点
            var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
            var nodes = treeObj.getCheckedNodes(true);
            console.log(nodes);
            that.ROADMODEL.regions = [];
            nodes.map(function (item) {
                that.ROADMODEL.regions.push({
                    center: item.center,
                    full_name: item.full_name,
                    id: item.id,
                    name: item.name,
                    level: item.level,
                });
            });
            console.log(that.ROADMODEL.regions);
        };
        this.ROADMODEL.regions = [];
        // this.regionsList = window.localStorage.regionsList ? JSON.parse(window.localStorage.regionsList) : [];
    }
    RoadComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    RoadComponent.prototype.closeAlertModal = function (alert) {
        var index = this.alertsModal.indexOf(alert);
        this.alertsModal.splice(index, 1);
    };
    RoadComponent.prototype.reset = function () {
        this.alerts = this.backup.map(function (alert) { return Object.assign({}, alert); });
    };
    RoadComponent.prototype.ngOnInit = function () {
        this.getRegions();
        this.getlogs();
    };
    RoadComponent.prototype.setZtreeNode = function (regionsIds) {
        var that = this;
        console.log(regionsIds);
        console.log('regionsIds');
        // 树结构，树设置
        this.getZoneTree();
        // treeDemo界面中加载ztree的div
        var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
        if (!regionsIds) {
            return;
        }
        regionsIds.map(function (item, i) {
            var node = treeObj.getNodeByParam('id', item, null); // 传入id
            if (node) {
                treeObj.checkNode(node, true, false); // 此处是用户勾选
                // this.findParent(node.getParentNode());
            }
        });
    };
    // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
    RoadComponent.prototype.getZoneTree = function () {
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
        this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, this.regionsList);
    };
    // 获取行政区域
    RoadComponent.prototype.getRegions = function () {
        var that = this;
        this.roadService.getRegions()
            .subscribe({
            next: function (val) {
                that.regionsList = val;
                // window.localStorage.regionsList = JSON.stringify(val);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 分页获取道路
    RoadComponent.prototype.getlogs = function () {
        var that = this;
        this.roadService.getRoads(this.page, this.pageSize, this.queryStr)
            .subscribe({
            next: function (val) {
                that.roadList = val.items;
                that.total = val.total;
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 添加道路
    RoadComponent.prototype.addRoads = function () {
        var that = this;
        var body = {
            wayName: this.ROADMODEL.wayName,
            regions: this.ROADMODEL.regions
        };
        this.roadService.addRoads(body)
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
                that.getlogs();
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
    // 删除道路
    RoadComponent.prototype.delroads = function () {
        var that = this;
        var id = this.road.itemDelId;
        var wayIds = [];
        wayIds.push(id);
        var body = {
            wayIds: wayIds
        };
        this.roadService.delRoads(body)
            .subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '删除成功！',
                });
            },
            complete: function () {
                that.getlogs();
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 修改道路
    RoadComponent.prototype.updetaRoads = function () {
        var that = this;
        var body = {
            wayName: this.ROADMODEL.wayName,
            regions: this.ROADMODEL.regions,
            wayId: this.ROADMODEL.wayId
        };
        this.roadService.updetaRoads(body)
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
                that.getlogs();
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
    // 返回
    RoadComponent.prototype.goback = function () {
        window.history.back();
    };
    // 新建道路弹框
    RoadComponent.prototype.openNew = function (content) {
        var that = this;
        this.addOrUpdate = '新建道路';
        var modal = this.modalService.open(content);
        this.mr = modal;
        modal.result.then(function (result) {
            // this.showPosiTable = false;
        }, function (reason) {
            // this.showPosiTable = false;
        });
        // 树结构，树设置
        this.setZtreeNode([]);
    };
    // 修改弹框
    RoadComponent.prototype.openUpdata = function (content, item) {
        var that = this;
        this.addOrUpdate = '修改道路';
        this.ROADMODEL.wayId = item.wayId;
        this.ROADMODEL.wayName = item.wayName;
        this.ROADMODEL.regions = item.regions;
        this.regionsIds = this.getkeys(item.regions);
        console.log('ROADMODEL');
        console.log(this.ROADMODEL);
        var modal = this.modalService.open(content);
        this.mr = modal;
        modal.result.then(function (result) {
            // this.showPosiTable = false;
        }, function (reason) {
            // this.showPosiTable = false;
        });
        // 树结构，树设置
        this.setZtreeNode(this.regionsIds);
    };
    // 获取对象value
    RoadComponent.prototype.getkeys = function (arr) {
        // if (!obj) {
        //   return;
        // }
        // return Object.keys(obj);
        var ids = [];
        if (!arr) {
            return ids;
        }
        arr.map(function (item) {
            ids.push(item.id);
        });
        return ids;
    };
    // 新建道路 or 修改
    RoadComponent.prototype.addorUpdate = function () {
        if (this.addOrUpdate === '新建道路') {
            this.addRoads();
        }
        else {
            this.updetaRoads();
        }
    };
    // 删除弹框
    RoadComponent.prototype.openDel = function (content, item) {
        this.road.itemDelId = item.wayId;
        var modal = this.modalService.open(content, { size: 'sm' });
        this.mr = modal;
    };
    // 删除设备规则
    RoadComponent.prototype.closeDelRoad = function ($event) {
        console.log($event);
        if ($event === 'ok') {
            this.delroads();
        }
        this.mr.close();
    };
    // 分页获取数据
    RoadComponent.prototype.pageChange = function () {
        this.getlogs();
    };
    // 搜索
    RoadComponent.prototype.dataSearch = function () {
        this.page = 1;
        this.getlogs();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], RoadComponent.prototype, "alerts", void 0);
    RoadComponent = __decorate([
        core_1.Component({
            selector: 'app-road',
            templateUrl: './road.component.html',
            styleUrls: ['./road.component.scss']
        }),
        __metadata("design:paramtypes", [road_service_1.RoadService,
            ng_bootstrap_1.NgbModal])
    ], RoadComponent);
    return RoadComponent;
}());
exports.RoadComponent = RoadComponent;
//# sourceMappingURL=road.component.js.map