import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MonitorService } from '../../../service/monitor.service';
import { AirmonitorService } from '../../../service/airmonitor.service';
// import { AIRDATALIST } from '../../../data/air-data';
import { Point } from '../../../data/point.type';
import { CircleOverlarAirService } from '../../../service/circle-overlay-air.service';

// baidu map
declare let BMap;
declare let $: any;
declare let BMapLib;
declare let BMAP_ANCHOR_BOTTOM_RIGHT;
declare let BMAP_ANCHOR_TOP_RIGHT;
declare let BMAP_ANCHOR_TOP_LEFT;

@Component({
  selector: 'app-air',
  templateUrl: './air.component.html',
  styleUrls: ['./air.component.scss']
})
export class AirComponent implements OnInit {

  @ViewChild('map6') map_container: ElementRef;
  model: any = {}; // 存储数据

  map: any; // 地图对象

  cityList: any; // 城市列表
  deviceList: any; // 城市列表
  defaultZone: any; // 默认城市
  currentCity: any; // 当前城市
  currentChildren: any; // 当前城市节点
  currentBlock: any; // 当前城市街道
  currentAirIdex: any; // 当前空气指标选项

  visible = true; // 控制可视区域
  areashow = false; // 默认区域列表不显示
  cityshow = false; // 默认区域列表不显示
  zoom: any; // 地图级数

  parentNode = null; // 用于递归查询JSON树 父子节点
  node = null; // 用于递归查询JSON树 父子节点

  SouthWest: Point; // 地图视图西南角
  NorthEast: Point; // 地图视图东北角
  airdevicelist: any;
  idexofHtml: any;
  allIdexs = [
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
      name: 'VTOC'
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
  // pm25list = AIRDATALIST.list;

  constructor(private monitorService: MonitorService, private airmonitorService: AirmonitorService,
    public router: Router) {
      this.idexofHtml = this.allIdexs[0];
    }
  ngOnInit() {
    this.currentAirIdex = 'PM25';
    this.addBeiduMap();
    this.getCity(); // 获取城市列表
  }

  // 百度地图API功能
  addBeiduMap() {

    const map = this.map = new BMap.Map(this.map_container.nativeElement, {
      enableMapClick: true,
      minZoom: 11,
      // maxZoom : 11
    }); // 创建地图实例

    // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
    const point = new BMap.Point(113.950723, 22.558888); // 坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 15); // 设置中心和地图显示级别
    // map.setMapStyle({ style: 'googlelite' });

    // 添加控件缩放
    const offset = new BMap.Size(20, 55);
    const navigationControl = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: offset,
    });
    map.addControl(navigationControl);

    map.enableScrollWheelZoom(true); // 启动滚轮放大缩小，默认禁用
    // const marker = new BMap.Marker(point);  // 创建标注
    // map.addOverlay(marker);               // 将标注添加到地图中
    this.addMarkers();
    this.dragendOff(map);
    this.zoomendOff(map);
  }
  // 添加地图内的设备标记
  addMarkers() {
    this.getPositions();
  }
  // 监控-拖动地图事件-显示用户拖动地图后地图中心的经纬度信息。
  dragendOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('dragend', function () {
      baiduMap.clearOverlays();
      that.addMarkers(); // 获取数据-添加标注
    });
  }
  // 监控-地图缩放事件-地图缩放后的级别。
  zoomendOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('zoomend', function () {
      // if (that.isqueryPoint === true) {
      //   that.isqueryPoint = false;
      // } else {
        baiduMap.clearOverlays();
        that.addMarkers(); // 添加标注
        // console.log('地图缩放至：' + baiduMap.getZoom() + '级');
      // }
    });
  }
  // 获取设备坐标点
  getPositions() {
    const that = this;
    const Bounds = this.map.getBounds(); // 返回地图可视区域，以地理坐标表示
    const NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
    const SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角
    localStorage.setItem('NE', JSON.stringify(NorthEast));
    localStorage.setItem('SW', JSON.stringify(SouthWest));

    let value;
    this.airmonitorService.getAirDevice(NorthEast, SouthWest).subscribe({
      next: function (val) {
        value = val;
      },
      complete: function () {
        that.addPoint(value);
        // localStorage.setItem('DEVICES', JSON.stringify(value));
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  // 根据当前空气指标加载对应图标
  addPoint(val) {
    switch (this.currentAirIdex) {
      case 'PM25': this.addPm25Point(val); break;
      case 'PM10': this.addPm10Point(val); break;
      case 'TVOC': this.addTvocPoint(val); break;
      case '温度': this.addTempPoint(val); break;
      case '湿度': this.addHumidPoint(val); break;
      default: break;
    }
  }
  // 添加覆盖物图标
  addPm25Point(val) {
    const that = this;
    val.map((item, i) => {
      const point = new BMap.Point(item.point.lng, item.point.lat);
      let myIcon;
      let hasValue = false;  // 是否有效值，数大于0

      const length = 60;  // 图标大小
      let color;  // 背景色
      const mouseoverColor = '#9bd9dd';  // 划过背景色
      const name = 'PM2.5';
      const pm25value = item.pm25;
      // 背景颜色按级显示
      if (item.pm25 >= 0 && item.pm25 <= 50) {
        color = '#86ab61';
        hasValue = true;
      } else if (item.pm25 > 50 && item.pm25 <= 100) {
        color = '#4eb4cf';
        hasValue = true;
      } else if (item.pm25 > 100 && item.pm25 <= 150) {
        color = '#eda636';
        hasValue = true;
      } else if (item.pm25 > 150 && item.pm25 <= 200) {
        color = '#d84e4a';
        hasValue = true;
      } else if (item.pm25 > 200) {
        color = '#10110e';
        hasValue = true;
      }
      if (hasValue) {
        myIcon = new CircleOverlarAirService(point, name, pm25value, length, color, mouseoverColor);
      }
      this.map.addOverlay(myIcon);
    });
    // 点击圆形标注事件
    // for (let index = 0; index < that.markers.length; index++) {
    //   const marker = that.markers[index];
    //   const item = val[index];
    //   this.setZoom(marker, this.map, item);
    // }
  }
  addPm10Point(val) {
    const that = this;
    val.map((item, i) => {
      const point = new BMap.Point(item.point.lng, item.point.lat);
      let myIcon;
      const length = 60;  // 图标大小
      const color = '#4eb4cf';  // 背景色
      const mouseoverColor = '#9bd9dd';  // 划过背景色
      const name = 'PM10';
      const pm10value = item.pm10;
      myIcon = new CircleOverlarAirService(point, name, pm10value, length, color, mouseoverColor);
      this.map.addOverlay(myIcon);
    });
  }
  addTvocPoint(val) {
    const that = this;
    val.map((item, i) => {
      const point = new BMap.Point(item.point.lng, item.point.lat);
      let myIcon;
      const length = 60;  // 图标大小
      const color = '#4eb4cf';  // 背景色
      const mouseoverColor = '#9bd9dd';  // 划过背景色
      const name = 'TVOC';
      const tvocvalue = item.tvoc;
      myIcon = new CircleOverlarAirService(point, name, tvocvalue, length, color, mouseoverColor);
      this.map.addOverlay(myIcon);
    });
  }
  addTempPoint(val) {
    const that = this;
    val.map((item, i) => {
      const point = new BMap.Point(item.point.lng, item.point.lat);
      let myIcon;
      const length = 60;  // 图标大小
      const color = '#4eb4cf';  // 背景色
      const mouseoverColor = '#9bd9dd';  // 划过背景色
      const name = '温度';
      const tempvalue = item.temperature;
      myIcon = new CircleOverlarAirService(point, name, tempvalue, length, color, mouseoverColor);
      this.map.addOverlay(myIcon);
    });
  }
  addHumidPoint(val) {
    const that = this;
    val.map((item, i) => {
      const point = new BMap.Point(item.point.lng, item.point.lat);
      let myIcon;
      const length = 60;  // 图标大小
      const color = '#4eb4cf';  // 背景色
      const mouseoverColor = '#9bd9dd';  // 划过背景色
      const name = '湿度';
      const humidvalue = item.humidity;
      myIcon = new CircleOverlarAirService(point, name, humidvalue, length, color, mouseoverColor);
      this.map.addOverlay(myIcon);
    });
  }



  // 返回地图可视区域，以地理坐标表示
  getBounds(baiduMap) {
    const Bounds = baiduMap.getBounds(); // 返回地图可视区域，以地理坐标表示
    this.NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
    this.SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角
    this.zoom = baiduMap.getZoom(); // 地图级别

  }


  // 获取城市列表 --ok
  getCity() {
    const that = this;

    this.monitorService.getZoneDefault().subscribe({
      next: function (val) {
        that.cityList = val.regions;
        that.currentCity = val.zone;
        that.zoom = that.switchZone(val.zone.level);
        that.node = that.getNode(val.regions, val.zone.region_id);
        that.currentChildren = that.node.children;
      },
      complete: function () {
        // that.addBeiduMap(); // 创建地图

      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  // 省市区街道-地图级别
  switchZone(level) {
    let zone = 12;
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
  }
  getNode(json, nodeId) {
    const that = this;

    // 1.第一层 root 深度遍历整个JSON
    for (let i = 0; i < json.length; i++) {
      if (that.node) {
        break;
      }

      const obj = json[i];

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
      } else {

        // 3.如果有子节点就开始找
        if (obj.children) {
          // 4.递归前，记录当前节点，作为parent 父亲
          that.parentNode = obj;

          // 递归往下找
          that.getNode(obj.children, nodeId);
        } else {
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
  }
  // 解析地址- 设置中心和地图显示级别
  getPoint(baiduMap, city) {
    const that = this;
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder();
    const zoom = this.zoom = this.switchZone(city.level);
    const fullName = city.full_name;
    console.log(city);

    let pt;

    // 将地址解析结果显示在地图上,并调整地图视野，获取数据-添加标注
    myGeo.getPoint(fullName, function (point) {
      if (point) {
        baiduMap.centerAndZoom(point, zoom);
        pt = point;

      } else {
        console.log('您选择地址没有解析到结果!');
      }
    }, '');
  }
  // 选择区域
  // 选择城市
  selecteCity(city) {
    this.currentCity = city;
    this.node = city;
    this.getPoint(this.map, city);  // 解析地址- 设置中心和地图显示级别
    this.currentChildren = city.children;
  }

  selecteblock(block) {
    this.getPoint(this.map, block);  // 解析地址- 设置中心和地图显示级别
  }

  // 显示区域
  showArea() {
    this.areashow = true;
  }
  // 显示城市
  showCiyt() {
    this.cityshow = true;
  }
  // 离开城市
  citylistMouseleave() {
    this.cityshow = false;
  }
  // 选择区域
  arealistMouseover(area) {

    this.currentBlock = area.children;
  }

  // 离开区域
  arealistMouseleave() {
    this.areashow = false;
    this.currentBlock = null;
  }

  arealistMouseNone() {
    this.areashow = true;
    this.currentBlock = null;
  }
  // 进入数据监控页面
  jumpHandle() {
    this.router.navigate([`home/airreport`]);

  }
  // 切换指标
  onIndexChange() {
    this.currentAirIdex = this.idexofHtml.name;
    this.map.clearOverlays();
    this.addMarkers();
  }
}
