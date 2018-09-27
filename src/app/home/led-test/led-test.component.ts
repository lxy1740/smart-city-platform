import { Component, OnInit } from '@angular/core';
import { LedService } from '../../service/led.service';
import { AirmonitorService } from '../../service/airmonitor.service';


@Component({
  selector: 'app-led-test',
  templateUrl: './led-test.component.html',
  styleUrls: ['./led-test.component.scss']
})
export class LedTestComponent implements OnInit {
  model: any = {}; // 存储数据
  searchTaskBody: any = {}; // 存储数据
  searchTaskBody1: any = {}; // 存储数据
  searchTaskBody2: any = {}; // 存储数据
  user: any = {}; // 用户列表
  task: any = {}; // 任务列表
  task1: any = {}; // 开关屏
  task2: any = {}; // 设置亮度
  plays: any = {}; // 设置播放内容
  airs: any = {}; // 设置空气质量播放内容
  users = []; // 用户列表
  tasks = []; // 任务列表
  medias = []; // 媒体列表
  search_tasks = []; // led任务列表
  search_tasks_check = [];

  total: number; // 分页
  total_1: number; // 分页
  total_2: number; // 分页
  total_3: number; // 分页
  page: number;
  page_1: number;
  page_2: number;
  page_3: number;
  pagesize = 10;

  contrL1 = false; // 临时控制
  contrL2 = false; // 临时控制
  playTypes = [
    {
      type: 'text'
    },
    {
      type: 'image'
    },
    {
      type: 'git'
    },
    {
      type: 'video'
    },
    {
      type: 'slide_text'
    },
    {
      type: 'metrics_text'
    }
  ];
  currentType: any;

  constructor(private ledService: LedService, private airmonitorService: AirmonitorService) {
    this.page = 1;
    this.page_1 = 1;
    this.page_2 = 1;
    this.page_3 = 1;
    this.task2.value = 0;
    this.searchTaskBody.id = 1;
    this.searchTaskBody.task = [];
    this.currentType = this.playTypes[0];
   }

  ngOnInit() {
    // this.getUsers();
    this.getTasks();
    this.getMedias();
    this.searchAllTask();
    this.getAirdevices();
  }

  // 获取空气质量点
  getAirdevices() {
    const that = this;
    const NorthEast = {
      'lng': 113.998944,
      'lat': 22.590191
    }; // 返回矩形区域的东北角
    const SouthWest = {
      'lng': 113.902502,
      'lat': 22.527578
    }; // 返回矩形区域的西南角


    this.airmonitorService.getAirDevice(NorthEast, SouthWest).subscribe({
      next: function (val) {

        that.model.airdevicelist = val; // 变为新值
      },
      complete: function () {

      },
      error: function (error) {

      }
    });
  }

  playTypeChange() {}

  createMedia() {
    const that = this;
    const body = {
      name: this.plays.name,
      type: this.currentType.type,
      contents: this.plays.contents,
      length: this.plays.length,
    };

    this.ledService.createMedia(body).subscribe({
      next: function (val) {
        console.log(val);
      },
      complete: function () {

        that.getMedias();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  getMedias() {
    const that = this;
    const page = this.page_3;
    const pagesize = this.pagesize;

    this.ledService.getMedias(page, pagesize).subscribe({
      next: function (val) {

        that.medias = val.data;
        that.total_3 = val.total;
        console.log(val);
      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
      }
    });
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

  addTaskCtrl() {
    this.searchTaskBody.task = [];
    for (let index = 0; index < this.search_tasks_check.length; index++) {
      const element = this.search_tasks_check[index];
      if (element.check) {
        this.searchTaskBody.task.push(this.search_tasks[index]);
      }
    }


    console.log(this.searchTaskBody.task);
  }

  searchTask(type) {
    const that = this;
    let body;
    if (type === 1) { // 常规请求
      body = {
        'version': '1.0',
        'system_info': {
          id: this.searchTaskBody.id,
          width: 192,
          height: 32,
        }
      };
    } else if (type === 2) { // 终端任务执行中请求：
      const task = [];
      this.searchTaskBody.task.map((item, i) => {
        task.push({
          'id': item._id,
          'status': 'PROCESSING',
          'datagram': item.datagram
        });

      });
      body = {
        'version': '1.0',
        'system_info': {
          id: this.searchTaskBody.id,
          width: 192,
          height: 32,
        },
        'task': task
      };
    } else if (type === 3) { //  终端任务执行成功请求：
      const task = [];
      this.searchTaskBody.task.map((item, i) => {
        task.push({
          'id': item._id,
          'status': 'SUCCESS',
          'datagram': item.datagram
        });

      });
      body = {
        'version': '1.0',
        'system_info': {
          id: this.searchTaskBody.id,
          width: 192,
          height: 32,
        },
        'task': task
      };
    }


    this.ledService.searchTask(body).subscribe({
      next: function (val) {
        console.log(val);

      },
      complete: function () {
        that.getTasks();
        that.searchAllTask();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  searchAllTask() {
    const that = this;
    const id = this.searchTaskBody.id;
    const pageSize = this.pagesize;
    const currentPage = this.page_2;
    this.ledService.searchAllTask(id, currentPage, pageSize).subscribe({
      next: function (val) {
        console.log(val);
        that.search_tasks = val.data;
        that.total_2 = val.total;
        for (let index = 0; index < that.search_tasks.length; index++) {
          that.search_tasks_check.push({ check: false });
        }
      },
      complete: function () {
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

  pageChange_2() {
    this.searchAllTask();
  }

  pageChange_3() {
    this.getMedias();
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

    if (value > 66) {
      return Math.round(value / 66) + '%';
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
