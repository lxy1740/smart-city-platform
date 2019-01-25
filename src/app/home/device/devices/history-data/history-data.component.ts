import { Component, OnInit } from '@angular/core';
import {  NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();
@Component({
  selector: 'app-history-data',
  templateUrl: './history-data.component.html',
  styleUrls: ['./history-data.component.scss']
})
export class HistoryDataComponent implements OnInit {


  startDate: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期
  endDate: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期
  constructor() {
  }
  flag = 1;
  ngOnInit() {
  }
   // tab切换
  goToChange() {
    if (this.flag === 1) {
      this.flag = 2;
    } else {
      this.flag = 1;
    }
  }

  // 搜索
  dataSearch() {

  }
}
