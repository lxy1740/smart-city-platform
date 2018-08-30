import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AirmonitorService } from '../../service/airmonitor.service';
import { saveAs } from 'file-saver';

const now = new Date();

@Component({
  selector: 'app-airreport',
  templateUrl: './airreport.component.html',
  styleUrls: ['./airreport.component.scss']
})
export class AirreportComponent implements OnInit {
  currentdevice: any; // 当前设备
  devicelist: any;  // 设备集合
  NorthEast: any; // 坐标点
  SouthWest: any; // 坐标点
  closeResult: string;
  historydatalist = []; // 指定设备的历史数据集合
  historydatalistItems: any;
  deviceIndx = 0;
  total: any;

  page = 1;

  startDate: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期
  endDate: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期


  startTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  endTime: NgbTimeStruct = { hour: 23, minute: 59, second: 59 };
  seconds = true;
  constructor(private modalService: NgbModal, public router: Router,
    private airmonitorService: AirmonitorService, config: NgbTimepickerConfig) {
    // 获取坐标范围
    this.NorthEast = JSON.parse(localStorage.getItem('NE'));
    this.SouthWest = JSON.parse(localStorage.getItem('SW'));

    config.spinners = false; // 时间控制

  }

  ngOnInit() {
    this.getDevices();
  }

  // 根据当前坐标范围，获取所有在内的设备
  getDevices() {
    const that = this;

    this.airmonitorService.getAirDevice(this.NorthEast, this.SouthWest).subscribe({
      next: function (val) {
        that.devicelist = val;
        that.currentdevice = val[0];
      },
      complete: function () {
        that.getHistoryData();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 点击左侧监测点
  selectPoint(index, device) {
    this.currentdevice = device;
    this.deviceIndx = index;
    this.getHistoryData();
  }
  // 获取指定设备的历史数据记录
  getHistoryData() {
    const that = this;
    const fromdate1 = '2018-01-01T00:00';
    const todate1 = '2018-12-30T23:59';

    const smonth = this.startDate.month.toString().length > 1 ? this.startDate.month.toString() : `0${this.startDate.month.toString()}`;
    const sday = this.startDate.day.toString().length > 1 ? this.startDate.day.toString() : `0${this.startDate.day.toString()}`;

    const shour = this.startTime.hour.toString().length > 1 ? this.startTime.hour.toString() : `0${this.startTime.hour.toString()}`;
    const sminute = this.startTime.minute.toString().length > 1 ? this.startTime.minute.toString() : `0${this.startTime.minute.toString()}`;

    const emonth = this.endDate.month.toString().length > 1 ? this.endDate.month.toString() : `0${this.endDate.month.toString()}`;
    const eday = this.endDate.day.toString().length > 1 ? this.endDate.day.toString() : `0${this.endDate.day.toString()}`;

    const ehour = this.endTime.hour.toString().length > 1 ? this.endTime.hour.toString() : `0${this.endTime.hour.toString()}`;
    const eminute = this.endTime.minute.toString().length > 1 ? this.endTime.minute.toString() : `0${this.endTime.minute.toString()}`;

    const fromdate =
      `${this.startDate.year}-${smonth}-${sday}T${shour}:${sminute}`;

    const todate = `${this.endDate.year}-${emonth}-${eday}T${ehour}:${eminute}`;
    const page = this.page;
    const pageSize = 10;
    this.airmonitorService.getHistoryData(this.currentdevice.id, fromdate, todate, page, pageSize).subscribe({
      next: function (val) {
        that.historydatalist = val;
        that.historydatalistItems = val.items;
        that.total = val.total;
        // console.log(that.historydatalist);
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
    this.getHistoryData();
  }

  // 返回空气质量页面
  jumpHandle() {
    this.router.navigate([`home/application/air`]);
  }
  // 获取当前设备的离线状态
  getdevicestatus(val) {
    if (val.offline) {
      return '离线';
    } else {
      return '在线';
    }
  }

  // 导出表格
  exportTable() {
    const blob = new Blob([document.getElementById('exportableTable').innerHTML], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
    });
    saveAs(blob, 'test.xls');
  }


  // 模态框
  openGenerateTables(content) {  // 批量导入
    const that = this;
    this.modalService.open(content, { windowClass: 'max-modal' }).result.then((result) => {
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
}
