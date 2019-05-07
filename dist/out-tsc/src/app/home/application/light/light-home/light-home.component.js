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
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: light.component.ts
@time: 2018 /8 / 9 9: 00

*/
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var monitor_service_1 = require("../../../../service/monitor.service");
var light_service_1 = require("../../../../service/light.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var rabbitmq_service_1 = require("../../../../service/rabbitmq.service");
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
var LightHomeComponent = /** @class */ (function () {
    function LightHomeComponent(monitorService, lightService, rabbitmqService, router, config) {
        this.monitorService = monitorService;
        this.lightService = lightService;
        this.rabbitmqService = rabbitmqService;
        this.router = router;
        this.model = {}; // 存储数据
        this.areashow = false; // 默认区域列表不显示
        this.cityshow = false; // 默认区域列表不显示
        this.deviceshow = false; // 默认设备列表不显示
        this.visible = true; // 控制可视区域
        this.type = 0; // 设备类型
        this.parentNode = null; // 用于递归查询JSON树 父子节点
        this.node = null; // 用于递归查询JSON树 父子节点
        this.lightList = []; // 当前数据
        this.lightListRes = []; // 查询结果
        this.lightList1 = [];
        this.strategyLists = []; // 策略列表
        this.time = { hour: 13, minute: 30 }; // 路灯控制时间
        this.contrL = false; // 临时控制
        this.lightLevel = 0;
        this.StrategyRuleMess = false; // 提示成功
        this.LightsContrMess = false; // 提示成功
        // 多设备控制
        this.showDevicesControl = false; // 多灯控制默认不显示
        this.showDevicesStrategyCtrl = false; // 多灯分配策略 默认不显示
        this.time1 = { hour: 13, minute: 30 }; // 路灯控制时间
        this.lightLevel1 = 0;
        this.prompt1 = false; // 提示成功
        this.StrategyRuleMess1 = false; // 提示成功
        this.LightsContrMess1 = false; // 提示成功
        this.selectedLightList = []; // 选中的设备
        this.lightList_check = []; // 当前数据
        this.allCheck = false;
        this.deviceTypeId = 2; // 路灯
        this.alerts = [];
        this.queueArgs = {};
        config.spinners = false; // 时间控制
    }
    LightHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createQueue();
        this.getCity(); // 获取城市列表
        this.getStrategy(); // 获取策略表
        this.addBeiduMap();
        this.getLights(); // 获取地图上的点
        this.timer = setInterval(function () {
            _this.getLights(); // 获取地图上的点
        }, 10000);
    };
    LightHomeComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    LightHomeComponent.prototype.createQueue = function () {
        var that = this;
        var consumerId = Math.round(Math.random() * 10 + 1);
        console.log(this.queueArgs);
        var body = {
            'infoType': 'light',
            'consumerId': consumerId
        };
        var ws = new SockJS('http://172.18.1.88:5670/web-stomp-examples');
        that.client = Stomp.over(ws);
        that.client.heartbeat.incoming = 0;
        that.rabbitmqService.createQueue(body).subscribe({
            next: function (val) {
                that.queueName = val;
                console.log(that.queueName);
            },
            complete: function () {
                var on_connect = function () {
                    console.log('connected');
                    that.client.subscribe('/queue/' + that.queueName + '/', function (data) {
                        if (data = null) {
                            console.log("[x] Received %s", JSON.parse(data.body));
                            var tx = that.client.begin();
                            data.ack({ transaction: tx.id, receipt: 'my-receipt' });
                            tx.commit();
                        }
                    });
                };
                var on_error = function (error) {
                    console.log(error.headers.message);
                };
                that.client.connect('guest', 'guest', on_connect, on_error, 'siid');
                console.log(">>>连接上http://localhost:15670");
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    LightHomeComponent.prototype.execQuery = function () {
        var _this = this;
        var str_name = '';
        var str_descr = '';
        var str_posi = '';
        var queryString = this.queryString;
        this.lightListRes = [];
        this.lightList.filter(function (item, i) {
            str_name = item.name;
            if (item.description === null) {
                item.description = '';
            }
            str_descr = item.description;
            str_posi = item.positionNumber;
            if (str_posi.includes(queryString) || str_name.includes(queryString) || str_descr.includes(queryString)) {
                _this.lightListRes.push(item);
            }
        });
        console.log(this.lightListRes);
        this.clearSelected();
    };
    // 点击搜索
    LightHomeComponent.prototype.execQueryId = function () {
        if (this.queryStr === '' || !this.queryStr) {
            return;
        }
        this.getLightByDeviceName();
    };
    // 按位置编号搜索
    LightHomeComponent.prototype.getLightByDeviceName = function () {
        var that = this;
        var posNum = this.queryStr;
        that.lightService.getLightByDeviceName(posNum).subscribe({
            next: function (val) {
                var point = new BMap.Point(val.point.lng, val.point.lat);
                that.map.centerAndZoom(point, 19);
                that.getLights();
                that.findPoint(point);
            },
            complete: function () {
                that.alerts = [];
            },
            error: function (error) {
                var message;
                if (error.error.errors) {
                    message = error.error.errors[0].defaultMessage;
                }
                else {
                    message = '结果不唯一！';
                }
                that.alerts.push({
                    id: 1,
                    type: 'danger',
                    message: message,
                });
                console.log(message);
                that.alerts.map(function (alert) { return Object.assign({}, alert); });
            }
        });
    };
    // 标注消息列表中点击的路灯事件
    LightHomeComponent.prototype.findPoint = function (point) {
        var marker;
        var makers = this.map.getOverlays();
        for (var index = 0; index < makers.length; index++) {
            var element = makers[index];
            var lat = element.point && element.point.lat;
            var lng = element.point && element.point.lng;
            if (point.lat === lat && point.lng === lng) {
                marker = element;
                if (marker) {
                    marker.V.click();
                }
            }
        }
    };
    // 监控-点击地图事件
    LightHomeComponent.prototype.mapClickOff = function (baiduMap) {
        var that = this;
        baiduMap.addEventListener('click', function (e) {
            that.closeDevicesControl();
            that.deviceChild = null;
            this.contrL = false;
        });
        baiduMap.addEventListener('dragend', function () {
            that.closeDevicesControl();
        });
        baiduMap.addEventListener('zoomend', function () {
            that.closeDevicesControl();
        });
    };
    // 百度地图API功能
    LightHomeComponent.prototype.addBeiduMap = function () {
        var map = this.map = new BMap.Map('map_container5', {
            enableMapClick: true,
        }); // 创建地图实例
        // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
        var point = new BMap.Point(113.923519, 22.497253); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
        map.centerAndZoom(point, 20); // 设置中心和地图显示级别
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        map.setMapStyle({ style: 'dark' });
        // 添加控件缩放
        var offset = new BMap.Size(20, 55);
        var navigationControl = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            offset: offset,
        });
        map.addControl(navigationControl);
        this.mapClickOff(map); // 地图点击信息框隐藏
        this.dragendOff(map);
        this.zoomendOff(map);
    };
    // 监控-拖动地图事件-显示用户拖动地图后地图中心的经纬度信息。
    LightHomeComponent.prototype.dragendOff = function (baiduMap) {
        var that = this;
        baiduMap.addEventListener('dragend', function () {
            that.getLights(); // 获取井盖
        });
    };
    // 监控-地图缩放事件-地图缩放后的级别。
    LightHomeComponent.prototype.zoomendOff = function (baiduMap) {
        var that = this;
        baiduMap.addEventListener('zoomend', function () {
            that.getLights(); // 获取井盖
        });
    };
    // 清除覆盖物
    LightHomeComponent.prototype.remove_overlay = function (baiduMap) {
        baiduMap.clearOverlays();
    };
    // 返回地图可视区域，以地理坐标表示
    LightHomeComponent.prototype.getBounds = function (baiduMap) {
        var Bounds = baiduMap.getBounds(); // 返回地图可视区域，以地理坐标表示
        this.NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
        this.SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角
        this.zoom = baiduMap.getZoom(); // 地图级别
    };
    LightHomeComponent.prototype.getLights = function () {
        var that = this;
        var Bounds = this.map.getBounds(); // 返回地图可视区域，以地理坐标表示
        var NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
        var SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角
        var value;
        var compar;
        this.lightService.getLights(NorthEast, SouthWest).subscribe({
            next: function (val) {
                compar = that.comparison(that.lightList, val);
                value = that.judgeChange(compar.a_arr, compar.b_arr);
                // console.log('value');
                // console.log(val);
                that.changeMarker(value); // 替换
                that.deleMarker(compar.a_surplus); // 删除
                // that.deleMarker(value); // 删除
                that.addMarker(compar.b_surplus); // 添加
                // that.addMarker(value); // 添加
                that.lightList = val; // 变为新值
                that.lightListRes = that.comparison1(that.lightList, that.lightListRes);
                that.lightList.map(function (item, i) {
                    that.lightList_check.push({ check: false });
                });
            },
            complete: function () {
                // that.changeMarker(value);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 交并补
    LightHomeComponent.prototype.comparison1 = function (a, b) {
        var a_arr = [];
        var i = 0;
        for (var j = 0; j < b.length; j++) {
            if (a.length > 0) {
                while (i < a.length && a[i].id < b[j].id) {
                    i++;
                }
                if (a[i].id === b[j].id) {
                    a_arr.push(a[i]);
                    i++;
                }
            }
        }
        return a_arr;
    };
    // 交并补
    LightHomeComponent.prototype.comparison = function (a, b) {
        var a_arr = [];
        var b_arr = [];
        var a_surplus = [];
        var b_surplus = [];
        var i = 0;
        if (b.length === 0) {
            for (var k = 0; k < a.length; k++) {
                a_surplus.push(a[k]);
            }
        }
        for (var j = 0; j < b.length; j++) {
            while (i < a.length && a[i].id < b[j].id) {
                a_surplus.push(a[i]);
                i++;
            }
            if (i >= a.length || a[i].id > b[j].id) {
                b_surplus.push(b[j]);
            }
            else {
                a_arr.push(a[i]);
                i++;
                b_arr.push(b[j]);
            }
            while (i < a.length && j === b.length - 1) {
                a_surplus.push(a[i]);
                i++;
            }
        }
        return {
            a_arr: a_arr,
            b_arr: b_arr,
            a_surplus: a_surplus,
            b_surplus: b_surplus,
        };
    };
    // 判断变化值
    LightHomeComponent.prototype.judgeChange = function (a, b) {
        var changePoint = [];
        var length = a.length < b.length ? a.length : b.length;
        for (var index = 0; index < length; index++) {
            var a_element = a[index];
            var b_element = b[index];
            var a_level = 0;
            var b_level = 0;
            if (a_element.level === 0) {
                a_level = 0;
            }
            else if (a_element.level < 30) {
                a_level = 1;
            }
            else if (a_element.level < 70) {
                a_level = 2;
            }
            else {
                a_level = 3;
            }
            if (b_element.level === 0) {
                b_level = 0;
            }
            else if (b_element.level < 30) {
                b_level = 1;
            }
            else if (b_element.level < 70) {
                b_level = 2;
            }
            else {
                b_level = 3;
            }
            if (a_element.error !== b_element.error ||
                a_element.offline !== b_element.offline ||
                a_element.current !== b_element.current ||
                a_element.volt !== b_element.volt ||
                a_element.level !== b_element.level ||
                a_level !== b_level) {
                changePoint.push(b_element);
            }
        }
        return changePoint;
    };
    // 替换
    LightHomeComponent.prototype.changeMarker = function (light_list) {
        this.deleMarker(light_list); // 删除
        this.addMarker(light_list); // 添加
    };
    // 删除
    LightHomeComponent.prototype.deleMarker = function (light_list) {
        var makers = this.map.getOverlays();
        for (var ind = 0; ind < light_list.length; ind++) {
            var ele = light_list[ind];
            var point = light_list[ind].point;
            for (var index = 0; index < makers.length; index++) {
                var element = makers[index];
                var lat = element.point && element.point.lat;
                var lng = element.point && element.point.lng;
                if (point.lat === lat && point.lng === lng) {
                    this.map.removeOverlay(makers[index]);
                }
            }
        }
    };
    // 地图上描点
    LightHomeComponent.prototype.addMarker = function (light_list) {
        var markers = [];
        var points = [];
        for (var index = 0; index < light_list.length; index++) {
            var item = light_list[index];
            var point = new BMap.Point(item.point.lng, item.point.lat);
            var myIcon = void 0;
            if (item.offline === true || item.error === true) {
                myIcon = new BMap.Icon('../../../../assets/imgs/light-breakdown.png', new BMap.Size(36, 36));
            }
            else if (item.level === 0) {
                myIcon = new BMap.Icon('../../../../assets/imgs/light-normal.png', new BMap.Size(36, 36));
            }
            else if (item.level < 30) {
                myIcon = new BMap.Icon('../../../../assets/imgs/light-up-1.png', new BMap.Size(36, 36));
            }
            else if (item.level < 70) {
                myIcon = new BMap.Icon('../../../../assets/imgs/light-up-2.png', new BMap.Size(36, 36));
            }
            else {
                myIcon = new BMap.Icon('../../../../assets/imgs/light-up-3.png', new BMap.Size(36, 36));
            }
            // myIcon.setAnchor(new BMap.Size(16, 38));
            var marker = new BMap.Marker(point, { icon: myIcon }); // 创建标注
            this.map.addOverlay(marker);
            markers.push(marker); // 聚合
            this.markers = markers;
            points.push(point); // 聚合
        }
        // 点击点标注事件 - 弹出信息框
        for (var index = 0; index < markers.length; index++) {
            var marker = markers[index];
            this.openSideBar(marker, this.map, light_list[index], points[index]);
        }
    };
    // 地图点注标-点击事件
    LightHomeComponent.prototype.openSideBar = function (marker, baiduMap, val, point) {
        // console.log(val);
        var that = this;
        // <p style=’font - size: 12px; lineheight: 1.8em; ’> ${ val.name } </p>
        var opts = {
            width: 300,
            // height: 100,     // 信息窗口高度
            // title: `${val.name} | ${val.id }`, // 信息窗口标题
            // enableMessage: true, // 设置允许信息窗发送短息
            enableAutoPan: true,
        };
        var txt = "\n    <p style='font-size: 12px; line-height: 1.8em; border-bottom: 1px solid #ccc; padding-bottom: 10px;'>" + val.description + " </p>\n\n    ";
        txt = txt +
            ("<p>\u706F\u6746\u7F16\u53F7\uFF1A " + val.positionNumber + "</p>\n      <p>\u8DEF\u706F\u7F16\u53F7\uFF1A " + val.name + "</p>\n     ");
        if (val.rule && val.rule.name) {
            txt = txt + ("<p >\u5E94\u7528\u7B56\u7565\uFF1A " + val.rule.name + "</p>");
        }
        else {
            txt = txt + "<p >\u5E94\u7528\u7B56\u7565\uFF1A\u65E0</p>";
        }
        txt = txt + ("<p >\u4EAE\u5EA6\u7EA7\u522B\uFF1A " + val.level + "%</p>");
        txt = txt + ("<p >\u7535\u6D41\u5F3A\u5EA6\uFF1A " + val.current + "(mA)</p>");
        txt = txt + ("<p >\u7535\u538B\u5927\u5C0F\uFF1A " + val.volt + "(mv)</p>");
        if (val.offline === true) {
            // 离线或异常
            txt = txt + "   <p><span style='color: red'>\u79BB\u7EBF</span></p>";
        }
        else {
            txt = txt + "   <p><span style='color: blue'>\u5728\u7EBF</span></p>";
        }
        if (val.error === true) {
            // 离线或异常
            txt = txt + "<p><span style='color: red'>\u72B6\u6001\uFF1A\u6545\u969C</span></p>";
        }
        else {
            txt = txt + "<p ><span style='color: blue'>\u72B6\u6001\uFF1A\u6B63\u5E38</span></p>";
        }
        txt = txt + ("<button class='btn btn-outline-info cur-point' style='font-size: 14px; float: right; margin: 5px;'\n      id='" + val.id + "'>\u63A7\u5236</button>");
        var infoWindow = new BMap.InfoWindow(txt, opts);
        marker.addEventListener('click', function () {
            that.closeDevicesControl();
            that.device = val;
            that.getLights(); // 获取地图上的点
            that.map.centerAndZoom(point, 19); // 设置中心和地图显示级别
            baiduMap.openInfoWindow(infoWindow, point); // 开启信息窗口
            setTimeout(function () {
                that.deviceAddEventListener();
            }, 0);
        });
    };
    // 点击控制按钮
    LightHomeComponent.prototype.deviceAddEventListener = function () {
        var that = this;
        var device = $("#" + this.device.id);
        device.on('click', function () {
            that.contrL = false;
            that.StrategyRuleMess = false;
            that.LightsContrMess = false;
            that.deviceChild = that.device;
            that.lightLevel = that.device.level;
            if (that.device.ruleId) {
                that.strategyLists.map(function (item, index) {
                    if (item.id === that.device.ruleId) {
                        that.strategyList = that.strategyLists[index];
                    }
                });
            }
        });
    };
    // 清除选中的状态
    LightHomeComponent.prototype.clearSelected = function () {
        this.lightList_check.map(function (item, i) {
            item.check = false;
        });
    };
    // 多选框 - 单选：选择需要统一分配策略的路灯
    LightHomeComponent.prototype.addLightstoCtrl = function () {
        var _this = this;
        this.selectedLightList = [];
        this.lightList_check.map(function (item, i) {
            if (item.check === true) {
                var item1 = _this.lightListRes[i];
                if (item1) {
                    _this.selectedLightList.push(item1);
                }
            }
        });
        console.log(this.selectedLightList);
    };
    // 多选框 - 全选
    LightHomeComponent.prototype.allCheckMe = function () {
        var _this = this;
        this.selectedLightList = [];
        this.lightList_check.map(function (item, i) {
            _this.lightList_check[i].check = _this.allCheck;
            if (_this.allCheck) {
                var item1 = _this.lightListRes[i];
                if (item1) {
                    _this.selectedLightList.push(item1);
                }
            }
        });
        console.log(this.selectedLightList);
    };
    LightHomeComponent.prototype.addArr = function (arr) { };
    // 点击关闭操作详情
    LightHomeComponent.prototype.closeDetail = function () {
        this.deviceChild = null;
        this.contrL = false;
    };
    // 解析地址- 设置中心和地图显示级别
    LightHomeComponent.prototype.getPoint = function (baiduMap, city) {
        var zoom = this.zoom = this.switchZone(city.level);
        console.log(city);
        var pt = city.center;
        var point = new BMap.Point(pt.lng, pt.lat);
        baiduMap.centerAndZoom(point, zoom);
    };
    // 搜索Enter事件
    LightHomeComponent.prototype.onKeydown = function (event) {
        if (event.keyCode === 13) {
            this.execQuery();
        }
    };
    // 打开多灯控制
    LightHomeComponent.prototype.devicesControl = function () {
        this.queryString = '';
        this.StrategyRuleMess1 = false;
        this.LightsContrMess1 = false;
        this.showDevicesControl = true;
        this.lightListRes = [].concat(this.lightList);
        // console.log(this.lightListRes);
    };
    // 关闭多灯控制
    LightHomeComponent.prototype.closeDevicesControl = function () {
        var _this = this;
        this.showDevicesControl = false;
        this.showDevicesStrategyCtrl = false;
        this.selectedLightList = [];
        this.allCheck = false;
        this.lightList_check.map(function (item, i) {
            _this.lightList_check[i].check = false;
        });
        this.strategyList1 = null;
    };
    // 多灯策略分配
    LightHomeComponent.prototype.devicesStrategyCtrl = function () {
        if (this.selectedLightList.length > 0) {
            this.showDevicesStrategyCtrl = true;
        }
        else {
            alert('请选择设备');
        }
    };
    // 关闭多灯策略分配框体
    LightHomeComponent.prototype.closeDevicesStrategyCtrl = function () {
        this.showDevicesStrategyCtrl = false;
    };
    // 获取数据
    // 获取城市列表 --ok
    LightHomeComponent.prototype.getCity = function () {
        var that = this;
        this.monitorService.getZoneDefault(this.deviceTypeId).subscribe({
            next: function (val) {
                that.cityList = val.regions;
                // that.zoom = that.switchZone(val.zone.level);
                // that.node = that.getNode(val.regions, val.zone.region_id);
                that.zone = val.zone;
                that.node = that.getNode(val.regions, val.regions[0].children[0].id); // 当前城市
                that.currentCity = that.node;
                that.currentChildren = that.node.children;
            },
            complete: function () {
                var zoom = that.map.getZoom();
                var point = new BMap.Point(that.zone.center.lng, that.zone.center.lat);
                that.map.centerAndZoom(point, zoom);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 省市区街道-地图级别
    LightHomeComponent.prototype.switchZone = function (level) {
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
    //
    /*
     * 递归查询JSON树 父子节点
     */
    /**
     * 根据NodeID查找当前节点以及父节点
     *
     * @param  {[type]}
     * @param  {[type]}
     * @return {[type]}
     */
    LightHomeComponent.prototype.getNode = function (json, nodeId) {
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
            // console.log(nodeId);
            // console.log(obj.id);
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
        // 6.返回结果obj
        // return {
        //   parentNode: that.parentNode,
        //   node: that.node
        // };
        return that.node;
    };
    // 路由跳转
    LightHomeComponent.prototype.jumpHandle = function () {
        this.router.navigate(["home/application/light/thestrategy"]);
    };
    // 进入全屏
    LightHomeComponent.prototype.enterFullScreen = function () {
        console.log('进入全屏');
        console.log(this.visible);
        // this.visible = false;
        // localStorage.setItem('visible', 'false');
        // 设置缩放控件偏移量
        // const offset = new BMap.Size(20, 15);
        // this.navigationControl.setOffset(offset);
        // this.communicateService.sendMessage(this.visible); // 发布一条消息
        // this.fullScreenService.enterFullScreen();
    };
    // 选择区域
    // 选择城市
    LightHomeComponent.prototype.selecteCity = function (city) {
        this.currentCity = city;
        this.node = city;
        this.getPoint(this.map, city); // 解析地址- 设置中心和地图显示级别
        this.currentChildren = city.children;
    };
    LightHomeComponent.prototype.selecteblock = function (block) {
        this.getPoint(this.map, block); // 解析地址- 设置中心和地图显示级别
        this.currentArea = block;
    };
    // 显示区域
    LightHomeComponent.prototype.showArea = function () {
        this.areashow = true;
    };
    // 显示城市
    LightHomeComponent.prototype.showCiyt = function () {
        this.cityshow = true;
    };
    // 显示设备
    LightHomeComponent.prototype.showDevice = function () {
        this.deviceshow = true;
    };
    // 选择区域
    LightHomeComponent.prototype.arealistMouseover = function (area) {
        this.currentBlock = area.children;
    };
    // 离开区域
    LightHomeComponent.prototype.arealistMouseleave = function () {
        this.areashow = false;
        this.currentBlock = null;
    };
    // 离开城市
    LightHomeComponent.prototype.citylistMouseleave = function () {
        this.cityshow = false;
    };
    // 离开设备
    LightHomeComponent.prototype.devicelistMouseleave = function () {
        this.deviceshow = false;
    };
    LightHomeComponent.prototype.arealistMouseNone = function () {
        this.areashow = true;
        this.currentBlock = null;
    };
    // 路灯控制页选择策略
    LightHomeComponent.prototype.strategyListsChange = function () {
        this.StrategyRuleMess = false;
        this.LightsContrMess = false;
        this.prompt1 = false;
        console.log('策略改变');
    };
    // 路灯控制页选择策略
    LightHomeComponent.prototype.strategyListsChange1 = function () {
        this.StrategyRuleMess1 = false;
        this.LightsContrMess1 = false;
        this.prompt1 = false;
        console.log('策略改变');
    };
    // 临时控制切换
    // changeContr() {
    //   this.contrL = !this.contrL;
    //   this.prompt = false;
    // }
    // 时间改变
    LightHomeComponent.prototype.changeTime = function () {
        this.StrategyRuleMess = false;
        this.LightsContrMess = false;
        console.log('时间改变');
    };
    LightHomeComponent.prototype.changeTime1 = function () {
        this.StrategyRuleMess1 = false;
        this.LightsContrMess1 = false;
        console.log('时间改变');
    };
    // 亮度改变
    LightHomeComponent.prototype.changeSlider = function () {
        this.StrategyRuleMess = false;
        this.LightsContrMess = false;
        console.log('亮度改变');
    };
    // 路灯控制页亮度调节
    LightHomeComponent.prototype.formatLabel = function (value) {
        // this.prompt = false;
        if (!value) {
            return 0;
        }
        if (value > 100) {
            return Math.round(value / 100) + '%';
        }
        this.lightLevel = value;
        return value + '%';
    };
    // 控制路灯
    LightHomeComponent.prototype.lightsContr = function (id) {
        this.setLightsContr(id);
    };
    // 下发策略
    LightHomeComponent.prototype.lightsRuleContr = function (id) {
        this.setStrategyRule(id);
    };
    // 路灯- 临时控制-接口
    LightHomeComponent.prototype.setLightsContr = function (id) {
        var that = this;
        var strategyList = this.strategyList;
        var stopTime = this.time;
        var level = this.lightLevel;
        this.lightService.setLightsContr(id, level, stopTime).subscribe({
            next: function (val) {
                that.LightsContrMess = true;
                console.log('ok!');
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 多控路灯- 临时控制(亮度)-接口
    LightHomeComponent.prototype.setLightsContr1 = function () {
        var that = this;
        var ids = [];
        var stopTime = this.time1;
        var level = this.lightLevel1;
        this.selectedLightList.map(function (item, i) {
            ids[i] = item.id;
        });
        this.lightService.setLightsLevel(ids, level, stopTime).subscribe({
            next: function (val) {
                that.LightsContrMess1 = true;
                console.log('ok!');
            },
            complete: function () { },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 控制路灯-下发策略-接口
    LightHomeComponent.prototype.setStrategyRule = function (id) {
        var that = this;
        var strategyList = this.strategyList;
        this.lightService.setStrategyRule(id, strategyList.id).subscribe({
            next: function (val) {
                that.StrategyRuleMess = true;
                console.log('ok!');
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 多控路灯-集体下发策略
    LightHomeComponent.prototype.setStrategyRules = function () {
        var that = this;
        var strategyList1 = that.strategyList1;
        var ids = [];
        if (strategyList1) {
            var ruleId = this.strategyList1.id;
            this.selectedLightList.map(function (item, i) {
                ids[i] = item.id;
            });
            this.lightService.setLightsRule(ids, ruleId).subscribe({
                next: function (val) {
                    that.StrategyRuleMess1 = true;
                    console.log('ok!');
                },
                complete: function () { },
                error: function (error) {
                    console.log(error);
                }
            });
        }
        else {
            alert('请选择策略!');
        }
    };
    // 获取策略表
    LightHomeComponent.prototype.getStrategy = function () {
        var that = this;
        this.lightService.getStrategy().subscribe({
            next: function (val) {
                that.strategyLists = val;
                that.strategyList = that.strategyLists[0];
                // console.log(val);
            },
            complete: function () {
                // that.changeMarker(value);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    LightHomeComponent.prototype.ngOnDestroy = function () {
        window.clearInterval(this.timer);
    };
    __decorate([
        core_1.ViewChild('map8'),
        __metadata("design:type", core_1.ElementRef)
    ], LightHomeComponent.prototype, "map_container", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], LightHomeComponent.prototype, "alerts", void 0);
    LightHomeComponent = __decorate([
        core_1.Component({
            selector: 'app-light',
            templateUrl: './light-home.component.html',
            styleUrls: ['./light-home.component.scss'],
            providers: [ng_bootstrap_1.NgbTimepickerConfig, rabbitmq_service_1.RabbitmqService] // add NgbTimepickerConfig to the component providers
        }),
        __metadata("design:paramtypes", [monitor_service_1.MonitorService, light_service_1.LightService, rabbitmq_service_1.RabbitmqService, router_1.Router,
            ng_bootstrap_1.NgbTimepickerConfig])
    ], LightHomeComponent);
    return LightHomeComponent;
}());
exports.LightHomeComponent = LightHomeComponent;
//# sourceMappingURL=light-home.component.js.map