import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import {  NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DeviceHistoryService } from '../../../../service/device-history.service';

const now = new Date();
@Component({
  selector: 'app-history-data',
  templateUrl: './history-data.component.html',
  styleUrls: ['./history-data.component.scss']
})
export class HistoryDataComponent implements OnInit {
  deviceId: string; // 设备id
  dataKey: string; // 设备属性
  page = 1; // 分页
  pageSize = 10; // 分页
  total = 0; // 分页
  historydatalist = []; // 数据列表
  startDate: NgbDateStruct = { year: now.getFullYear() - 1, month: now.getMonth() + 1, day: now.getDate() }; // 开始日期
  // startDate: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期
  endDate: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期

  startTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  endTime: NgbTimeStruct = { hour: 23, minute: 59, second: 59 };

  fromdate: any; // 开始日期
  todate: any; // 结束日期

  constructor(private routerinfo: ActivatedRoute,
    public router: Router,
    private deviceHistoryService: DeviceHistoryService,
    ) {
  }
  flag = 1;
  ngOnInit() {
    this.deviceId = this.routerinfo.snapshot.params.deviceId;
    this.dataKey = this.routerinfo.snapshot.params.dataKey;
    console.log(this.deviceId);
    console.log(this.dataKey);
    this.getHistoryData();
  }
  // 返回
  goback() {
    window.history.back();
  }

  // 页面跳转
  jumpHandle(url) {
    this.router.navigate([url]);
  }


   // tab切换
  goToChange() {
    if (this.flag === 1) {
      this.flag = 2;
    } else {
      this.flag = 1;
    }
  }

  // 获取指定设备的历史数据记录
  getHistoryData() {
    const that = this;
    const smonth = this.startDate.month.toString().length > 1 ? this.startDate.month.toString() : `0${this.startDate.month.toString()}`;
    const sday = this.startDate.day.toString().length > 1 ? this.startDate.day.toString() : `0${this.startDate.day.toString()}`;

    const shour = this.startTime.hour.toString().length > 1 ? this.startTime.hour.toString() : `0${this.startTime.hour.toString()}`;
    const sminute = this.startTime.minute.toString().length > 1 ? this.startTime.minute.toString() : `0${this.startTime.minute.toString()}`;

    const emonth = this.endDate.month.toString().length > 1 ? this.endDate.month.toString() : `0${this.endDate.month.toString()}`;
    const eday = this.endDate.day.toString().length > 1 ? this.endDate.day.toString() : `0${this.endDate.day.toString()}`;

    const ehour = this.endTime.hour.toString().length > 1 ? this.endTime.hour.toString() : `0${this.endTime.hour.toString()}`;
    const eminute = this.endTime.minute.toString().length > 1 ? this.endTime.minute.toString() : `0${this.endTime.minute.toString()}`;

    const fromdate = this.fromdate =
      `${this.startDate.year}-${smonth}-${sday}T${shour}:${sminute}`;

    const todate = this.todate = `${this.endDate.year}-${emonth}-${eday}T${ehour}:${eminute}`;

    this.deviceHistoryService.getHistoryProperty(this.deviceId, this.page, this.pageSize, this.dataKey, fromdate, todate, ).subscribe({
      next: function (val) {
        that.historydatalist = val.items;
        that.total = val.total;
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 分页获取数据
  pageChange() {
    this.getHistoryData();
  }

  // 搜索
  dataSearch() {
    this.page = 1;
    this.getHistoryData();
  }
}
