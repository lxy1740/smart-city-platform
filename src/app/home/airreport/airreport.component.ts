import { Component, OnInit } from '@angular/core';
import { AIRAREALIST } from '../../data/air-arealist';
import { AIRDATALIST } from '../../data/air-data';

@Component({
  selector: 'app-airreport',
  templateUrl: './airreport.component.html',
  styleUrls: ['./airreport.component.scss']
})
export class AirreportComponent implements OnInit {
  isCollapsed = false;
  arealist = AIRAREALIST.list;
  airreport = AIRDATALIST.list;
  currentpoint: any; // 当前观测点
  showrightblock = false; // 显示右侧具体信息
  constructor() { }

  ngOnInit() {
  }
  selectpoint(airpoint) {
    this.currentpoint = airpoint;
    this.showrightblock = true;
  }
}
