import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-real-time-about',
  templateUrl: './real-time-about.component.html',
  styleUrls: ['./real-time-about.component.scss']
})
export class RealTimeAboutComponent implements OnInit {

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
}
