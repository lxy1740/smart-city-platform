
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceHistoryService } from '../../../../service/device-history.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {
  deviceId: string; // 设备id
  modelId: string; // 设备id
  deviceInfo: any = {}; // 设备信息
  CurrentPropertyList = []; // 数据列表
  functionList = []; // 服务列表
  page = 1; // 分页
  pageSize = 10; // 分页
  total = 0; // 分页
  page1 = 1; // 分页
  pageSize1 = 10; // 分页
  total1 = 0; // 分页
  navs = [ // 菜单
    {
      id: 0,
      name: '设备属性'
    },
    {
      id: 1,
      name: '服务调用'
    }
  ];
  nav_index = 0; // 默认菜单

  constructor(public router: Router,
    private deviceHistoryService: DeviceHistoryService,
    private routerinfo: ActivatedRoute
  ) { }

  ngOnInit() {
    this.deviceId = this.routerinfo.snapshot.params.deviceId;
    this.modelId = this.routerinfo.snapshot.params.modelId;
    this.getDevice();
    this.getCurrentProperty();
    this.getDeviceService();

  }

  // 切换菜单
  changeNav(i) {
    this.nav_index = i;
  }

  // 刷新数据
  getDataNew() {
    this.getDevice();
    this.getCurrentProperty();
  }
  // 返回
  jumpHandle(url) {
    this.router.navigate([url]);
  }

  // 属性页面
  goToZheRoute(para, dataKey) {
    this.router.navigate([para, { deviceId: this.deviceId, dataKey: dataKey }]);
  }


  // 获取设备信息
  getDevice() {
    const that = this;
    this.deviceHistoryService.getDevice(this.deviceId)
      .subscribe({
        next: function (val) {
          that.deviceInfo = val;
        }
      });

  }


  // 获取某个设备的所有服务调用
  getDeviceService() {
    const that = this;
    const modelId = this.modelId;
    this.deviceHistoryService.getDeviceService(modelId)
      .subscribe({
        next: function (val) {
          that.deviceInfo = val;
        }
      });

  }

  // 获取实时数据
  getCurrentProperty() {
    const that = this;
    this.deviceHistoryService.getCurrentProperty(this.deviceId, this.page, this.pageSize)
      .subscribe({
        next: function (val) {
          that.CurrentPropertyList = val.items;
          that.total = val.total;
        }
      });

  }


  pageChange() {
    this.getCurrentProperty();
  }

  pageChange1() {
    this.getCurrentProperty();
  }
}
