/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: calamity.component.ts
@time: 2018 /8 / 9 9: 00

*/
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core'; // 要求实现方法
import { MonitorService } from '../../../service/monitor.service';
import { VideoService } from '../../../service/video.service';
// baidu map
declare let BMap;
declare let BMAP_ANCHOR_TOP_LEFT;

// 装饰器函数
@Component({
  selector: 'app-calamity',
  templateUrl: './calamity.component.html',
  styleUrls: ['./calamity.component.scss']
})
export class CalamityComponent implements OnInit, OnDestroy {

  @ViewChild('map5') map_container: ElementRef;
  /*
  model:object
  light_list: array // 灾害数据
  */
  model: any = {}; // 存储数据

  /*
  map_model: object // 城市列表相关
  @currentCity: any // 当前城市
  @currentArea: any // 当前区域
  @cityList: array // 城市列表
  @currentChildren: array // 区域列表一级
  @currentBlock: array // 当前城市街道 = []; // 区域列表2级
  */

  map_model: any = {}; // 存储数据

  map: any; // 地图对象
  timer: any; // 定时器

  areashow = false; // 默认区域列表不显示
  cityshow = false; // 默认区域列表不显示
  deviceshow = false; // 默认设备列表不显示

  visible = true; // 控制可视区域

  parentNode = null; // 用于递归查询JSON树 父子节点
  node = null; // 用于递归查询JSON树 父子节点


  constructor(private monitorService: MonitorService, private videoService: VideoService ) {
    this.model.light_list = []; // 城市列表
    this.map_model.cityList = []; // 城市列表
    this.map_model.currentChildren = []; // 区域列表一级
    this.map_model.currentBlock = []; // // 当前城市街道 = []; // 区域列表2级
   }

  // 放置初始化逻辑
  ngOnInit() {
    this.addBeiduMap(); // 百度地图API功能
    this.getCity(); // 获取城市列表

  }



  // 百度地图API功能
  addBeiduMap() {

    const map = this.map = new BMap.Map(this.map_container.nativeElement, {
      enableMapClick: true,
      // minZoom: 11,
      // maxZoom : 11
    }); // 创建地图实例


    // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）

    const point = new BMap.Point(113.924755, 22.49934); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
    map.centerAndZoom(point, 16); // 设置中心和地图显示级别

    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放



    map.setMapStyle({ style: 'normal' });   // dark


    // 添加控件缩放

    const offset = new BMap.Size(20, 55);
    // 平移缩放控件
    const navigationControl = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: offset,
    });
    map.addControl(navigationControl);



    this.getLights(); // 获取地图上的点
    this.timer = setInterval(() => {
      this.getLights(); // 获取地图上的点
    }, 10000 * 60);



  }


  getLights() {
    const that = this;

    // this.videoService.getCalamity().subscribe({
    //   next: function (val) {
    //     that.model.light_list = val;
    //     const compar = that.judgeChange(that.model.light_list);
    //     console.log(compar);
    //     that.deleMarker(compar.a0); // 删除
    //     that.changeMarker(compar.b1); // 替换

    //   },
    //   complete: function () {
    //   },
    //   error: function (error) {
    //     console.log(error);
    //   }
    // });
    const Bounds = this.map.getBounds(); // 返回地图可视区域，以地理坐标表示
    const NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
    const SouthWest = Bounds.getSouthWest();

    // let compar;
    // let value;
    this.videoService.getCalamity(NorthEast, SouthWest).subscribe({
      next: function (val) {
        // value = val;
        console.log(val);
        // compar = that.comparison(that.model.coverList, val);
        // value = that.judgeChange(compar.a_arr, compar.b_arr);

        // that.changeMarker(value); // 替换
        // that.deleMarker(compar.a_surplus); // 删除
        // // that.deleMarker(value); // 删除
        // that.addMarker(compar.b_surplus); // 添加
        // // that.addPoint(value); // 添加

        // that.model.light_list = val; // 变为新值
        that.addMarker(val);

      },
      complete: function () {
        // that.addPoint(value);
      },
      error: function (error) {
        console.log(error);
      }

    });
    // this.videoService.getCalamity(NorthEast, SouthWest).subscribe({
    //   next: function (val) {
    //     console.log('val:', val);
    //     that.model.light_list = val; // 将val的值存储在light_list
    //     const compar = that.judgeChange(that.model.light_list); // 声明compar，判断变化值

    //     console.log('compar', compar); // 打印出存储在compar的数据
    //     that.deleMarker(compar.a0); // 删除
    //     that.changeMarker(compar.b1); // 替换

    //   },
    //   complete: function () {
    //   },
    //   error: function (error) {
    //     console.log(error);
    //   }
    // });


  }
  // 判断变化值
  judgeChange(array) {
    const a0 = [];
    const b1 = [];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element.error === 1) {
        b1.push(element);
      } else {
        a0.push(element); // 将值push到a0中
      }
    }
    return {
      a0: a0,
      b1: b1
    };
  }
  // 交并补
  comparison(a, b) {
    const a_arr: any[] = [];
    const b_arr: any[] = [];
    const a_surplus: any[] = [];
    const b_surplus: any[] = [];
    let i = 0;
    for (let j = 0; j < b.length; j++) {
      while (i < a.length && a[i].id < b[j].id) {
        a_surplus.push(a[i]);
        i++;
      }
      if (i >= a.length || a[i].id > b[j].id) {
        b_surplus.push(b[j]);
      } else {
        a_arr.push(a[i]);
        i++;
        b_arr.push(b[j]);
      }
    }
    return {
      a_arr: a_arr,
      b_arr: b_arr,
      a_surplus: a_surplus,
      b_surplus: b_surplus,
    };
  }
  // 判断变化值
  // judgeChange(a, b) {
  //   const changePoint: any[] = [];
  //   const length = a.length < b.length ? a.length : b.length;
  //   for (let index = 0; index < length; index++) {
  //     const a_element = a[index];
  //     const b_element = b[index];
  //     if (a_element.error !== b_element.error ||
  //       a_element.offline !== b_element.offline ||
  //       a_element.alarm !== b_element.alarm ||
  //       a_element.lowBattery !== b_element.lowBattery
  //      ) {
  //       changePoint.push(b_element);
  //     }

  //   }
  //   return changePoint;

  // }



  // 替换
  changeMarker(light_list) {
    this.deleMarker(light_list); // 删除
    this.addMarker(light_list); //  添加
  }
  // 删除
  deleMarker(light_list) {
    const makers = this.map.getOverlays();
    for (let ind = 0; ind < light_list.length; ind++) {
      const ele = light_list[ind];
      const point = light_list[ind].point;
      for (let index = 0; index < makers.length; index++) {
        const element = makers[index];
        const lat = element.point && element.point.lat;
        const lng = element.point && element.point.lng;
        if (point[1] === lat && point[0] === lng) {
          this.map.removeOverlay(makers[index]);
        }
      }
    }
  }

  // 添加点标注
  addMarker(light_list) {
    for (let index = 0; index < light_list.length; index++) {
      const item = light_list[index];
      const point = new BMap.Point(item.point.lng, item.point.lat); // 坐标

      let myIcon;
      if (item.deviceModelId === 32 && item.alarm === 1) { // 楼宇坍塌1building
        // console.log(111111111);
        myIcon = new BMap.Icon('../../../../assets/imgs/building.gif', new BMap.Size(300, 157));
        myIcon.setAnchor(new BMap.Size(16, 38));
        const marker2 = new BMap.Marker(point, { icon: myIcon });  // 创建标注
        this.map.addOverlay(marker2);
      } else if (item.deviceModelId === 33 && item.alarm === 1) { // 山体滑坡2landslide
       
        myIcon = new BMap.Icon('../../../../assets/imgs/landslide.gif', new BMap.Size(300, 157));
        myIcon.setAnchor(new BMap.Size(16, 38));
        const marker2 = new BMap.Marker(point, { icon: myIcon });  // 创建标注
        this.map.addOverlay(marker2);

      } else if (item.deviceModelId === 34 && item.alarm === 1) { // 异味臭气1odor
        myIcon = new BMap.Icon('../../../../assets/imgs/odor.gif', new BMap.Size(300, 157));
        myIcon.setAnchor(new BMap.Size(16, 38));
        const marker2 = new BMap.Marker(point, { icon: myIcon });  // 创建标注
        this.map.addOverlay(marker2);

      } else if (item.deviceModelId === 35 && item.alarm === 1) { // 燃气泄漏1gas
        myIcon = new BMap.Icon('../../../../assets/imgs/gas.gif', new BMap.Size(300, 157));
        myIcon.setAnchor(new BMap.Size(16, 38));
        const marker2 = new BMap.Marker(point, { icon: myIcon });  // 创建标注
        this.map.addOverlay(marker2);

      } else if (item.deviceModelId === 36 && item.alarm === 1) { // 道路积水1hydrops
        myIcon = new BMap.Icon('../../../../assets/imgs/hydrops.gif', new BMap.Size(300, 157));
        myIcon.setAnchor(new BMap.Size(16, 38));
        const marker2 = new BMap.Marker(point, { icon: myIcon });  // 创建标注
        this.map.addOverlay(marker2);

      }

    }
  }
  // addMarker(val) {

  // }

  // 解析地址- 设置中心和地图显示级别
  getPoint(baiduMap, city) {
    const zoom = this.switchZone(city.level);
    console.log(city);
    const pt = city.center;
    const point = new BMap.Point(pt.lng, pt.lat);
    baiduMap.centerAndZoom(point, zoom);
  }

  // 获取数据

  // 获取城市列表 --ok
  getCity() {
    const that = this;

    this.monitorService.getZoneDefault().subscribe({
      next: function (val) {
        that.map_model.cityList = val.regions;
        // that.zoom = that.switchZone(val.zone.level);
        that.node = that.getNode(val.regions, val.zone.region_id);
        that.map_model.currentCity = that.node;
        that.map_model.currentChildren = that.node.children;

      },
      complete: function () {

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

    return that.node;
  }


  // 进入全屏
  enterFullScreen() {
    console.log('进入全屏');
    console.log(this.visible);
    // this.visible = false;
    // localStorage.setItem('visible', 'false');

    // 设置缩放控件偏移量
    // const offset = new BMap.Size(20, 15);
    // this.navigationControl.setOffset(offset);

    // this.communicateService.sendMessage(this.visible); // 发布一条消息
    // this.fullScreenService.enterFullScreen();

  }


  // 选择区域
  // 选择城市
  selecteCity(city) {
    this.map_model.currentCity = city;
    this.getPoint(this.map, city);  // 解析地址- 设置中心和地图显示级别
    this.map_model.currentChildren = city.children;
  }

  selecteblock(block) {
    this.getPoint(this.map, block);  // 解析地址- 设置中心和地图显示级别
    this.map_model.currentArea = block;
  }

  // 显示区域
  showArea() {
    this.areashow = true;
  }
  // 显示城市
  showCiyt() {
    this.cityshow = true;
  }
  // 显示设备
  showDevice() {
    this.deviceshow = true;
  }

  // 选择区域
  arealistMouseover(area) {

    this.map_model.currentBlock = area.children;
  }
  // 离开区域
  arealistMouseleave() {
    this.areashow = false;
    this.map_model.currentBlock = [];
  }
  // 离开城市
  citylistMouseleave() {
    this.cityshow = false;
  }
  // 离开设备
  devicelistMouseleave() {
    this.deviceshow = false;
  }
  arealistMouseNone() {
    this.areashow = true;
    this.map_model.currentBlock = [];
  }

  ngOnDestroy() {
    window.clearInterval(this.timer);
  }
}
