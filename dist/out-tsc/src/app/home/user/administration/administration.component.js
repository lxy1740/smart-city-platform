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
var AdministrationComponent = /** @class */ (function () {
    function AdministrationComponent(roadService, modalService) {
        this.roadService = roadService;
        this.modalService = modalService;
        this.queryStr = '';
        this.page = 1;
        this.pageSize = 10;
        this.total = 0;
        this.regionsList = [];
        this.regionsListChildren = [];
        this.administration = {}; // 存储数据
        this.allRegin = [];
        this.parent = {
            id: '',
            name: '所有'
        };
        this.modelData = {
            title: '删除',
        };
        this.region = {}; // 删除当前
        this.addOrUpdate = '新增行政区域';
        this.RegionMODEL = {
            center: { lng: '', lat: '' },
            name: '',
            children: [],
            level: 1,
            id: null,
            parentId: null,
        }; // 新增数据类
        this.map = {}; // 地图
        this.address = '';
        this.alerts = []; // 信息弹框
        this.alertsModal = []; // 信息弹框
        // 树的操作
        // 点击
        var that = this;
        this.zTreeOnClick = function (event, treeId, treeNode) {
            that.parent.id = treeNode.id;
            that.parent.name = treeNode.name;
            that.RegionMODEL.level = treeNode.level + 1;
            that.RegionMODEL.parentId = treeNode.id;
            that.page = 1;
            that.getChildRegions();
        };
        // this.regionsList = window.localStorage.regionsList ? JSON.parse(window.localStorage.regionsList) : [];
        this.allRegin.push({
            full_name: '北京市',
            id: '',
            level: 0,
            name: '所有',
            open: true,
            children: this.regionsList,
        });
    }
    AdministrationComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    AdministrationComponent.prototype.closeAlertModal = function (alert) {
        var index = this.alertsModal.indexOf(alert);
        this.alertsModal.splice(index, 1);
    };
    AdministrationComponent.prototype.reset = function () {
        this.alerts = this.backup.map(function (alert) { return Object.assign({}, alert); });
    };
    AdministrationComponent.prototype.ngOnInit = function () {
        // 树结构
        this.getZoneTree();
        this.getRegions();
        this.getChildRegions();
    };
    AdministrationComponent.prototype.adGeocoder = function (name) {
        var myGeo = new BMap.Geocoder();
        var that = this;
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(name, function (point) {
            if (point) {
                that.map.centerAndZoom(point, 7);
                that.map.addOverlay(new BMap.Marker(point));
                that.RegionMODEL.center.lng = point.lng;
                that.RegionMODEL.center.lat = point.lat;
            }
            else {
                alert('您选择地址没有解析到结果!');
            }
        }, '');
    };
    // 添加地图实例
    AdministrationComponent.prototype.addBaiduMap = function () {
        var center = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            center[_i] = arguments[_i];
        }
        var map = this.map = new BMap.Map('position_map', {
            enableMapClick: true,
        }); // 创建地图实例
        var point;
        if (center) {
            point = new BMap.Point(center[0].lng, center[0].lat);
        }
        else {
            point = new BMap.Point(113.922329, 22.49656); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
        }
        map.centerAndZoom(point, 7);
        map.addOverlay(new BMap.Marker(point));
        // map.centerAndZoom(point, 5); // 设置中心和地图显示级别
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        // 添加控件缩放
        // const offset = this.visible === true ? new BMap.Size(20, 140) : new BMap.Size(20, 15);
        var offset = new BMap.Size(5, 5);
        var navigationControl = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            offset: offset,
        });
        map.addControl(navigationControl);
        map.setMapStyle({ style: 'normal' });
        this.mapClickOff(map);
    };
    // 监控-点击地图事件
    AdministrationComponent.prototype.mapClickOff = function (baiduMap) {
        var that = this;
        baiduMap.addEventListener('click', function (e) {
            that.RegionMODEL.center = e.point;
        });
    };
    AdministrationComponent.prototype.allRegions = function () {
        this.parent.id = '';
        this.parent.name = '所有';
        this.getChildRegions();
    };
    // 获取行政区域
    AdministrationComponent.prototype.getRegions = function () {
        var that = this;
        this.roadService.getRegions()
            .subscribe({
            next: function (val) {
                that.regionsList = val;
                that.allRegin = [];
                that.allRegin.push({
                    full_name: '所有',
                    id: '',
                    level: 0,
                    name: '所有',
                    open: true,
                    children: that.regionsList,
                });
                // // window.localStorage.regionsList = JSON.stringify(val);
            },
            complete: function () {
                that.getZoneTree();
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 获取孩子行政区域-
    AdministrationComponent.prototype.getChildRegions = function () {
        var that = this;
        // this.roadService.getChildRegions(parentId, this.page, this.pageSize, this.queryStr)
        this.roadService.getChildRegions(this.parent.id, this.page, this.pageSize, this.queryStr)
            .subscribe({
            next: function (val) {
                that.regionsListChildren = val.items;
                that.total = val.total;
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 新建 or 修改
    AdministrationComponent.prototype.addorUpdate = function () {
        if (this.addOrUpdate === '新增行政区域') {
            this.addRegions();
        }
        else {
            this.updetRegions();
        }
    };
    // 新增行政区域
    AdministrationComponent.prototype.addRegions = function () {
        var that = this;
        var body = {
            center: this.RegionMODEL.center,
            children: this.RegionMODEL.children,
            name: this.RegionMODEL.name,
            parentId: this.RegionMODEL.parentId,
        };
        this.roadService.addRegions(body)
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
                that.getChildRegions();
                that.getRegions();
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
    // 修改行政区域
    AdministrationComponent.prototype.updetRegions = function () {
        var that = this;
        this.roadService.updetRegions(this.RegionMODEL)
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
                that.getChildRegions();
                that.getRegions();
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
    // 删除行政区域
    AdministrationComponent.prototype.delRegions = function () {
        var that = this;
        var id = this.region.itemDelId;
        var ids = [];
        ids.push(id);
        var body = {
            ids: ids
        };
        this.roadService.delRegions(body)
            .subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '删除成功！',
                });
            },
            complete: function () {
                that.getChildRegions();
                that.getRegions();
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 新建弹框
    AdministrationComponent.prototype.openNew = function (content) {
        var that = this;
        this.RegionMODEL.center = { lng: '', lat: '' };
        this.RegionMODEL.name = '';
        this.address = '';
        this.RegionMODEL.children = [];
        // delete this.RegionMODEL.id;
        // 新增数据类
        this.addOrUpdate = '新增行政区域';
        var modal = this.modalService.open(content, { size: 'lg' });
        this.mr = modal;
        this.addBaiduMap();
        modal.result.then(function (result) {
            // this.showPosiTable = false;
        }, function (reason) {
            // this.showPosiTable = false;
        });
        // 树结构，树设置
        // this.setZtreeNode([]);
    };
    // 修改弹框
    AdministrationComponent.prototype.openUpdata = function (content, item) {
        var that = this;
        this.addOrUpdate = '修改行政区域';
        this.RegionMODEL.id = item.id;
        this.RegionMODEL.name = item.name;
        this.RegionMODEL.center = item.center;
        this.RegionMODEL.level = item.level;
        this.address = item.full_name;
        var modal = this.modalService.open(content, { size: 'lg' });
        this.mr = modal;
        this.addBaiduMap(item.center);
        modal.result.then(function (result) {
            // this.showPosiTable = false;
        }, function (reason) {
            // this.showPosiTable = false;
        });
        // 树结构，树设置
        // this.setZtreeNode(this.regionsIds);
    };
    // 删除弹框
    AdministrationComponent.prototype.openDel = function (content, item) {
        this.region.itemDelId = item.id;
        var modal = this.modalService.open(content, { size: 'sm' });
        this.mr = modal;
    };
    // 删除设备规则
    AdministrationComponent.prototype.closeDelRegions = function ($event) {
        console.log($event);
        if ($event === 'ok') {
            this.delRegions();
        }
        this.mr.close();
    };
    // 分页
    AdministrationComponent.prototype.pageChange = function () {
        this.getChildRegions();
    };
    // 点击搜索
    AdministrationComponent.prototype.execQuery = function () {
        this.page = 1;
        this.getChildRegions();
    };
    AdministrationComponent.prototype.getZoneTree = function () {
        var that = this;
        var setting = {
            view: {
                selectedMulti: true,
                dblClickExpand: false,
                showLine: true,
            },
            // check: {
            //   enable: true,
            //   chkStyle: 'radio',
            //   radioType: 'all', // 对所有树实现单选
            //   chkboxType: { 'Y': 'ps', 'N': 'ps' }
            // },
            callback: {
                onClick: this.zTreeOnClick,
                onCheck: this.zTreeOnCheck // 勾选事件
            },
            key: {
                region_id: 'region_id',
                name: 'name',
            }
        };
        this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, this.allRegin);
    };
    __decorate([
        core_1.ViewChild('map1'),
        __metadata("design:type", core_1.ElementRef)
    ], AdministrationComponent.prototype, "map_container", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AdministrationComponent.prototype, "alerts", void 0);
    AdministrationComponent = __decorate([
        core_1.Component({
            selector: 'app-administration',
            templateUrl: './administration.component.html',
            styleUrls: ['./administration.component.scss']
        }),
        __metadata("design:paramtypes", [road_service_1.RoadService,
            ng_bootstrap_1.NgbModal])
    ], AdministrationComponent);
    return AdministrationComponent;
}());
exports.AdministrationComponent = AdministrationComponent;
//# sourceMappingURL=administration.component.js.map