/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: strategy.componen.ts
@time: 2018 /8 / 16 9: 00

*/
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { VideoService } from '../../service/video.service';

declare let echarts;
declare let BMap;
declare let $: any;
@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})

export class StrategyComponent implements OnInit {

  @ViewChild('map2') map_container: ElementRef;
  @ViewChild('map3') map_container3: ElementRef;

  modelData = {
    title: '删除',
    body: 'hh',
  };

  navs = [{
    id: 0,
    name: '策略时间'
  },
  {
    id: 1,
    name: '策略范围'
  }
  ];
  sub_navs = [{
    id: 0,
    name: '节假日时间'
  },
  {
    id: 1,
    name: '工作日时间'
  }
  ];
  nav_index = 0; // 菜单索引
  sub_nav_index = 0; // 菜单索引
  strategyList = [{
    name: '策略一',
    date: new Date(),
    dateList: [{
      startDate: '7月1日',
      endDate: '7月18日'
    },
      {
        startDate: '8月1日',
        endDate: '8月18日'
      },
      {
        startDate: '9月1日',
        endDate: '9月18日'
      }],
  },
    {
      name: '策略二',
      date: new Date(),
      dateList: [{
        startDate: '7月1日',
        endDate: '7月18日'
      },
        {
          startDate: '8月1日',
          endDate: '8月18日'
        },
        {
          startDate: '9月1日',
          endDate: '9月18日'
        }
      ],
    }]; // 策略
  dateList = []; // 日期策略
  holidayList = [
    { startTime: '7:00', endTime: '12:00', intensity: '50%', date: new Date() },
    { startTime: '12:00', endTime: '17:00', intensity: '0%', date: new Date() },
    { startTime: '17:00', endTime: '19:00', intensity: '70%', date: new Date() }
  ]; // 节假日策略
  workdayList = [
    { startTime: '7:00', endTime: '12:00', intensity: '50%', date: new Date() },
    { startTime: '12:00', endTime: '17:00', intensity: '0%', date: new Date() },
    { startTime: '17:00', endTime: '19:00', intensity: '70%', date: new Date() }
  ]; // 工作时间策略
  rangeList = [
    {
      id: 'SN0001',
      name: '太阳能灯',
      pro: '太阳能灯',
      strategy: '策略一',
      intensity: '30%',
      status: '在线'

    },
    {
      id: 'SN0002',
      name: '太阳能灯',
      pro: '太阳能灯',
      strategy: '策略一',
      intensity: '30%',
      status: '在线'

    },
    {
      id: 'SN0002',
      name: '太阳能灯',
      pro: '太阳能灯',
      strategy: '策略一',
      intensity: '30%',
      status: '在线'

    }
  ]; // 策略范围

  // 弹框
  closeResult: string;
  strategy_index: number; // 策略索引
  model: any = {}; // 存储数据
  map: any; // 地图
  zTreeObj: any;

  // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
  zNodes: any;
  city = '广州市'; // 当前选中城市
  strategyName: string; // 添加策略名称
  public mr: NgbModalRef;


  public zTreeOnClick: (event, treeId, treeNode) => void;
  constructor(private modalService: NgbModal,
     private videoService: VideoService, public element: ElementRef) {
    this.dateList = this.strategyList[0].dateList;
    // 树的操作
    // 点击
    const that = this;
    this.zTreeOnClick = (event, treeId, treeNode) => {
      this.city = treeNode.full_name;
      console.log(treeNode.tId + ', ' + treeNode.full_name);
      this.getPoint(that.map, that.city);

    };

  }

  ngOnInit() {

  }

  // 删除工作日
  closedelWorkday($event) {

    console.log($event);
    if ($event === 'ok') {
      this.delStrategy('workday');
    }
    this.mr.close();

  }

  // 删除节假日
  closedelHoliday($event)  {
    console.log($event);
    if ($event === 'ok') {
      this.delStrategy('holiday');
    }
    this.mr.close();
  }

  colseModal() {
    this.mr.close();
  }

  // 添加策略弹框操作
  openAddStrategy(content, index) {
    const that = this;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
    this.strategyName = '';
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('strategy');
      that.addStrategy('strategy');
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  // 添加工作日弹框操作
  openAddWorkday(content, index) {

    const that = this;

    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      console.log('workday');
      that.addStrategy('workday');

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }
  // 删除工作日弹框操作 // 删除节假日
  opendelWorkday(content) {

    const that = this;

    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;

  }

  // 添加工作日弹框操作
  openAddHoliday(content, index) {

    const that = this;

    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      console.log('Holiday');
      that.addStrategy('holiday');

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  changeNav(index) {
    this.nav_index = index;
    if (index === 1) {
      setTimeout(() => {
        this.getZoneDefault();

      }, 2);
    }
  }

  changeSubNav(index) {
    this.sub_nav_index = index;
  }

  addStrategy(type) {

    if (type === 'strategy') {
      this.strategyList.push({
        name: this.strategyName,
        date: new Date(),
        dateList: [{
          startDate: '7月1日',
          endDate: '7月8日'
        }]
      });

    } else if (type === 'date') {
      this.dateList.push({ startTime: '17:00', endTime: '19:00', intensity: '50%', date: new Date() });
    } else if (type === 'holiday') {
      this.holidayList.push({ startTime: '17:00', endTime: '19:00', intensity: '50%', date: new Date() });
    } else if (type === 'workday') {
      this.workdayList.push({ startTime: '17:00', endTime: '19:00', intensity: '50%', date: new Date() });
    }
  }
  delStrategy(type) {

    if (type === 'strategy') {
      this.strategyList.push({
        name: this.strategyName,
        date: new Date(),
        dateList: [{
          startDate: '7月1日',
          endDate: '7月8日'
        }]
      });

    } else if (type === 'date') {
      this.dateList.splice(0, 1);
    } else if (type === 'holiday') {
      this.holidayList.splice(0, 1);
    } else if (type === 'workday') {
      this.workdayList.splice(0, 1);
    }
  }
  removeStrategy() {
    const index = this.strategy_index;
    this.strategyList.splice(index, 1);
  }

  // 获取城市列表
  getZoneDefault() {
    const that = this;
    const setting = {// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
      callback: {
        onClick: this.zTreeOnClick
      }
    };
    this.videoService.getZoneDefault()
      .subscribe({
        next: function (res) {
          that.model.ZoneDefault = res;
          that.zNodes = res.regions;
          that.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, that.zNodes);
        },
        complete: function () {
          console.log('that.zNodes!');
          console.log(that.zNodes);
        },
        error: function (error) {
          console.log(error);
        }
      });
  }

  // 百度地图API功能
  addBeiduMap() {

    const map = this.map = new BMap.Map(this.map_container.nativeElement, {
      enableMapClick: true,
      minZoom: 11,
      // maxZoom : 11
    }); // 创建地图实例


    // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
    const point = new BMap.Point(114.064675, 22.550651); // 坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 19); // 设置中心和地图显示级别

    const marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);               // 将标注添加到地图中

  }

  // 百度地图API功能
  addBeiduMap2() {

    const map = this.map = new BMap.Map('allmap', {
      enableMapClick: true,
      minZoom: 11,
      // maxZoom : 11
    }); // 创建地图实例


    // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
    const point = new BMap.Point(114.064675, 22.550651); // 坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 19); // 设置中心和地图显示级别

    const marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);               // 将标注添加到地图中

  }

  // 解析地址- 设置中心和地图显示级别
  getPoint(baiduMap, city) {
    const that = this;
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder();
    const name = city;
    let pt;

    // 将地址解析结果显示在地图上,并调整地图视野，获取数据-添加标注
    myGeo.getPoint(name, function (point) {
      if (point) {

        baiduMap.centerAndZoom(point, 19);
        pt = point;
        const marker = new BMap.Marker(point);  // 创建标注
        baiduMap.addOverlay(marker);
      } else {
        console.log('您选择地址没有解析到结果!');
      }
    }, '');
  }

}
