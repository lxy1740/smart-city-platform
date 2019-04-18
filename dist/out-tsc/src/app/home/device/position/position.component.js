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
var position_service_1 = require("../../../service/position.service");
var grad_overlay_1 = require("../../../service/grad.overlay");
var angular_jwt_1 = require("@auth0/angular-jwt");
var PositionComponent = /** @class */ (function () {
    function PositionComponent(modalService, positionService, jwtHelper) {
        this.modalService = modalService;
        this.positionService = positionService;
        this.jwtHelper = jwtHelper;
        this.model = {}; // 存储数据
        this.deviceList = []; // 设备列表
        this.deviceTypes = []; // 设备列表
        this.areashow = false; // 默认区域列表不显示
        this.cityshow = false; // 默认区域列表不显示
        this.wayshow = false; // 默认道路列表不显示
        this.Customershow = false; // 默认客户列表不显示
        this.visible = true; // 控制可视区域
        this.parentNode = null; // 用于递归查询JSON树 父子节点
        this.node = null; // 用于递归查询JSON树 父子节点---当前城市
        this.positionListItems = []; // 位置列表
        this.roadList = []; // 道路列表
        this.CustomerList = []; // CustomerList列表
        this.total = 0; // 分页
        this.page = 1; // 分页
        this.pagesize = 10; // 分页
        this.total1 = 0; // 分页
        this.page1 = 1; // 分页
        this.pageSize1 = 10; // 分页
        this.total2 = 0; // 分页
        this.page2 = 1; // 分页
        this.pageSize2 = 5; // 分页
        this.queryStr = '';
        this.queryStr1 = '';
        this.modelData = {
            title: '删除',
            body: 'hh',
        };
        this.errorMess = []; // 经纬度错误消息
        this.currentWay = {}; // 当前道路
        this.addOrupdata = '新建位置';
        this.currentCustomer = {}; // 当前客户
        this.address = '';
        this.alerts = [];
        this.alertsModal = [];
        this.model.point = { lng: '', lat: '' };
        var token = localStorage.getItem('token');
        var tokenobj = this.jwtHelper.decodeToken(token);
        this.customerId = this.jwtHelper.decodeToken(token).customerid;
    }
    PositionComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    PositionComponent.prototype.closeAlertModal = function (alert) {
        var index = this.alertsModal.indexOf(alert);
        this.alertsModal.splice(index, 1);
    };
    PositionComponent.prototype.reset = function () {
        this.alerts = this.backup.map(function (alert) { return Object.assign({}, alert); });
    };
    PositionComponent.prototype.getDismissReason = function (reason) {
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
    PositionComponent.prototype.ngOnInit = function () {
        this.getCity();
        this.getPositionType();
        this.getPosition(0, this.page, this.pagesize);
        this.getRoads();
        this.getCustomer();
    };
    PositionComponent.prototype.adGeocoder = function (name) {
        var myGeo = new BMap.Geocoder();
        var that = this;
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(name, function (point) {
            if (point) {
                that.map.centerAndZoom(point, 7);
                that.map.addOverlay(new BMap.Marker(point));
                that.model.center = {};
                that.model.center.lng = point.lng;
                that.model.center.lat = point.lat;
            }
            else {
                alert('您选择地址没有解析到结果!');
            }
        }, '');
    };
    // 选择道路
    PositionComponent.prototype.selecteWay = function (item) {
        this.currentWay = item;
        this.wayshow = false;
        this.model.wayId = item.id;
    };
    // 选择客户
    PositionComponent.prototype.selecteCustomer = function (item) {
        this.currentCustomer = item;
        this.Customershow = false;
        this.model.CustomerId = item.id;
        this.getCity(item.id);
    };
    // 检索按键点击事件
    PositionComponent.prototype.execQuery = function () {
        this.page = 1;
        this.getPosition(this.currentType.id, 1, this.pagesize);
    };
    PositionComponent.prototype.changeName = function (modelId) {
        var modelName;
        this.deviceTypes.map(function (item, i) {
            if (item.id === modelId) {
                modelName = item.name;
            }
        });
        // console.log(modelName);
        return modelName;
    };
    PositionComponent.prototype.deviceTypeChange = function () {
        this.page = 1;
        this.getPosition(this.currentType.id, this.page, this.pagesize);
    };
    // 分页获取道路
    PositionComponent.prototype.getRoads = function () {
        var that = this;
        this.positionService.getRoads(this.page1, this.pageSize1, '')
            .subscribe({
            next: function (val) {
                that.roadList = val.items;
                that.total1 = val.total;
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 分页获取客户
    PositionComponent.prototype.getCustomer = function () {
        var that = this;
        this.positionService.getCustomer(this.page2, this.pageSize2, '')
            .subscribe({
            next: function (val) {
                that.CustomerList = val.items;
                that.CustomerList.unshift({ 'name': '平台用户', code: '' }); // 添加平台用户
                that.total2 = val.total;
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 新建位置弹框
    PositionComponent.prototype.openNewPosition = function (content) {
        var _this = this;
        this.addOrupdata = '新增位置';
        this.errorMess = [];
        this.model.name = ''; // name
        this.model.number = ''; // number
        this.currentCustomer = {};
        this.currentAreaList = this.currentCity && this.currentCity.children; // 当前城市下的区域列表
        console.log(this.currentAreaList);
        this.currentRegion = this.currentAreaList && this.currentAreaList[0]
            && this.currentAreaList[0].children && this.currentAreaList[0].children[0]; // 当前区域
        this.model.device = this.deviceList[0]; // 类型
        var modal = this.modalService.open(content, { size: 'lg' });
        this.mr = modal;
        this.addBaiduMap();
        var point = new BMap.Point(114.062769, 22.477677); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
        this.bindPosition(point);
        this.model.point = { lng: '', lat: '' }; // 坐标
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    // 修改位置弹框
    PositionComponent.prototype.openUpdataPosi = function (content, item, i) {
        var _this = this;
        this.addOrupdata = '修改位置';
        this.errorMess = [];
        this.model.updataId = item.id;
        this.model.installZoneId = item.installZoneId; // 安装区域
        this.model.name = item.name; // name
        this.model.number = item.number; // number
        this.model.point = item.point; // point
        var id = item.type; // 类型
        for (var index = 0; index < this.deviceList.length; index++) {
            var element = this.deviceList[index];
            if (id === element.id) {
                this.model.device = this.deviceList[index];
            }
        }
        var region_id; // 当前城市id
        region_id = item.regionId.toString().slice(0, 4);
        console.log(region_id);
        this.node = null; // 用于递归查询JSON树 父子节点 currentArea
        this.currentCity = this.getNode(this.cityList, region_id); // 当前城市
        console.log(this.currentCity);
        this.currentAreaList = this.currentCity ? this.currentCity.children : []; // 当前城市下的区域列表
        var area_id = item.regionId; // 当前区域id
        this.node = null; // 用于递归查询JSON树 父子节点
        this.currentRegion = this.getNode(this.cityList, area_id); // 当前区域
        this.currentWay.id = item.wayId; // 当前道路
        this.currentWay.wayName = item.wayName; // 当前道路
        this.currentCustomer.id = item.customerId; // 当前客户
        this.currentCustomer.name = item.customerName; // 当前客户
        var modal = this.modalService.open(content, { size: 'lg' });
        this.mr = modal;
        this.addBaiduMap();
        this.bindPosition(item.point);
        modal.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
            console.log(_this.closeResult);
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
            console.log(_this.closeResult);
        });
    };
    // position表点击事件
    PositionComponent.prototype.bindPosition = function (point1) {
        this.map.clearOverlays();
        var point = new BMap.Point(point1.lng, point1.lat);
        this.map.centerAndZoom(point, 19); // 设置中心和地图显示级别
        var mySquare = new grad_overlay_1.GradOverlar(point, 50, 'tag-bule');
        this.map.addOverlay(mySquare);
    };
    PositionComponent.prototype.addorupdata = function () {
        if (this.addOrupdata === '新增位置') {
            this.setPosition();
        }
        else {
            this.updataPosition();
        }
    };
    // 新增位置信息
    PositionComponent.prototype.setPosition = function () {
        this.typeofPoint();
        if (this.errorMess[0] === '无错') {
            var that_1 = this;
            var body = {
                'installZoneId': this.model.installZoneId,
                'name': this.model.name,
                'number': this.model.number,
                'point': this.model.point,
                'regionId': this.currentRegion.id,
                'type': this.model.device.id,
                'wayId': this.currentWay.wayId,
                'customerId': this.currentCustomer.id || this.customerId,
            };
            this.positionService.setPosition(body).subscribe({
                next: function (val) {
                    that_1.alerts.push({
                        id: 1,
                        type: 'success',
                        message: '新建成功！',
                    });
                    that_1.backup = that_1.alerts.map(function (alert) { return Object.assign({}, alert); });
                    that_1.mr.close();
                },
                complete: function () {
                    that_1.getPosition(that_1.currentType.id, that_1.page, that_1.pagesize);
                },
                error: function (error) {
                    console.log(error);
                    var message = error.error.errors[0].defaultMessage;
                    that_1.alertsModal.push({
                        id: 1,
                        type: 'danger',
                        message: "\u65B0\u5EFA\u5931\u8D25: " + message + "\uFF01",
                    });
                }
            });
        }
        else {
            this.alertsModal.push({
                id: 1,
                type: 'danger',
                message: '请输入正确的经纬度！',
            });
        }
    };
    // 修改位置信息
    PositionComponent.prototype.updataPosition = function () {
        this.typeofPoint();
        if (this.errorMess[0] === '无错') {
            var that_2 = this;
            var body = {
                'id': this.model.updataId,
                'installZoneId': this.model.installZoneId,
                'name': this.model.name,
                'number': this.model.number,
                'point': this.model.point,
                'regionId': this.currentRegion && this.currentRegion.id,
                'type': this.model.device.id,
                'wayId': this.currentWay.wayId,
                'customerId': this.currentCustomer.id || this.customerId,
            };
            this.positionService.updataPosition(body).subscribe({
                next: function (val) {
                    that_2.alerts.push({
                        id: 1,
                        type: 'success',
                        message: '修改成功！',
                    });
                    that_2.backup = that_2.alerts.map(function (alert) { return Object.assign({}, alert); });
                    that_2.mr.close();
                },
                complete: function () {
                    that_2.getPosition(that_2.currentType.id, that_2.page, that_2.pagesize);
                },
                error: function (error) {
                    console.log(error);
                    var message = error.error.errors[0].defaultMessage;
                    that_2.alertsModal.push({
                        id: 1,
                        type: 'danger',
                        message: "\u4FEE\u6539\u5931\u8D25: " + message + "\uFF01",
                    });
                }
            });
        }
        else {
            this.alertsModal.push({
                id: 1,
                type: 'danger',
                message: '请输入正确的经纬度！',
            });
        }
    };
    // 删除位置弹框
    PositionComponent.prototype.openDelPosi = function (content, item, i) {
        this.model.itemDelId = item.id;
        var modal = this.modalService.open(content, { size: 'sm' });
        this.mr = modal;
    };
    // 删除位置规则
    PositionComponent.prototype.closePosition = function ($event) {
        console.log($event);
        if ($event === 'ok') {
            this.delPosition();
        }
        this.mr.close();
    };
    // 删除位置-接口处
    PositionComponent.prototype.delPosition = function () {
        var that = this;
        var id = this.model.itemDelId;
        var flag = false;
        var pages = (this.total + this.pagesize - 1) / this.pagesize;
        if (this.page >= pages && this.positionListItems.length === 1) {
            flag = true;
        }
        this.positionService.delPosition(id).subscribe({
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
                    that.getPosition(that.currentType.id, that.page, that.pagesize);
                }
                else {
                    that.getPosition(that.currentType.id, that.page, that.pagesize);
                }
            },
            error: function (error) {
                console.log(error);
                var message = error.error.errors[0].defaultMessage;
                that.alerts.push({
                    id: 1,
                    type: 'danger',
                    message: "\u4FEE\u6539\u5931\u8D25: " + message + "\uFF01",
                });
                console.log(error);
            }
        });
    };
    // 获取位置
    PositionComponent.prototype.getPosition = function (type, page, pagesize) {
        var that = this;
        this.positionService.getPosition(this.queryStr, type, page, pagesize).subscribe({
            next: function (val) {
                that.positionList = val;
                that.total = val.total;
                that.positionListItems = val.items;
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 分页
    PositionComponent.prototype.pageChange = function () {
        this.getPosition(this.currentType.id, this.page, this.pagesize);
    };
    // 分页
    PositionComponent.prototype.pageChange1 = function () {
        this.getRoads();
    };
    // 分页
    PositionComponent.prototype.pageChange2 = function () {
        this.getCustomer();
    };
    // 获取位置类型列表
    PositionComponent.prototype.getPositionType = function () {
        var that = this;
        this.positionService.getPositionType().subscribe({
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
    // 选择设备
    PositionComponent.prototype.deviceChange = function () {
        console.log(this.model.device);
    };
    // 获取城市列表
    PositionComponent.prototype.getCity = function () {
        var cusid = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cusid[_i] = arguments[_i];
        }
        var that = this;
        this.positionService.getZoneDefault(cusid).subscribe({
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
    PositionComponent.prototype.openAddPositions = function (content) {
        var _this = this;
        this.modalService.open(content, { windowClass: 'md-modal' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
            console.log(_this.closeResult);
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
            console.log(_this.closeResult);
        });
    };
    // 添加地图实例
    PositionComponent.prototype.addBaiduMap = function () {
        var map = this.map = new BMap.Map('position_map', {
            enableMapClick: true,
        }); // 创建地图实例
        var point = new BMap.Point(114.062769, 22.477677); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
        map.centerAndZoom(point, 7); // 设置中心和地图显示级别
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        map.setMapStyle({ style: 'normal' });
        this.mapClickOff(map);
    };
    // 监控-点击地图事件
    PositionComponent.prototype.mapClickOff = function (baiduMap) {
        var that = this;
        baiduMap.addEventListener('click', function (e) {
            that.model.point = e.point;
        });
    };
    PositionComponent.prototype.typeofPoint = function () {
        var that = this;
        this.errorMess = [];
        var str1 = '纬度';
        var str2 = '经度';
        this.validPoint(this.model.point.lat, str1);
        this.validPoint(this.model.point.lng, str2);
        if (this.errorMess.length <= 0) {
            that.errorMess.push('无错');
        }
    };
    // 验证坐标输入合法性
    PositionComponent.prototype.validPoint = function (lat, str) {
        var maxValue;
        if (str === '纬度') {
            maxValue = 90;
        }
        else {
            maxValue = 180;
        }
        var that = this;
        var errorMes = ''; // 错误信息提示
        var latNum = Number(lat);
        var latStr = latNum.toString();
        if (lat && latStr === 'NaN') {
            errorMes = str + '数错误！';
            // console.log(errorMes);
        }
        else if (lat && latStr !== 'NaN') {
            var pointArray = latStr.split('.');
            if (Number(pointArray[0]) >= -maxValue && Number(pointArray[0]) <= maxValue) {
                if (pointArray[1].length > 6) {
                    errorMes = str + '取小数点后6位！';
                    var term = pointArray[1].slice(0, 6);
                    pointArray[1] = term;
                }
                if (str === '纬度') {
                    that.model.point.lat = pointArray[0] + '.' + pointArray[1];
                }
                else {
                    that.model.point.lng = pointArray[0] + '.' + pointArray[1];
                }
            }
            else {
                errorMes = str + '超出范围！';
            }
        }
        errorMes === '' ? errorMes = '' : this.errorMess.push(errorMes);
    };
    // 搜索Enter事件
    PositionComponent.prototype.onKeydown = function (event) {
        if (event.keyCode === 13) {
            this.execQuery();
        }
    };
    PositionComponent.prototype.switchZone = function (level) {
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
                zone = 19;
                break;
            default:
                break;
        }
        return zone;
    };
    PositionComponent.prototype.getNode = function (json, nodeId) {
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
    PositionComponent.prototype.getPoint = function (baiduMap, city) {
        // 创建地址解析器实例
        var zoom = this.zoom = this.switchZone(city.level);
        var pt = city.center;
        var point = new BMap.Point(pt.lng, pt.lat);
        baiduMap.centerAndZoom(point, zoom);
    };
    // 选择区域
    // 选择城市
    PositionComponent.prototype.selecteCity = function (city, i) {
        this.model.installZoneId = city.installZoneId; // 安装区域
        this.model.point = { lng: '', lat: '' };
        this.currentCity = city;
        this.getPoint(this.map, city); // 解析地址- 设置中心和地图显示级别
        this.currentAreaList = city.children;
        this.currentRegion = null;
    };
    // 选择街道
    PositionComponent.prototype.selecteblock = function (block) {
        this.currentRegion = block;
        this.model.installZoneId = block.installZoneId; // 安装区域
        console.log(block);
        this.model.point = { lng: '', lat: '' };
        this.getPoint(this.map, block); // 解析地址- 设置中心和地图显示级别
    };
    PositionComponent.prototype.nolimt = function () {
        this.model.installZoneId = this.currentCity.installZoneId; // 安装区域
        this.currentRegion.id = this.currentCity.id;
        this.currentRegion = {
            name: '不限'
        };
    };
    // 显示区域
    PositionComponent.prototype.showArea = function () {
        this.areashow = true;
    };
    // 显示城市
    PositionComponent.prototype.showCiyt = function () {
        this.cityshow = true;
    };
    // 显示道路
    PositionComponent.prototype.showWay = function () {
        this.wayshow = true;
    };
    // 显示客户
    PositionComponent.prototype.showCustomer = function () {
        this.Customershow = true;
    };
    // 选择区域
    PositionComponent.prototype.arealistMouseover = function (area) {
        this.currentBlockList = area.children;
    };
    // 离开区域
    PositionComponent.prototype.arealistMouseleave = function () {
        this.areashow = false;
        this.currentBlockList = null;
    };
    // 离开城市
    PositionComponent.prototype.citylistMouseleave = function () {
        this.cityshow = false;
    };
    // 离开道路
    PositionComponent.prototype.waylistMouseleave = function () {
        this.wayshow = false;
    };
    // 离开客户
    PositionComponent.prototype.CustomerlistMouseleave = function () {
        this.Customershow = false;
    };
    PositionComponent.prototype.arealistMouseNone = function () {
        this.areashow = true;
        this.currentBlockList = null;
    };
    __decorate([
        core_1.ViewChild('map1'),
        __metadata("design:type", core_1.ElementRef)
    ], PositionComponent.prototype, "map_container", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], PositionComponent.prototype, "alerts", void 0);
    PositionComponent = __decorate([
        core_1.Component({
            selector: 'app-position',
            templateUrl: './position.component.html',
            styleUrls: ['./position.component.scss']
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal, position_service_1.PositionService,
            angular_jwt_1.JwtHelperService])
    ], PositionComponent);
    return PositionComponent;
}());
exports.PositionComponent = PositionComponent;
//# sourceMappingURL=position.component.js.map