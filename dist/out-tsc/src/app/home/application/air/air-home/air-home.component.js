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
var router_1 = require("@angular/router");
var monitor_service_1 = require("../../../../service/monitor.service");
var airmonitor_service_1 = require("../../../../service/airmonitor.service");
var circle_overlay_air_service_1 = require("../../../../service/circle-overlay-air.service");
var AirHomeComponent = /** @class */ (function () {
    function AirHomeComponent(monitorService, airmonitorService, router) {
        this.monitorService = monitorService;
        this.airmonitorService = airmonitorService;
        this.router = router;
        /*
      model:object
      airdevicelist: array // 空气检测设备列表
      */
        this.model = {}; // 存储数据
        /*
        map_model: object // 城市列表相关
        @currentCity: any // 当前城市
        @currentArea: any // 当前区域
        @cityList: array // 城市列表
        @currentChildren: array // 区域列表一级
        @currentBlock: array // 当前城市街道 = []; // 区域列表2级
      */
        this.map_model = {}; // 存储数据
        this.visible = true; // 控制可视区域
        this.areashow = false; // 默认区域列表不显示
        this.cityshow = false; // 默认区域列表不显示
        this.parentNode = null; // 用于递归查询JSON树 父子节点
        this.node = null; // 用于递归查询JSON树 父子节点
        this.allIndexs = [
            {
                id: '',
                name: 'PM2.5'
            },
            {
                id: '',
                name: 'PM10'
            },
            {
                id: '',
                name: 'TVOC'
            },
            {
                id: '',
                name: '温度'
            },
            {
                id: '',
                name: '湿度'
            },
        ];
        this.deviceTypeId = 4; // 环境检测
        this.indexofHtml = this.allIndexs[0];
        this.currentAirIndex = 'PM2.5';
        this.model.airdevicelist = [];
        this.map_model.cityList = []; // 城市列表
        this.map_model.currentChildren = []; // 区域列表一级
        this.map_model.currentBlock = []; // // 当前城市街道 = []; // 区域列表2级
    }
    AirHomeComponent.prototype.ngOnInit = function () {
        this.addBeiduMap();
        this.getCity(); // 获取城市列表
    };
    // 百度地图API功能
    AirHomeComponent.prototype.addBeiduMap = function () {
        var _this = this;
        var map = this.map = new BMap.Map(this.map_container.nativeElement, {
            enableMapClick: true,
            minZoom: 11,
        }); // 创建地图实例
        // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
        var point = new BMap.Point(113.950723, 22.558888); // 坐标可以通过百度地图坐标拾取器获取
        map.centerAndZoom(point, 15); // 设置中心和地图显示级别
        // map.setMapStyle({ style: 'googlelite' });
        // 添加控件缩放
        var offset = new BMap.Size(20, 55);
        var navigationControl = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            offset: offset,
        });
        map.addControl(navigationControl);
        this.getAirdevices(); // 获取地图上的点
        this.timer = setInterval(function () {
            _this.getAirdevices(); // 获取地图上的点
        }, 5000);
        map.enableScrollWheelZoom(true); // 启动滚轮放大缩小，默认禁用
        this.dragendOff(map);
        this.zoomendOff(map);
    };
    // 添加地图内的设备标记
    // 监控-拖动地图事件-显示用户拖动地图后地图中心的经纬度信息。
    AirHomeComponent.prototype.dragendOff = function (baiduMap) {
        var that = this;
        baiduMap.addEventListener('dragend', function () {
            that.getAirdevices(); // 获取数据-添加标注
        });
    };
    // 监控-地图缩放事件-地图缩放后的级别。
    AirHomeComponent.prototype.zoomendOff = function (baiduMap) {
        var that = this;
        baiduMap.addEventListener('zoomend', function () {
            that.getAirdevices(); // 添加标注
        });
    };
    // 获取设备坐标点
    AirHomeComponent.prototype.getAirdevices = function () {
        var that = this;
        var Bounds = this.map.getBounds(); // 返回地图可视区域，以地理坐标表示
        var NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
        var SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角
        localStorage.setItem('NE', JSON.stringify(NorthEast));
        localStorage.setItem('SW', JSON.stringify(SouthWest));
        var compar;
        var value;
        this.airmonitorService.getAirDevice(NorthEast, SouthWest).subscribe({
            next: function (val) {
                var curIndex = that.currentAirIndex;
                compar = that.comparison(that.model.airdevicelist, val);
                value = that.judgeChange(compar.a_arr, compar.b_arr, curIndex);
                that.changeMarker(value); // 替换
                that.deleMarker(compar.a_surplus); // 删除
                that.addCertainMarker(compar.b_surplus, curIndex); // 添加
                that.model.airdevicelist = val; // 变为新值
            },
            complete: function () {
                // that.addCertainMarker(value, that.currentAirIndex);
            },
            error: function (error) {
            }
        });
    };
    // 交并补
    AirHomeComponent.prototype.comparison = function (a, b) {
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
    AirHomeComponent.prototype.judgeChange = function (a, b, curIndex) {
        var changePoint = [];
        var length = a.length < b.length ? a.length : b.length;
        var value;
        switch (curIndex) {
            case 'PM2.5':
                value = 'pm25';
                break;
            case 'PM10':
                value = 'pm10';
                break;
            case 'TVOC':
                value = 'tvoc';
                break;
            case '温度':
                value = 'temperature';
                break;
            case '湿度':
                value = 'humidity';
                break;
            default: break;
        }
        for (var index = 0; index < length; index++) {
            var a_element = a[index];
            var b_element = b[index];
            if (a_element.error !== b_element.error ||
                a_element.offline !== b_element.offline ||
                a_element[value] !== b_element[value]) {
                changePoint.push(b_element);
            }
        }
        return changePoint;
    };
    // 替换
    AirHomeComponent.prototype.changeMarker = function (airdevice_list) {
        this.deleMarker(airdevice_list); // 删除
        this.addCertainMarker(airdevice_list, this.currentAirIndex); // 添加
    };
    // 删除
    AirHomeComponent.prototype.deleMarker = function (airdevice_list) {
        var makers = this.map.getOverlays();
        var that = this;
        for (var ind = 0; ind < airdevice_list.length; ind++) {
            var point = airdevice_list[ind].point;
            console.log(point);
            for (var index = 0; index < makers.length; index++) {
                var element = makers[index];
                console.log(element);
                var lat = element._center && element._center.lat;
                var lng = element._center && element._center.lng;
                if (point.lat === lat && point.lng === lng) {
                    that.map.removeOverlay(makers[index]);
                }
            }
        }
    };
    // 根据当前空气指标加载对应图标
    AirHomeComponent.prototype.addCertainMarker = function (val, index) {
        var _this = this;
        var markers = [];
        var points = [];
        var that = this;
        var length = 60; // 图标大小
        var color = '#4eb4cf'; // 背景色
        var name = index; // 圆形图标中显示的名字
        var indexvalue; // 圆形图标中显示的值
        var mouseoverColor = '#9bd9dd'; // 划过背景色
        val.map(function (item, i) {
            var point = new BMap.Point(item.point.lng, item.point.lat);
            var myIcon;
            switch (index) {
                case 'PM2.5':
                    indexvalue = item.pm25;
                    break;
                case 'PM10':
                    indexvalue = item.pm10;
                    break;
                case 'TVOC':
                    indexvalue = item.tvoc;
                    break;
                case '温度':
                    indexvalue = item.temperature + ' °C';
                    break;
                case '湿度':
                    indexvalue = item.humidity;
                    break;
                default: break;
            }
            // 添加覆盖物图标
            myIcon = new circle_overlay_air_service_1.CircleOverlarAirService(point, name, indexvalue, length, color, mouseoverColor);
            _this.map.addOverlay(myIcon);
            markers.push(myIcon); // 聚合
            points.push(point);
        });
        // 点击点标注事件
        for (var indexl = 0; indexl < markers.length; indexl++) {
            var marker = markers[indexl];
            var item = val[indexl];
            that.openSideBar(marker, that.map, item, points[indexl]);
        }
    };
    // 地图点注标-点击事件
    AirHomeComponent.prototype.openSideBar = function (marker, baiduMap, airDevice, point) {
        var opts = {
            width: 350,
            enableAutoPan: true,
        }; // ${airDevice.id} ${airDevice.description}
        var txt = "<p style='font-size: 12px; line-height: 1.8em; border-bottom: 1px solid #ccc; padding-bottom: 10px;'>";
        txt = txt + ("\u8BBE\u5907\u7F16\u53F7 | " + airDevice.name + " </p><p> \u8BBE\u5907\u540D\u79F0\uFF1A" + airDevice.description + "</p>");
        if (airDevice.offline === false) {
            txt = txt + "<p> <span style='color: blue'>\u5728\u7EBF</span></p>";
        }
        else {
            txt = txt + "<p> <span style='color: red'>\u79BB\u7EBF</span></p>";
        }
        if (airDevice.error === false) {
            txt = txt + "<p><span style='color: blue'>\u72B6\u6001\uFF1A\u6B63\u5E38</span></p>";
        }
        else {
            txt = txt + "<p> <span style='color: red'>\u72B6\u6001\uFF1A\u5F02\u5E38</span></p>";
        }
        var infoWindow = new BMap.InfoWindow(txt, opts);
        marker.V.addEventListener('click', function () {
            baiduMap.openInfoWindow(infoWindow, point); // 开启信息窗口
        });
    };
    // 获取城市列表 --ok
    AirHomeComponent.prototype.getCity = function () {
        var that = this;
        this.monitorService.getZoneDefault(this.deviceTypeId).subscribe({
            next: function (val) {
                that.map_model.cityList = val.regions;
                // that.node = that.getNode(val.regions, val.zone.region_id);
                that.zone = val.zone;
                that.node = that.getNode(val.regions, val.regions[0].children[0].id); // 当前城市
                that.map_model.currentCity = that.node;
                that.map_model.currentChildren = that.node.children;
            },
            complete: function () {
                var zoom = that.map.getZoom();
                var point = new BMap.Point(that.zone.center.lng, that.zone.center.lat); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
                that.map.centerAndZoom(point, zoom);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 进入数据监控页面
    AirHomeComponent.prototype.jumpHandle = function () {
        this.router.navigate(["home/application/air/theairreport"]);
    };
    // 切换空气指标
    AirHomeComponent.prototype.onIndexChange = function () {
        this.currentAirIndex = this.indexofHtml.name;
        this.map.clearOverlays();
        this.addCertainMarker(this.model.airdevicelist, this.currentAirIndex); // 添加
    };
    // 省市区街道-地图级别
    AirHomeComponent.prototype.switchZone = function (level) {
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
    AirHomeComponent.prototype.getNode = function (json, nodeId) {
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
    // 解析地址- 设置中心和地图显示级别
    AirHomeComponent.prototype.getPoint = function (baiduMap, city) {
        var zoom = this.switchZone(city.level);
        console.log(city);
        var pt = city.center;
        var point = new BMap.Point(pt.lng, pt.lat);
        baiduMap.centerAndZoom(point, zoom);
    };
    // 选择区域
    // 选择城市
    AirHomeComponent.prototype.selecteCity = function (city) {
        this.map_model.currentCity = city;
        this.node = city;
        this.getPoint(this.map, city); // 解析地址- 设置中心和地图显示级别
        this.map_model.currentChildren = city.children;
    };
    AirHomeComponent.prototype.selecteblock = function (block) {
        this.getPoint(this.map, block); // 解析地址- 设置中心和地图显示级别
        this.map_model.currentArea = block;
    };
    // 显示区域
    AirHomeComponent.prototype.showArea = function () {
        this.areashow = true;
    };
    // 显示城市
    AirHomeComponent.prototype.showCiyt = function () {
        this.cityshow = true;
    };
    // 离开城市
    AirHomeComponent.prototype.citylistMouseleave = function () {
        this.cityshow = false;
    };
    // 选择区域
    AirHomeComponent.prototype.arealistMouseover = function (area) {
        this.map_model.currentBlock = area.children;
    };
    // 离开区域
    AirHomeComponent.prototype.arealistMouseleave = function () {
        this.areashow = false;
        this.map_model.currentBlock = [];
    };
    AirHomeComponent.prototype.arealistMouseNone = function () {
        this.areashow = true;
        this.map_model.currentBlock = [];
    };
    AirHomeComponent.prototype.ngOnDestroy = function () {
        window.clearInterval(this.timer);
    };
    __decorate([
        core_1.ViewChild('map6'),
        __metadata("design:type", core_1.ElementRef)
    ], AirHomeComponent.prototype, "map_container", void 0);
    AirHomeComponent = __decorate([
        core_1.Component({
            selector: 'app-air-home',
            templateUrl: './air-home.component.html',
            styleUrls: ['./air-home.component.scss']
        }),
        __metadata("design:paramtypes", [monitor_service_1.MonitorService, airmonitor_service_1.AirmonitorService,
            router_1.Router])
    ], AirHomeComponent);
    return AirHomeComponent;
}());
exports.AirHomeComponent = AirHomeComponent;
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: air.component.ts
@ introduction: 空气质量监测及预警
@ln:467
@time: 2018 / 7 / 2 17: 18

*/
//# sourceMappingURL=air-home.component.js.map