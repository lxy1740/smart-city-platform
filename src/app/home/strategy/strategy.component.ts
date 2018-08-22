/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: strategy.componen.ts
@time: 2018 /8 / 16 9: 00

*/
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
    data: new Date()
  },
    {
      name: '策略二',
      data: new Date()
    }]; // 策略
  dateList = []; // 日期策略
  holidayList = []; // 时间策略
  workdayList = []; // 工作时间策略
  rangeList = []; // 策略范围

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


  public zTreeOnClick: (event, treeId, treeNode) => void;
  constructor(private modalService: NgbModal, private videoService: VideoService, public element: ElementRef) {
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
    // setTimeout(() => {
    //   this.chartMapChana2();
    // }, 2);

  }
  chartMapChana2() {

    const option = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          radius: '100%',
          startAngle: 90,
          endAngle: -269,
          clockwise: true,
          min: 0,
          max: 24,
          splitNumber: 24,
          detail: false,
          // detail: { formatter: '{value}%' },
          data: [{ value: 50, name: '' }]
        }
      ]
    };

    // setInterval(function () {
    //   option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
    //   myChart.setOption(option, true);
    // }, 2000);

    const bmapChart = echarts.init(document.getElementById('map_container2'));
    bmapChart.setOption(option);
  }

  // 添加策略弹框操作
  openAddStrategy(content, index) {
    const that = this;
    const modal = this.modalService.open(content, { size: 'sm' });
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

  // 弹框操作
  open(content, index) {

    const that = this;
    this.strategy_index = index;
    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      that.removeStrategy();

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }
   open2(content) {

    const that = this;

    const modal = this.modalService.open(content, { size: 'lg' });
    setTimeout(() => {
      console.log(this.element.nativeElement.querySelector('#map3'));

    }, 2);
    that.addBeiduMap2();
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);

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
      this.strategyList.push({ name: this.strategyName, date: new Date() });
      console.log(this.strategyList);
    } else if (type === 'date') {
      this.dateList.push({ date: new Date() });
    } else if (type === 'holiday') {
      this.holidayList.push({ date: new Date() });
    } else if (type === 'workday') {
      this.workdayList.push({ date: new Date() });
    } else {
      this.rangeList.push({ date: new Date() });

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
