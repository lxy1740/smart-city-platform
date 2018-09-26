import { Component, OnInit } from '@angular/core';
import { LedService } from '../../service/led.service';


@Component({
  selector: 'app-led-test',
  templateUrl: './led-test.component.html',
  styleUrls: ['./led-test.component.scss']
})
export class LedTestComponent implements OnInit {
  model: any = {}; // 存储数据
  user: any = {}; // 存储数据
  task: any = {}; // 存储数据
  task1: any = {}; // 存储数据
  task2: any = {}; // 存储数据
  users = []; // 存储数据
  tasks = []; // 存储数据

  total: number; // 分页
  total_1: number; // 分页
  page: number;
  page_1: number;
  pagesize = 10;

  contrL1 = false; // 临时控制
  contrL2 = false; // 临时控制

  constructor(private ledService: LedService) {
    this.page = 1;
    this.page_1 = 1;
    this.task2.value = 0;
   }

  ngOnInit() {
    // this.getUsers();
    this.getTasks();
  }


  getUsers() {
    const that = this;
    const page = this.page;
    const pagesize = this.pagesize;

    this.ledService.getUsers(page, pagesize).subscribe({
      next: function (val) {

        that.users = val.data;
        that.total = val.total;
        console.log(val);
      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  createUser() {
    const that = this;
    const body = {
      name: this.user.name,                 // 用户账号
      password: '123456',                           // 密码
    };

    this.ledService.createUser(body).subscribe({
      next: function (val) {
        console.log(val);
      },
      complete: function () {

        that.getUsers();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  getTasks() {
    const that = this;
    const page = this.page_1;
    const pagesize = this.pagesize;

    this.ledService.getTasks(page, pagesize).subscribe({
      next: function (val) {

        that.tasks = val.data;
        that.total_1 = val.total;
        console.log(val);
      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  createTask1() {
    const that = this;
    const id = this.task1.id;
    const value = this.contrL1 ? 1 : 0;
    const body = {

      'id': id,
      'status': 'PENDING',
      'datagram': {
        'request': 'screen_switch',
        'arguments': [
          {
            'value': value
          }
        ]
      }

    };

    this.ledService.createTask(body).subscribe({
      next: function (val) {
        console.log(val);
      },
      complete: function () {

        that.getTasks();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  createTask2() {
    const that = this;
    const id = this.task2.id;
    const value = this.task2.value;
    const auto_value = this.contrL2 ? 1 : 0;
    const body = {

      'id': id,
      'status': 'PENDING',
      'datagram': {
        'request': 'set_brightness',
        'arguments': [
          {
            'auto_mode': auto_value,
            'value': value
          }
        ]
      }

    };

    this.ledService.createTask(body).subscribe({
      next: function (val) {
        console.log(val);
      },
      complete: function () {

        that.getTasks();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  pageChange() {
    this.getUsers();
  }

  pageChange_1() {
    this.getTasks();
  }

  changeContr1() {
    this.contrL1 = !this.contrL1;
  }

  changeContr2() {
    this.contrL2 = !this.contrL2;
  }
  // 路灯控制页亮度调节
  formatLabel(value: number | null) {
    // this.prompt = false;
    if (!value) {
      return 0;
    }

    if (value > 100) {
      return Math.round(value / 100) + '%';
    }


    return value + '%';
  }

  // 亮度改变
  changeSlider(arg) {
    console.log('亮度改变');
    console.log(arg);
    this.task2.value = arg;
  }


}
