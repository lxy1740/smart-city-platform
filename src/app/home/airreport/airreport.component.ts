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
  isCollapsed = false;
  currentdevice: any; // 当前观测设备点
  devicelist: any;
  closeResult: string;

  constructor(private modalService: NgbModal, public router: Router, private airmonitorService: AirmonitorService) {

    this.devicelist = JSON.parse(localStorage.getItem('DEVICES'));
    // console.log(points);
  }

  ngOnInit() {
    // this.getPositions();
  }
  // getPositions() {
  //   const that = this;

  //   this.airmonitorService.getAllDevice().subscribe({
  //     next: function (val) {
  //       that.devicelist = val;
  //     },
  //     complete: function () {
  //       // that.addPoint(value);
  //     },
  //     error: function (error) {
  //       console.log(error);
  //     }
  //   });
  // }

  // 点击左侧监测点
  selectPoint(device) {
    this.currentdevice = device;
  }
  jumpHandle() {
    this.router.navigate([`home/application/air`]);
  }
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
