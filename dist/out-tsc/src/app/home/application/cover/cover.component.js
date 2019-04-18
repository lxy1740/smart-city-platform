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
@file: cover.componen.ts
@time: 2018 /8 / 9 9: 00

*/
var core_1 = require("@angular/core");
var monitor_service_1 = require("../../../service/monitor.service");
var mess_service_1 = require("../../../service/mess.service");
var cover_service_1 = require("../../../service/cover.service");
var router_1 = require("@angular/router");
var CoverComponent = /** @class */ (function () {
    function CoverComponent(coverService, monitorService, messService, router) {
        this.coverService = coverService;
        this.monitorService = monitorService;
        this.messService = messService;
        this.router = router;
        /*
        model:object
        @issueId: number// 消息
        @infoW: any// 信息框
        @deviceType: number// 井盖类型id
        @messageList: array //  待处理消息
        @messageList1: array // 处理中消息
        @messageList2: array // 已处理消息
      
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
        this.zone = []; // 安装区域
        this.areashow = false; // 默认区域列表不显示
        this.cityshow = false; // 默认区域列表不显示
        // deviceshow = false; // 默认设备列表不显示
        this.visible = true; // 控制可视区域
        this.parentNode = null; // 用于递归查询JSON树 父子节点
        this.node = null; // 用于递归查询JSON树 父子节点
        this.showunstartedlist = false; // 默认不显示“未处理”的异常消息
        this.showonprogresslist = false; // 默认不显示“处理中”的异常消息
        this.showfinishedlist = false; // 默认不显示“已处理”的异常消息
        this.deviceTypeId = 5; // 井盖
        this.model.deviceType = 5; // 井盖
        this.model.messageList = []; // 待处理
        this.model.messageList1 = []; // 处理中
        this.model.messageList2 = []; // 已处理
        this.model.coverList = []; // 当前井盖列表
        this.model.userList = []; // 用户列表
        this.map_model.cityList = []; // 城市列表
        this.map_model.currentChildren = []; // 区域列表一级
        this.map_model.currentBlock = []; // // 当前城市街道 = []; // 区域列表2级
    }
    CoverComponent.prototype.ngOnInit = function () {
        this.addBeiduMap();
        this.getCity(); // 获取城市列表
        this.getUserList();
    };
    CoverComponent.prototype.getUserList = function () {
        var that = this;
        this.coverService.getAllUser().subscribe({
            next: function (val) {
                that.model.userList = val;
            },
            complete: function () { },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 获取指定设备的事件
    CoverComponent.prototype.getDeviceIssues = function (deviceId) {
        var res;
        this.coverService.getDeviceIssues(deviceId, 0).subscribe({
            next: function (val) {
                return res = val;
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 获取井盖异常消息列表
    CoverComponent.prototype.getMessage = function () {
        var that = this;
        var deviceType = this.model.deviceType;
        this.coverService.getIssues(deviceType, 0).subscribe({
            next: function (val) {
                that.model.messageList = val;
            },
            error: function (error) {
                console.log(error);
            }
        });
        this.coverService.getIssues(deviceType, 1).subscribe({
            next: function (val) {
                that.model.messageList1 = val;
            },
            error: function (error) {
                console.log(error);
            }
        });
        this.coverService.getIssues(deviceType, 2).subscribe({
            next: function (val) {
                that.model.messageList2 = val;
            },
            error: function (error) {
                console.log(error);
            }
        });
        // this.coverService.getIssues(8, 2).subscribe({
        //   next: function (val) {
        //     console.log('(type: 8, state: 2): ');
        //     console.log(val);
        //   },
        //   error: function (error) {
        //     console.log(error);
        //   }
        // });
    };
    // 百度地图API功能
    CoverComponent.prototype.addBeiduMap = function () {
        var map = this.map = new BMap.Map(this.map_container.nativeElement, {
            enableMapClick: true,
        }); // 创建地图实例
        // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
        var point = new BMap.Point(113.922329, 22.49656); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
        map.centerAndZoom(point, 19); // 设置中心和地图显示级别
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        // map.setMapStyle({ style: 'grayscale' });
        map.setMapStyle({ style: 'normal' }); // dark
        // 添加控件缩放
        var offset = new BMap.Size(20, 55);
        var navigationControl = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            offset: offset,
        });
        map.addControl(navigationControl);
        this.addMarker();
        this.dragendOff(map);
        this.zoomendOff(map);
    };
    // 监控-拖动地图事件-显示用户拖动地图后地图中心的经纬度信息。
    CoverComponent.prototype.dragendOff = function (baiduMap) {
        var that = this;
        baiduMap.addEventListener('dragend', function () {
            // baiduMap.clearOverlays();
            that.getCovers(); // 获取井盖
        });
    };
    // 监控-地图缩放事件-地图缩放后的级别。
    CoverComponent.prototype.zoomendOff = function (baiduMap) {
        var that = this;
        baiduMap.addEventListener('zoomend', function () {
            // baiduMap.clearOverlays();
            that.getCovers(); // 获取井盖
        });
    };
    CoverComponent.prototype.addMarker = function () {
        var _this = this;
        this.getCovers(); // 获取井盖
        this.getMessage(); // 获取井盖异常消息列表
        this.timer = setInterval(function () {
            // this.map.clearOverlays();
            _this.getCovers();
            _this.getMessage(); // 获取井盖异常消息列表
        }, 10000);
    };
    // 获取地图内井盖
    CoverComponent.prototype.getCovers = function () {
        var that = this;
        var Bounds = this.map.getBounds(); // 返回地图可视区域，以地理坐标表示
        var NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
        var SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角
        var compar;
        var value;
        this.coverService.getCovers(NorthEast, SouthWest).subscribe({
            next: function (val) {
                // console.log(val);
                // value = val;
                compar = that.comparison(that.model.coverList, val);
                value = that.judgeChange(compar.a_arr, compar.b_arr);
                that.changeMarker(value); // 替换
                that.deleMarker(compar.a_surplus); // 删除
                that.addPoint(compar.b_surplus); // 添加
                that.model.coverList = val; // 变为新值
            },
            complete: function () {
                // that.addPoint(value);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 交并补
    CoverComponent.prototype.comparison = function (a, b) {
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
    CoverComponent.prototype.judgeChange = function (a, b) {
        var changePoint = [];
        var length = a.length < b.length ? a.length : b.length;
        for (var index = 0; index < length; index++) {
            var a_element = a[index];
            var b_element = b[index];
            if (a_element.error !== b_element.error ||
                a_element.offline !== b_element.offline ||
                a_element.alarm !== b_element.alarm ||
                a_element.lowBattery !== b_element.lowBattery) {
                changePoint.push(b_element);
            }
        }
        return changePoint;
    };
    // 替换
    CoverComponent.prototype.changeMarker = function (cover_list) {
        this.deleMarker(cover_list); // 删除
        this.addPoint(cover_list); // 添加
    };
    // 删除
    CoverComponent.prototype.deleMarker = function (cover_list) {
        var makers = this.map.getOverlays();
        for (var ind = 0; ind < cover_list.length; ind++) {
            var point = cover_list[ind].point;
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
    // 添加点标注
    CoverComponent.prototype.addPoint = function (val) {
        var _this = this;
        var markers = [];
        var points = [];
        var that = this;
        val.map(function (item, i) {
            var point = new BMap.Point(item.point.lng, item.point.lat);
            // const name = item.name;
            // 添加自定义覆盖物
            var myIcon;
            if (item.alarm && item.alarm !== 0) {
                myIcon = new BMap.Icon('../../../../assets/imgs/cover-lose.gif', new BMap.Size(36, 36));
            }
            else if (item.offline === true) {
                myIcon = new BMap.Icon('../../../../assets/imgs/cover-offline.png', new BMap.Size(36, 36));
            }
            else if (item.lowBattery === true) {
                myIcon = new BMap.Icon('../../../../assets/imgs/cover-lowpower.png', new BMap.Size(36, 36));
            }
            else {
                myIcon = new BMap.Icon('../../../../assets/imgs/cover-normal.png', new BMap.Size(36, 36));
            }
            // myIcon.setAnchor(new BMap.Size(16, 38));
            var marker2 = new BMap.Marker(point, { icon: myIcon }); // 创建标注
            _this.map.addOverlay(marker2);
            markers.push(marker2); // 聚合
            points.push(point); // 聚合
        });
        var _loop_1 = function (index) {
            var marker = markers[index];
            this_1.coverService.getDeviceIssues(val[index].id, 0).subscribe({
                next: function (res1) {
                    that.coverService.getDeviceIssues(val[index].id, 1).subscribe({
                        next: function (res2) {
                            that.openSideBar(marker, that.map, val[index], points[index], res1, res2);
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
                    // that.openSideBar(marker, that.map, val[index], points[index], res);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        };
        var this_1 = this;
        // 点击点标注事件
        for (var index = 0; index < markers.length; index++) {
            _loop_1(index);
        }
    };
    // 标注消息列表中点击的井盖事件
    CoverComponent.prototype.findPoint = function (item) {
        var marker;
        var that = this;
        var makers = this.map.getOverlays();
        var point = new BMap.Point(item.point.lng, item.point.lat);
        that.map.centerAndZoom(point, 18);
        that.getCovers(); // 获取井盖
        this.model.issueId = item.id;
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
    // 地图点注标-点击事件
    CoverComponent.prototype.openSideBar = function (marker, baiduMap, mess, point, res1, res2) {
        // const res = this.getDeviceIssues(mess.id);
        /*
        res1: 待处理
        res2: 处理中
        */
        var that = this;
        var opts = {
            width: 350,
            // height: 100,     // 信息窗口高度
            // title: `${val.name} | ${val.id }`, // 信息窗口标题
            // enableMessage: true, // 设置允许信息窗发送短息
            enableAutoPan: true,
        };
        var txt = "<p style='font-size: 12px; line-height: 1.8em; border-bottom: 1px solid #ccc; padding-bottom: 10px;'>";
        txt = txt + ("\u8BBE\u5907\u7F16\u53F7 | " + mess.name + " | " + mess.id + "</p><p> \u8BBE\u5907\u540D\u79F0\uFF1A" + mess.description + "</p>");
        if (mess.lowBattery === false) {
            txt = txt + "<p> <span style='color: blue'>\u7535\u91CF\uFF1A\u6B63\u5E38</span></p>";
        }
        else {
            txt = txt + "<p> <span style='color: red'>\u7535\u91CF\uFF1A\u4F4E</span></p>";
        }
        if (mess.alarm === 0) {
            txt = txt + "<p> <span style='color: blue'>\u8B66\u62A5\uFF1A\u6B63\u5E38</span></p>";
        }
        else {
            txt = txt + ("<p> <span style='color: red'>\u8B66\u62A5\uFF1A" + mess.alarm + "\u7EA7</span></p>");
        }
        // if (mess.error === false) {
        //   txt = txt + `<p> 是否故障：否</p>`;
        // } else {
        //   txt = txt + `<p> 是否故障：<span style='color: red'>是</span></p>`;
        // }
        if (mess.offline === false) {
            txt = txt + "<p> <span style='color: blue'>\u5728\u7EBF</span></p>";
        }
        else {
            txt = txt + "<p> <span style='color: red'>\u79BB\u7EBF</span></p>";
        }
        // if (mess.lowBattery || mess.alarm || mess.error || mess.offline) {
        if (res1 && res1.length > 0) {
            txt = txt + "<hr><span style='color: red;'>\u5F85\u5904\u7406\u4E8B\u4EF6\uFF1A</span>";
            for (var index = 0; index < res1.length; index++) {
                var element = res1[index];
                txt = txt + ("<span style='color: red;'>" + element.typeName + "</span>");
            }
            var m = "massage-lsq" + mess.id;
            var p = "massage-post" + mess.id;
            var selId = "select" + mess.id;
            txt = txt + ("\n      <div class=\"form-inline\">\n        <label class=\"control-label\" style='font-size: 14px; margin: 5px'>\n          \u6307\u6D3E\u4EBA\u5458\uFF1A<span style=\"color: red;\">*</span>\n        </label>\n        <select name=\"assignUser\" class=\"cur-pointer form-control\" style='font-size: 14px; margin: 5px'\n          id=\"" + selId + "\"></select></div>"); // onchange="${that.model.curUser}=options[selectedIndex].value"
            txt = txt + ("<label>\u5904\u7406\u4FE1\u606F\uFF1A</label><textarea id=" + m + "  rows=\"3\"  style='width:100%;'></textarea>");
            txt = txt + ("<p><button id=" + p + " class='btn btn-outline-info cur-point' style='font-size: 14px; float: right; margin: 5px'>\n      \u5904\u7406</button></p>");
        }
        if (res2 && res2.length > 0) {
            txt = txt + "<hr><span style='color: #ffb822;'>\u5904\u7406\u4E2D\u4E8B\u4EF6\uFF1A</span>";
            for (var index = 0; index < res2.length; index++) {
                var element = res2[index];
                txt = txt + ("<span style='color: #ffb822;'>" + element.typeName + "</span>");
            }
        }
        var infoWindow = new BMap.InfoWindow(txt, opts);
        that.model.infoW1 = infoWindow;
        marker.addEventListener('click', function () {
            that.model.infoW = baiduMap.openInfoWindow(infoWindow, point); // 开启信息窗口
            that.model.deviceId = mess.id;
            var obj = document.getElementById("select" + mess.id);
            if (obj) {
                // obj.append(new Option('请选择处理用户', ''));
                for (var i = 0; i < that.model.userList.length; i++) {
                    // console.log('option');
                    obj.append(new Option(that.model.userList[i].userName, that.model.userList[i].userName));
                }
            }
            setTimeout(function () {
                that.deviceAddEventListener(mess);
            }, 0);
        });
    };
    // 点击处理按钮事件
    CoverComponent.prototype.deviceAddEventListener = function (mess) {
        var that = this;
        var m = "massage-lsq" + mess.id;
        var p = "massage-post" + mess.id;
        var selId = "select" + mess.id;
        var message_l = document.getElementById(m);
        var message_p = document.getElementById(p);
        var selectUser = document.getElementById(selId); // 用户下拉列表
        var curUser = '';
        if (selectUser) {
            selectUser.addEventListener('change', function () {
                var selIndex = selectUser['selectedIndex'];
                curUser = that.model.userList[selIndex].id;
            });
        }
        if (message_p) {
            message_p.addEventListener('click', function () {
                if (curUser) {
                    var issueId = that.model.deviceId; // 当前弹框所指设备的id
                    that.setDeviceIssues(issueId, 0, 1, message_l['value'], curUser); // 更改该设备下所有待处理事件的状态
                    that.map.closeInfoWindow(that.model.infoW1); // 关闭窗口
                    that.getMessage(); // 刷新消息列表
                }
            });
        }
    };
    // 设置指定设备事件状态
    CoverComponent.prototype.setDeviceIssues = function (issueId, orgState, state, comment, curUser) {
        var that = this;
        this.coverService.setDeviceIssues(issueId, orgState, state, comment, curUser).subscribe({
            next: function () {
                if (that.model.infoW) {
                    that.model.infoW.clickclose();
                }
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 修改状态
    CoverComponent.prototype.setIssues = function (issueId, state, comment) {
        var that = this;
        this.coverService.setIssues(issueId, state, comment).subscribe({
            next: function () {
                that.model.infoW.clickclose();
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 解析地址- 设置中心和地图显示级别
    CoverComponent.prototype.getPoint = function (baiduMap, city) {
        var zoom = this.switchZone(city.level);
        console.log(city);
        var pt = city.center;
        var point = new BMap.Point(pt.lng, pt.lat);
        baiduMap.centerAndZoom(point, zoom);
    };
    // 获取数据
    // 获取城市列表 --ok
    CoverComponent.prototype.getCity = function () {
        var that = this;
        this.monitorService.getZoneDefault(this.deviceTypeId).subscribe({
            next: function (val) {
                that.map_model.cityList = val.regions;
                // that.zoom = that.switchZone(val.zone.level);
                // that.node = that.getNode(val.regions, val.zone.region_id);
                that.node = that.getNode(val.regions, val.regions[0].children[0].id); // 当前城市
                that.map_model.currentCity = that.node;
                that.map_model.currentChildren = that.node.children;
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // 省市区街道-地图级别
    CoverComponent.prototype.switchZone = function (level) {
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
    CoverComponent.prototype.getNode = function (json, nodeId) {
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
    // 进入数据监控页面
    CoverComponent.prototype.jumpHandle = function () {
        this.router.navigate(["home/application/issuedata"]);
    };
    // 进入全屏
    CoverComponent.prototype.enterFullScreen = function () {
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
    // 获取对应处理状态的消息
    CoverComponent.prototype.readHandleType = function (mess, messtype) {
        var handletype = mess.handleType;
        if (messtype === handletype) {
            return true;
        }
        else {
            return false;
        }
    };
    // 选择区域
    // 选择城市
    CoverComponent.prototype.selecteCity = function (city) {
        this.map_model.currentCity = city;
        this.getPoint(this.map, city); // 解析地址- 设置中心和地图显示级别
        this.map_model.currentChildren = city.children;
    };
    CoverComponent.prototype.selecteblock = function (block) {
        this.getPoint(this.map, block); // 解析地址- 设置中心和地图显示级别
        this.map_model.currentArea = block;
    };
    // 显示区域
    CoverComponent.prototype.showArea = function () {
        this.areashow = true;
    };
    // 显示城市
    CoverComponent.prototype.showCiyt = function () {
        this.cityshow = true;
    };
    // 显示设备
    // showDevice() {
    //   this.deviceshow = true;
    // }
    // 选择区域
    CoverComponent.prototype.arealistMouseover = function (area) {
        this.map_model.currentBlock = area.children;
    };
    // 离开区域
    CoverComponent.prototype.arealistMouseleave = function () {
        this.areashow = false;
        this.map_model.currentBlock = [];
    };
    // 离开城市
    CoverComponent.prototype.citylistMouseleave = function () {
        this.cityshow = false;
    };
    // 离开设备
    // devicelistMouseleave() {
    //   this.deviceshow = false;
    // }
    CoverComponent.prototype.arealistMouseNone = function () {
        this.areashow = true;
        this.map_model.currentBlock = [];
    };
    // 消息相关
    // 显示 未处理 消息
    CoverComponent.prototype.showUntartedList = function () {
        this.showunstartedlist = true;
    };
    // 显示 处理中 消息
    CoverComponent.prototype.showOnprogressList = function () {
        this.showonprogresslist = true;
    };
    // 显示 已处理消息
    CoverComponent.prototype.showFinishedList = function () {
        this.showfinishedlist = true;
    };
    // 离开 未处理
    CoverComponent.prototype.messageListMouseleave_1 = function () {
        this.showunstartedlist = false;
    };
    // 离开 处理中
    CoverComponent.prototype.messageListMouseleave_2 = function () {
        this.showonprogresslist = false;
    };
    // 离开 已处理
    CoverComponent.prototype.messageListMouseleave_3 = function () {
        this.showfinishedlist = false;
    };
    CoverComponent.prototype.ngOnDestroy = function () {
        window.clearInterval(this.timer);
    };
    __decorate([
        core_1.ViewChild('map3'),
        __metadata("design:type", core_1.ElementRef)
    ], CoverComponent.prototype, "map_container", void 0);
    CoverComponent = __decorate([
        core_1.Component({
            selector: 'app-cover',
            templateUrl: './cover.component.html',
            styleUrls: ['./cover.component.scss']
        }),
        __metadata("design:paramtypes", [cover_service_1.CoverService, monitor_service_1.MonitorService, mess_service_1.MessService,
            router_1.Router])
    ], CoverComponent);
    return CoverComponent;
}());
exports.CoverComponent = CoverComponent;
//# sourceMappingURL=cover.component.js.map