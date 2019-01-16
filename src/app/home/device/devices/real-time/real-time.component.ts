import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.scss']
})
export class RealTimeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  // 进入数据监控页面
  jumpHandle() {
    this.router.navigate([`home/device/devices/real-timeAbout`]);
  }
}
