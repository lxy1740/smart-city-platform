import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
// import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
// import {  NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
// import { AirmonitorService } from '../../service/airmonitor.service';
// import { saveAs } from 'file-saver';

const now = new Date();

@Component({
  selector: 'app-airreport',
  templateUrl: './airreport.component.html',
  styleUrls: ['./airreport.component.scss']
})
export class AirreportComponent implements OnInit {



  constructor(private modalService: NgbModal, public router: Router) {


  }

  ngOnInit() {

  }

}
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: airreport.component.ts
@ introduction: 监测大数据
@ln:196
@time: 2018 / 7 / 2 17: 18

*/
