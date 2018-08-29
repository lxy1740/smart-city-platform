import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AirmonitorService } from '../../service/airmonitor.service';
// import { Point } from '../../data/point.type';

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
  historydatalist: any; // 指定设备的历史数据集合

  constructor(private modalService: NgbModal, public router: Router,
    private airmonitorService: AirmonitorService) {
    // 获取坐标范围
    this.NorthEast = JSON.parse(localStorage.getItem('NE'));
    this.SouthWest = JSON.parse(localStorage.getItem('SW'));
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
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  
  // 点击左侧监测点
  selectPoint(device) {
    this.currentdevice = device;
    this.getHistoryData();
  }
  // 获取指定设备的历史数据记录
  getHistoryData() {
    const that = this;
    const fromdate = '2018-01-01T00:00';
    const todate = '2018-12-30T23:59';
    this.airmonitorService.getHistoryData(this.currentdevice.id, fromdate, todate).subscribe({
      next: function (val) {
        that.historydatalist = val.items;
        console.log(that.historydatalist);
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
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
