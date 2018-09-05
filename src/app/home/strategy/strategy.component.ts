/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: strategy.componen.ts
@time: 2018 /8 / 16 9: 00

*/
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { VideoService } from '../../service/video.service';
import { StrategyService } from '../../service/strategy.service';

const now = new Date();
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;
const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;
const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

declare let echarts;
declare let BMap;
declare let $: any;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})

export class StrategyComponent implements OnInit {
  @ViewChild('map2') map_container: ElementRef;
  @ViewChild('map3') map_container3: ElementRef;
  isOptional = false;
  isEditable = false;

  numberFormControl = new FormControl('', [
    Validators.required,
  ]);
  number2FormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();
  modelData = {
    title: '删除',
    body: 'hh',
  };

  navs = [
    {
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

  strategyList = []; // 从接口获取的策略列表
  currentStrategy: any; // 当前所选策略
  ruleList = []; // 规则集合
  currentRule: any;
  strategy_del_id: any;
  strategy_del_index: any;
  dateList = []; // 日期策略

  holidayList = []; // 节假日策略
  workdayList = []; // 工作时间策略
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
  strategy_index = 0; // 策略索引
  rule_index = 0; // 策略索引
  model: any = {}; // 存储数据
  map: any; // 地图
  zTreeObj: any;

  // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
  zNodes: any;
  city = '广州市'; // 当前选中城市
  strategyName: string; // 添加策略名称
  public mr: NgbModalRef; // 当前弹框

  hoveredDate: NgbDateStruct; // 日历
  fromDate: NgbDateStruct; // 日历
  toDate: NgbDateStruct; // 日历
  time: any; // 工作日时间
  brightness = 30; // 亮度
  workday_start_time = { hour: 13, minute: 30 }; // 工作日时间
  workday_end_time = { hour: 13, minute: 30 }; // 工作日时间
  workday_start_time1: any; // 工作日时间
  workday_start_time2: any; // 工作日时间
  workday_start_time3: any; // 工作日时间
  workday_start_brightness = 30 ; // 亮度
  workday_start_brightness1: any ; // 亮度
  workday_start_brightness2: any ; // 亮度
  workday_start_brightness3: any; // 亮度
  end_brightness = 0;

  holiday_start_time = { hour: 13, minute: 30 }; // 工作日时间
  holiday_end_time = { hour: 13, minute: 30 }; // 工作日时间
  holiday_start_time1: any; // 工作日时间
  holiday_start_time2: any; // 工作日时间
  holiday_start_time3: any; // 工作日时间
  holiday_start_brightness = 30; // 亮度
  holiday_start_brightness1: any; // 亮度
  holiday_start_brightness2: any; // 亮度
  holiday_start_brightness3: any; // 亮度

  step = 1; // 步骤


  // hoveredDate: NgbDate;

  // fromDate: NgbDate;
  // toDate: NgbDate;

  isLinear = false; // 步骤
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;


  public zTreeOnClick: (event, treeId, treeNode) => void;
  constructor(private modalService: NgbModal, private strategyService: StrategyService,
     private videoService: VideoService, public element: ElementRef,
    calendar: NgbCalendar,
    private _formBuilder: FormBuilder,
    config: NgbTimepickerConfig) {
    this.fromDate = calendar.getToday();  // 日历
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10); // 日历

    config.spinners = false; // 时间控制




    // this.dateList = this.strategyList[0].dateList;
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
    this.getStrategyList();
    this.firstFormGroup = this._formBuilder.group({ // 步骤
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

  }
  // 获取策略表
  getStrategyList() {
    const that = this;
    this.strategyService.getStrategy().subscribe({
      next: function (val) {
        that.strategyList = val;
        that.currentStrategy = val[0];
      },
      complete: function () {
        that.getRules(that.currentStrategy);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 点击策略及初始化时调用
  getRules(item) {
    const that = this;
    const strategyId = item.id;
    this.strategyService.getRules(strategyId).subscribe({
      next: function (val) {
        that.ruleList = val;
      },
      complete: function () {
        that.selectRule(that.ruleList[0], 0);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 在左侧中点击一策略
  selectStrategy(item, index) {
    this.strategy_index = index;
    const that = this;
    // this.currentRule = []; // 切换到其他策略时，当前所选规则置空
    this.currentStrategy = item;
    this.getRules(item);

  }
  // 点击一个规则
  selectRule(item, i) {
    this.currentRule = item;
    this.getWorkdayList(item);
    this.rule_index = i;
  }
  // 获取工作日中间段时间
  getWorkdayList(rule) {
    this.workdayList = [];
    this.holidayList = [];
    if (!rule) {
      return;
    }
    const len = rule.workdayRules && rule.workdayRules.length;
    const len1 = rule.holidayList && rule.holidayList.length;
    if (len > 2) {
      this.workdayList = rule.workdayRules.slice(1, len);
    }

    if (len1 > 2) {
      this.holidayList = rule.holidayList.slice(1, len);
    }
  }

  // 添加策略弹框操作
  openAddStrategy(content, index) {
    const that = this;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
    this.strategyName = '';
    modal.result.then((result) => {
      console.log('strategy--add');
      that.addStrategy();  // 接口处-添加策略
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  // 接口处-添加策略
  addStrategy() {
    const that = this;
    this.strategyService.addStrategy(this.strategyName).subscribe({
      next: function (val) {
        that.getStrategyList(); // 重新获取策略
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 更新策略-弹框操作
  openUpdataStrategy(content, item, index) {
    const that = this;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
    this.strategyName = item.name;
    modal.result.then((result) => {
      console.log('strategy -updata');
      that.updateStrategy(item.id, that.strategyName);  // 接口处-更新策略
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  // 接口处-更新策略
  updateStrategy(id, name) {
    const that = this;
    this.strategyService.updateStrategy(id, name).subscribe({
      next: function (val) {
        that.getStrategyList(); // 重新获取策略
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 删除策略弹框
  openDelStrategy(content, item, i) {
    const that = this;
    this.strategy_del_id = item.id;
    this.strategy_del_index = i;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;

  }

  // 删除策略
  closeDelStrategy($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delStrategy();
    }
    this.mr.close();
  }

  // 接口处-删除策略
  delStrategy() {
    const index = this.strategy_del_index;
    this.strategyList.splice(index, 1);
    const that = this;
    const id = this.strategy_del_id;
    this.strategyService.delStrategy(id).subscribe({
      next: function (val) {
        that.getStrategyList(); // 重新获取策略
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 打开添加规则-弹框操作
  openAddRule(content, index) {
    const that = this;
    const modal = this.modalService.open(content, { size: 'lg' });
    this.mr = modal;
    modal.result.then((result) => {
      console.log('rule-add');
      that.addRules();  // 接口处-添加策略
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });

  }

  // 添加策略规则
  addRules() {
    const id = this.currentStrategy.id;
    const start = {
      day: this.fromDate.day,
      month: this.fromDate.month
    };
    const toDate = this.toDate ? this.toDate : this.fromDate;
    const end = {
      day: toDate.day,
      month: toDate.month
    };
    const workdayRules = [];
    const holidayRules = [];

    if (this.workday_start_time && this.workday_start_time.hour && this.workday_start_time.minute && this.workday_start_brightness) {
      workdayRules.push({
          'lightLevel': this.workday_start_brightness,
          'smart': true,
          'start': this.workday_start_time

      });

      if (this.workday_start_time1 && this.workday_start_time1.hour && this.workday_start_time1.minute && this.workday_start_brightness1) {
        workdayRules.push({
          'lightLevel': this.workday_start_brightness1,
          'smart': true,
          'start': this.workday_start_time1

        });
      }

      if (this.workday_start_time2 && this.workday_start_time2.hour && this.workday_start_time2.minute && this.workday_start_brightness2) {
        workdayRules.push({
          'lightLevel': this.workday_start_brightness2,
          'smart': true,
          'start': this.workday_start_time2

        });
      }
      if (this.workday_start_time3 && this.workday_start_time3.hour && this.workday_start_time3.minute && this.workday_start_brightness3) {
        workdayRules.push({
          'lightLevel': this.workday_start_brightness3,
          'smart': true,
          'start': this.workday_start_time3

        });
      }
      if (this.workday_end_time && this.workday_end_time.hour && this.workday_end_time.minute) {
        workdayRules.push({
          'lightLevel': this.end_brightness,
          'smart': true,
          'start': this.workday_end_time

        });
      }
    }

    if (this.holiday_start_time && this.holiday_start_time.hour && this.holiday_start_time.minute && this.holiday_start_brightness) {
      holidayRules.push({
        'lightLevel': this.holiday_start_brightness,
        'smart': true,
        'start': this.holiday_start_time

      });

      if (this.holiday_start_time1 && this.holiday_start_time1.hour && this.holiday_start_time1.minute && this.holiday_start_brightness1) {
        holidayRules.push({
          'lightLevel': this.holiday_start_brightness1,
          'smart': true,
          'start': this.holiday_start_time1

        });
      }

      if (this.holiday_start_time2 && this.holiday_start_time2.hour && this.holiday_start_time2.minute && this.holiday_start_brightness2) {
        holidayRules.push({
          'lightLevel': this.holiday_start_brightness2,
          'smart': true,
          'start': this.holiday_start_time2

        });
      }
      if (this.holiday_start_time3 && this.holiday_start_time3.hour && this.holiday_start_time3.minute && this.holiday_start_brightness3) {
        holidayRules.push({
          'lightLevel': this.holiday_start_brightness3,
          'smart': true,
          'start': this.holiday_start_time3

        });
      }
      if (this.holiday_end_time && this.holiday_end_time.hour && this.holiday_end_time.minute) {
        holidayRules.push({
          'lightLevel': this.end_brightness,
          'smart': true,
          'start': this.holiday_end_time

        });
      }
    }

    console.log(id);
    console.log(start);
    console.log(end);
    console.log(workdayRules);
    console.log(holidayRules);
    console.log(this.workday_start_time1);


  }

  // 关闭弹框
  colseModal() {
    this.mr.close();
  }




  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }


    if (this.fromDate !== null && this.toDate !== null) {
      console.log('from :' + this.fromDate.day);
      console.log('to :' + this.toDate.day);

      const fromStr = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
      const toStr = this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day;

    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  // isHovered = (date: NgbDateStruct) =>
  //   this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
  // isInside = (date: NgbDateStruct) =>
  //   date.after(this.fromDate) && date.before(this.toDate)
  isRange = (date: NgbDateStruct) =>
    equals(date, this.fromDate) || equals(date, this.toDate) || this.isInside(date) || this.isHovered(date)
// 按钮响应事件
  showDatepicker(d) {
    d.toggle();
  }

  // 下一步
  nextStep() {
    this.step = this.step + 1;
  }

  // 上一步
  preStep() {
    this.step = this.step - 1;
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

  // 切换菜单项-策略时间- 策略范围
  changeNav(index) {
    this.nav_index = index;
    if (index === 1) {
      setTimeout(() => {
        this.getZoneDefault();

      }, 2);
    }
  }

  // 策略范围-策略下发
  //
  //

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
