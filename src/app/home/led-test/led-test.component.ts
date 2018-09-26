import { Component, OnInit } from '@angular/core';
import { LedService } from '../../service/led.service';


@Component({
  selector: 'app-led-test',
  templateUrl: './led-test.component.html',
  styleUrls: ['./led-test.component.scss']
})
export class LedTestComponent implements OnInit {
  model: any = {}; // 存储数据

  constructor(private ledService: LedService) { }

  ngOnInit() {
    this.getUser();
  }


  getUser() {
    const that = this;

    this.ledService.getUsers().subscribe({
      next: function (val) {

        that.model.user = val;
        console.log(val);
      },
      complete: function () {


      },
      error: function (error) {
        console.log(error);
      }
    });
  }

}
