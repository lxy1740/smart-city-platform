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
var device_service_1 = require("../../../../service/device.service");
var grad_overlay_1 = require("../../../../service/grad.overlay");
var router_1 = require("@angular/router");
var ng2_file_upload_1 = require("ng2-file-upload");
var file_saver_1 = require("file-saver");
var XLSX = require("xlsx");
var angular_jwt_1 = require("@auth0/angular-jwt");
// const URL = '/api/';
var URL = 'http://test1.siid.com.cn';
var DeviceHomeComponent = /** @class */ (function () {
    function DeviceHomeComponent(router, modalService, deviceService, jwtHelper) {
        var _this = this;
        this.router = router;
        this.modalService = modalService;
        this.deviceService = deviceService;
        this.jwtHelper = jwtHelper;
        this.areashow = false; // 默认区域列表不显示
        this.cityshow = false; // 默认区域列表不显示
        this.deviceshow = false; // 默认设备列表不显示
        this.visible = true; // 控制可视区域
        this.parentNode = null; // 用于递归查询JSON树 父子节点
        this.node = null; // 用于递归查询JSON树 父子节点
        this.deviceslist = []; // 设备列表
        this.page = 1; // 分页
        this.pageSize = 10; // 分页
        this.total = 0; // 分页
        this.page2 = 1; // 分页
        this.pageSize2 = 5; // 分页
        this.total3 = 0; // 分页
        this.deviceModels = []; // 设备型号列表
        this.CustomerList = []; // 客户列表
        this.deviceModels1 = [];
        this.queryStr = ''; // 检索字符串
        this.queryStrPosi = ''; // 按区域显示的位置点，检索字符串
        this.device = {}; // 存储数据
        this.modelData = {
            title: '删除',
            body: 'hh',
        };
        this.posiListByRegion = []; // 按区域返回的位置点列表
        this.pagePosi = 1; // 分页
        this.pageSizePosi = 10; // 分页
        this.total1 = 0; // 分页
        this.showPosiTable = false; // 默认不显示表格内容，只显示表头
        this.parentDescription = ''; // 子设备
        this.fileUrl = ''; // 文件路径
        this.currentCustomer = {}; // 当前客户
        this.Customershow = false;
        this.parentId = 0; // 父组件id
        this.showonprogresslist = false; // 默认不显示日志消息
        this.logList = [
            { id: 'DM-0011', name: '设备安装日志', url: 'home/device/devices/install-log' },
            { id: 'DM-0012', name: '设备上下线日志', url: 'home/device/devices/line-log' },
        ];
        // 上传文件
        this.alertsModal = [];
        this.alerts = [];
        var that = this;
        var url = "/api/device/import";
        this.curModelIndex = 0; // 全选
        this.device.point = { lng: '', lat: '' };
        var token = localStorage.getItem('token');
        var tokenobj = this.jwtHelper.decodeToken(token);
        console.log(tokenobj);
        this.customerId = this.jwtHelper.decodeToken(token) && this.jwtHelper.decodeToken(token).customerid;
        // 上传文件
        this.uploader = new ng2_file_upload_1.FileUploader({
            // url: `${URL}/api/device/import`,
            url: url,
            headers: [{ name: 'Authorization', value: "Bearer " + localStorage.getItem('token') }
            ],
            disableMultipart: false,
        });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        this.response = '';
        this.uploader.response.subscribe(function (res) {
            _this.response = res;
            if (typeof (res) === 'string') {
                var res1 = JSON.parse(res);
                if (res1.errors) {
                    console.log(res1);
                    var message = res1.errors[0].defaultMessage;
                    that.alertsModal.push({
                        id: 1,
                        type: 'danger',
                        message: "\u4E0A\u4F20\u5931\u8D25: " + message + "\uFF01",
                    });
                }
                else {
                    that.alertsModal.push({
                        id: 1,
                        type: 'success',
                        message: '上传成功！',
                    });
                    that.backup = that.alertsModal.map(function (alert) { return Object.assign({}, alert); });
                }
            }
        });
        // 上传文件
    }
    // 上传文件
    DeviceHomeComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
        console.log(this.uploader);
    };
    // 上传文件
    DeviceHomeComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    // 上传文件
    DeviceHomeComponent.prototype.fileSelected = function (e) {
        console.log(e);
    };
    DeviceHomeComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    DeviceHomeComponent.prototype.closeAlertModal = function (alert) {
        var index = this.alertsModal.indexOf(alert);
        this.alertsModal.splice(index, 1);
    };
    DeviceHomeComponent.prototype.ngOnInit = function () {
        this.getCity();
        this.getAllDeviceModel();
        this.getDevicesList(this.page, this.pageSize);
        this.getCustomer();
    };
    // 下载文件
    DeviceHomeComponent.prototype.domnload = function () {
        window.open(URL + "/resources/template/device-template.xlsx");
    };
    DeviceHomeComponent.prototype.selectedFileOnChanged = function (event) {
        this.fileUrl = event.target.value;
    };
    // 属性页面
    DeviceHomeComponent.prototype.goToZheRoute = function (para) {
        var id = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            id[_i - 1] = arguments[_i];
        }
        if (id) {
            this.router.navigate([para, { deviceId: id[0], modelId: id[1], deviceName: id[2] }]);
        }
        else {
            this.router.navigate([para]);
        }
    };
    // 获取设备型号列表
    DeviceHomeComponent.prototype.getAllDeviceModel = function () {
        var that = this;
        this.deviceService.getAllDeviceModel(0, 1, 20).subscribe({
            next: function (val) {
                that.deviceModels1 = val.items;
                that.deviceModels = val.items.map(function (item) { return Object.assign({}, item); });
                that.deviceModels.unshift({ id: 0, name: '不限' }); // 所有项
                that.currentModel = that.deviceModels[0]; // 默认显示“不限”
                that.curModelIndex = that.currentModel.id; // 标识
                that.device.model = that.deviceModels1[0];
            },
            complete: function () { },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 获取设备分页
    DeviceHomeComponent.prototype.getDevicesList = function (page, pageSize) {
        var that = this;
        this.deviceService.getAllDeviceByModel(this.queryStr, this.curModelIndex, page, pageSize, this.devicePid).subscribe({
            next: function (val) {
                that.deviceslist = val.items;
                that.total = val.total;
            },
            complete: function () { },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 设备类型选择
    DeviceHomeComponent.prototype.deviceTypeChange = function () {
        this.curModelIndex = this.currentModel.id;
        this.page = 1;
        this.getDevicesList(this.page, this.pageSize);
        // 显示特定型号的设备列表分页
    };
    // 检索按键点击事件
    DeviceHomeComponent.prototype.execQuery = function () {
        this.page = 1;
        this.getDevicesList(this.page, this.pageSize);
    };
    // 子设备
    DeviceHomeComponent.prototype.searchSubDevice = function (devicePid, description) {
        this.page = 1;
        this.devicePid = devicePid;
        this.parentDescription = description;
        console.log(this.devicePid);
        this.getDevicesList(this.page, this.pageSize);
    };
    DeviceHomeComponent.prototype.descriptionClose = function () {
        this.devicePid = undefined;
        this.parentDescription = '';
        console.log(this.devicePid);
        this.getDevicesList(this.page, this.pageSize);
    };
    // 批量导出
    DeviceHomeComponent.prototype.output = function () {
        var that = this;
        this.deviceService.getAllDeviceByModel(this.queryStr, this.curModelIndex, -1, -1, this.devicePid).subscribe({
            next: function (val) {
                // that.deviceslist = val.items;
                // that.total = val.total;
                console.log(val);
                var a = [];
                a.push(['设备名称', '设备描述', 'SECRET', 'KEY', '设备型号', '位置编号', '客户编号']);
                val.items.map(function (item) {
                    a.push([item.name, item.description, item.secret, item.key, item.modelName, item.positionNumber, item.customerCode]);
                });
                that.daochu(a);
            },
            complete: function () { },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 导出
    DeviceHomeComponent.prototype.daochu = function (data) {
        /* generate worksheet */
        var ws = XLSX.utils.aoa_to_sheet(data);
        // const ws2: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
        /* generate workbook and add the worksheet */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        // XLSX.utils.book_append_sheet(wb, ws2, 'Sheet2');
        console.log(wb);
        /* save to file */
        XLSX.writeFile(wb, 'device.xlsx');
    };
    // 导出表格
    DeviceHomeComponent.prototype.exportTable = function () {
        var blob = new Blob([document.getElementById('exportableTable').innerHTML], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        });
        file_saver_1.saveAs(blob, 'device.xlsx');
    };
    // 分页
    DeviceHomeComponent.prototype.pageChange = function () {
        this.getDevicesList(this.page, this.pageSize);
    };
    // 分页
    DeviceHomeComponent.prototype.pageChange2 = function () {
        this.getCustomer();
    };
    DeviceHomeComponent.prototype.pageChangePosi = function () {
        this.getPosiByRegionId(this.currentRegion.id, this.pagePosi, this.pageSizePosi);
    };
    // 分页获取道路
    DeviceHomeComponent.prototype.getCustomer = function () {
        var that = this;
        this.deviceService.getCustomer(this.page2, this.pageSize2, '')
            .subscribe({
            next: function (val) {
                that.CustomerList = val.items;
                that.CustomerList.unshift({ 'name': '平台用户', code: '' }); // 添加平台用户
                that.total3 = val.total;
                console.log(that.total3);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 选择客户
    DeviceHomeComponent.prototype.selecteCustomer = function (item) {
        this.currentCustomer = item;
        this.Customershow = false;
        this.getCity(item.id);
    };
    // 显示客户
    DeviceHomeComponent.prototype.showCustomer = function () {
        this.Customershow = true;
    };
    // 离开客户
    DeviceHomeComponent.prototype.CustomerlistMouseleave = function () {
        this.Customershow = false;
    };
    // 批量导入弹窗
    DeviceHomeComponent.prototype.openAddSurveys = function (content) {
        var _this = this;
        var that = this;
        this.modalService.open(content, { size: 'lg' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
            console.log(_this.closeResult);
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
            console.log(_this.closeResult);
        });
    };
    // 新建设备弹框
    DeviceHomeComponent.prototype.openNewSurvey = function (content) {
        var _this = this;
        this.addOrUpdate = '新建设备';
        // this.alertsModal = [];
        this.device.name = '';
        this.device.model = this.deviceModels1[0];
        this.device.descr = '';
        // this.device.bindedPosi = this.bindedPosition;
        this.bindedPosition = null;
        var modal = this.modalService.open(content, { windowClass: 'ex-lg-modal' });
        this.mr = modal;
        this.addBaiduMap();
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
            _this.showPosiTable = false;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
            _this.showPosiTable = false;
        });
    };
    DeviceHomeComponent.prototype.addorUpdate = function (addOrUpdate) {
        if (addOrUpdate === '新建设备') {
            this.addDevice();
        }
        else {
            this.device.modelId = this.device.model.id; // 关闭模态框时同步modelId以便更新。device.model为双向绑定的设备类型
            this.updataDevice();
        }
    };
    // 详情
    // 判断数组中是否存在值
    DeviceHomeComponent.prototype.getture = function (str) {
        var Authorities = JSON.parse(localStorage.getItem('Authorities'));
        var Auth = Authorities ? Authorities.Authorities : [];
        var res = false;
        if (str === 'HP-000') {
            res = true;
            return res;
        }
        Auth.map(function (item) {
            if (item === str) {
                res = true;
                return res;
            }
        });
        return res;
    };
    // 新增设备
    DeviceHomeComponent.prototype.addDevice = function () {
        var that = this;
        console.log(this.device);
        var body = {
            'name': this.device.name,
            'modelId': this.device.model.id,
            'description': this.device.descr,
            'positionId': this.bindedPosition ? this.bindedPosition.id : null,
            'point': {
                'lat': this.bindedPosition && this.bindedPosition.point.lat,
                'lng': this.bindedPosition && this.bindedPosition.point.lng
            },
            'customerId': this.currentCustomer.id || this.customerId,
            'parentId': this.currentCustomer.parentId
        };
        this.deviceService.addNewDevice(body).subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: "\u65B0\u5EFA\u6210\u529F",
                });
                that.backup = that.alerts.map(function (alert) { return Object.assign({}, alert); });
                that.mr.close();
            },
            complete: function () {
                that.getDevicesList(that.page, that.pageSize);
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
    // 修改设备弹框
    DeviceHomeComponent.prototype.openUpdataDevice = function (content, item, i) {
        var _this = this;
        this.queryStrPosi = '';
        this.addOrUpdate = '更新设备';
        var that = this;
        // this.alertsModal = [];
        this.getPosiById(item.positionId); // device.positionId -> position. (设备->位置点)
        console.log(this.device.parentId);
        this.device.updateId = item.id;
        this.device.name = item.name;
        this.device.point = item.point;
        this.currentCustomer.id = item.customerId; // 当前客户
        this.currentCustomer.name = item.customerName; // 当前客户
        var id = item.modelId;
        this.device.descr = item.description;
        // 传入当前设备的类型
        for (var index = 0; index < this.deviceModels1.length; index++) {
            var element = that.deviceModels1[index];
            if (id === element.id) {
                that.device.model = that.deviceModels1[index]; // 设备型号为传入的item的型号
                break;
            }
        }
        var modal = this.modalService.open(content, { windowClass: 'ex-lg-modal' });
        this.mr = modal;
        this.addBaiduMap();
        // this.getPositionById(item.positionId);
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
            console.log(_this.closeResult);
        });
    };
    // 获取位置信息
    DeviceHomeComponent.prototype.getPositionById = function (id) {
        this.deviceService.getPositionById(id).subscribe({
            next: function (val) {
                console.log(val);
            }
        });
    };
    // 修改设备信息
    DeviceHomeComponent.prototype.updataDevice = function () {
        var that = this;
        var body = {
            'id': this.device.updateId,
            'name': this.device.name,
            'modelId': this.device.model.id,
            'description': this.device.descr,
            'positionId': this.bindedPosition ? this.bindedPosition.id : null,
            'point': {
                'lat': this.bindedPosition && this.bindedPosition.point.lat,
                'lng': this.bindedPosition && this.bindedPosition.point.lng
            },
            'customerId': this.currentCustomer.id || this.customerId,
        };
        this.deviceService.updateDevice(body).subscribe({
            next: function (val) {
                that.alerts.push({
                    id: 1,
                    type: 'success',
                    message: '修改成功！',
                });
                that.mr.close();
            },
            complete: function () {
                that.getDevicesList(that.page, that.pageSize);
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
    // 删除设备弹框
    DeviceHomeComponent.prototype.openDelDevice = function (content, item) {
        this.device.itemDelId = item.id;
        var modal = this.modalService.open(content, { size: 'sm' });
        this.mr = modal;
    };
    // 删除设备规则
    DeviceHomeComponent.prototype.closeDevice = function ($event) {
        console.log($event);
        if ($event === 'ok') {
            this.delDevice();
        }
        this.mr.close();
    };
    // 删除设备-接口处
    DeviceHomeComponent.prototype.delDevice = function () {
        var that = this;
        var id = this.device.itemDelId;
        var flag = false;
        var pages = (this.total + this.pageSize - 1) / this.pageSize;
        if (this.page >= pages && this.deviceslist.length === 1) {
            flag = true;
        }
        this.deviceService.delDevice(id).subscribe({
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
                    that.getDevicesList(that.page, that.pageSize);
                }
                else {
                    that.getDevicesList(that.page, that.pageSize);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // position表点击事件
    DeviceHomeComponent.prototype.bindPosition = function (position) {
        this.curPosition = position;
        this.bindedPosition = position;
        this.map.clearOverlays();
        var point = new BMap.Point(position.point.lng, position.point.lat);
        this.map.centerAndZoom(point, 18);
        var mySquare = new grad_overlay_1.GradOverlar(point, 50, 'tag-bule');
        this.map.addOverlay(mySquare);
    };
    DeviceHomeComponent.prototype.addBaiduMap = function () {
        var map = this.map = new BMap.Map('survey_map', {
            enableMapClick: true,
        }); // 创建地图实例
        var point = new BMap.Point(113.922329, 22.49656); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
        map.centerAndZoom(point, 17); // 设置中心和地图显示级别
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        map.setMapStyle({ style: 'normal' });
    };
    DeviceHomeComponent.prototype.getDismissReason = function (reason) {
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
    // 根据设备型号id返回设备型号名称
    DeviceHomeComponent.prototype.modelName = function (modelId) {
        var modelName = null;
        this.deviceModels.map(function (item, i) {
            if (item.id === modelId) {
                modelName = item.name;
            }
        });
        // console.log(modelName);
        return modelName;
    };
    // 根据设备型号id返回设备型号名称
    DeviceHomeComponent.prototype.isGateway = function (modelId) {
        var flag = false;
        this.deviceModels.map(function (item, i) {
            if (item.id === modelId && item.isGateway) {
                flag = true;
            }
        });
        // console.log(flag);
        return flag;
    };
    // 搜索Enter事件
    DeviceHomeComponent.prototype.onKeydown = function (event) {
        if (event.keyCode === 13) {
            this.execQuery();
        }
    };
    // 根据positionId返回指定位置点
    DeviceHomeComponent.prototype.getPosiById = function (id) {
        if (!id) {
            return;
        }
        var that = this;
        var curPosition;
        this.deviceService.getPosiById(id).subscribe({
            next: function (val) {
                curPosition = val;
                that.bindedPosition = val;
                that.updatePosiRegion(val.regionId);
            },
            complete: function () {
                that.bindPosition(curPosition);
                that.getPosiByRegionId(curPosition.regionId, 1, that.pageSizePosi);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 传入'修改设备位置点所在区域'到模态框
    DeviceHomeComponent.prototype.updatePosiRegion = function (regionId) {
        var that = this;
        var region_id = regionId.toString().slice(0, 4); // 当前城市id
        console.log(region_id);
        this.node = null; // 用于递归查询JSON树 父子节点 currentRegion
        this.currentCity = this.getNode(this.cityList, region_id); // 当前城市
        console.log(this.currentCity);
        this.currentAreaList = this.currentCity ? this.currentCity.children : []; // 当前城市下的区域列表区域
        var area_id = regionId; // 当前区域id
        this.node = null; // 用于递归查询JSON树 父子节点
        this.currentRegion = this.getNode(this.cityList, area_id); // 当前区域
    };
    DeviceHomeComponent.prototype.getCity = function () {
        var cusid = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cusid[_i] = arguments[_i];
        }
        var that = this;
        this.deviceService.getZoneDefault(cusid).subscribe({
            next: function (val) {
                if (!val) {
                    that.cityList = [];
                    that.currentCity = null;
                    that.currentAreaList = [];
                    that.currentRegion = null;
                    that.alertsModal.push({
                        id: 1,
                        type: 'danger',
                        message: "\u8BE5\u5BA2\u6237\u5B89\u88C5\u533A\u57DF\u4E3A\u7A7A\uFF01",
                    });
                    return;
                }
                that.cityList = val.regions;
                that.node = null; // 用于递归查询JSON树 父子节点
                that.currentCity = that.getNode(val.regions, val.regions[0].children[0].id); // 当前城市
                that.currentAreaList = that.currentCity.children; // 当前城市下的区域列表
                that.currentRegion = that.currentAreaList && that.currentAreaList[0]
                    && that.currentAreaList[0].children && that.currentAreaList[0].children[0]; // 当前区域
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    DeviceHomeComponent.prototype.switchZone = function (level) {
        var zone = 12;
        switch (level) {
            case 1:
                zone = 10;
                break;
            case 2:
                zone = 12;
                break;
            case 3:
                zone = 15;
                break;
            case 4:
                zone = 17;
                break;
            default:
                break;
        }
        return zone;
    };
    DeviceHomeComponent.prototype.getNode = function (json, nodeId) {
        var that = this;
        // 1.第一层 root 深度遍历整个JSON
        for (var i = 0; i < json.length; i++) {
            if (that.node) {
                break;
            }
            var obj = json[i];
            // 没有就下一个
            if (!obj || !obj.id) {
                continue;
            }
            // 2.有节点就开始找，一直递归下去
            if (obj.id === nodeId) {
                // 找到了与nodeId匹配的节点，结束递归
                that.node = obj;
                break;
            }
            else {
                // 3.如果有子节点就开始找
                if (obj.children) {
                    // 4.递归前，记录当前节点，作为parent 父亲
                    that.parentNode = obj;
                    // 递归往下找
                    that.getNode(obj.children, nodeId);
                }
                else {
                    // 跳出当前递归，返回上层递归
                    continue;
                }
            }
        }
        // 5.如果木有找到父节点，置为null，因为没有父亲
        if (!that.node) {
            that.parentNode = null;
        }
        return that.node;
    };
    DeviceHomeComponent.prototype.getPoint = function (baiduMap, city) {
        var zoom = this.zoom = this.switchZone(city.level);
        var pt = city.center;
        var point = new BMap.Point(pt.lng, pt.lat);
        baiduMap.centerAndZoom(point, zoom);
    };
    // 选择区域
    // 选择城市
    DeviceHomeComponent.prototype.selecteCity = function (city) {
        this.device.installZoneId = city.installZoneId; // 安装区域
        this.device.point = { lng: '', lat: '' };
        this.currentCity = city;
        this.currentAreaList = city.children;
        console.log(city);
        this.currentRegion = null;
        this.node = city;
        this.getPoint(this.map, city); // 解析地址- 设置中心和地图显示级别
        this.pagePosi = 1;
        this.getPosiByRegionId(this.currentCity.id, this.pagePosi, this.pageSizePosi);
    };
    // 街道点击事件
    DeviceHomeComponent.prototype.selecteblock = function (block) {
        this.queryStrPosi = '';
        this.getPoint(this.map, block); // 解析地址- 设置中心和地图显示级别
        this.currentRegion = block;
        this.device.point = { lng: '', lat: '' };
        this.pagePosi = 1;
        this.getPosiByRegionId(this.currentRegion.id, this.pagePosi, this.pageSizePosi);
    };
    // 新建/修改设备中检索点击事件
    DeviceHomeComponent.prototype.execQueryPosi = function () {
        this.pagePosi = 1;
        this.getPosiByRegionId(this.currentRegion.id, this.pagePosi, this.pageSizePosi);
    };
    // 通过安装区域和检索字符串获取位置点
    DeviceHomeComponent.prototype.getPosiByRegionId = function (regionId, page, pageSize) {
        var that = this;
        this.showPosiTable = true;
        this.deviceService.getAllPosiByRegionId(this.queryStrPosi, regionId, page, pageSize).subscribe({
            next: function (val) {
                that.posiListByRegion = val.items;
                that.total1 = val.total;
            },
            complete: function () { },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 显示区域
    DeviceHomeComponent.prototype.showArea = function () {
        this.areashow = true;
    };
    // 显示城市
    DeviceHomeComponent.prototype.showCiyt = function () {
        this.cityshow = true;
    };
    // 选择区域
    DeviceHomeComponent.prototype.arealistMouseover = function (area) {
        this.currentBlock = area.children;
    };
    // 离开区域
    DeviceHomeComponent.prototype.arealistMouseleave = function () {
        this.areashow = false;
        this.currentBlock = null;
    };
    // 离开城市
    DeviceHomeComponent.prototype.citylistMouseleave = function () {
        this.cityshow = false;
    };
    DeviceHomeComponent.prototype.arealistMouseNone = function () {
        this.areashow = true;
        this.currentBlock = null;
    };
    // 显示 日志 消息
    DeviceHomeComponent.prototype.showOnprogressList = function () {
        this.showonprogresslist = true;
    };
    // 离开 日志 消息
    DeviceHomeComponent.prototype.messageListMouseleave_2 = function () {
        this.showonprogresslist = false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DeviceHomeComponent.prototype, "alertsModal", void 0);
    DeviceHomeComponent = __decorate([
        core_1.Component({
            selector: 'app-devices',
            templateUrl: './device-home.component.html',
            styleUrls: ['./device-home.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router, ng_bootstrap_1.NgbModal,
            device_service_1.DeviceService,
            angular_jwt_1.JwtHelperService])
    ], DeviceHomeComponent);
    return DeviceHomeComponent;
}());
exports.DeviceHomeComponent = DeviceHomeComponent;
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: 	devices.component.ts
@time: 2018 / 7 / 2 17: 18

*/
//# sourceMappingURL=device-home.component.js.map