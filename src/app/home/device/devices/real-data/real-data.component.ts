import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { DeviceHistoryService } from '../../../../service/device-history.service';


@Component({
  selector: 'app-real-data',
  templateUrl: './real-data.component.html',
  styleUrls: ['./real-data.component.scss']
})
export class RealDataComponent implements OnInit {
  deviceId: string; // 设备id
  deviceInfo: any = {}; // 设备信息
  CurrentPropertyList = []; // 数据列表
  page = 1; // 分页
  pageSize = 10; // 分页
  total = 0; // 分页

  constructor(public router: Router,
    private deviceHistoryService: DeviceHistoryService,
    private routerinfo: ActivatedRoute
    ) { }

  ngOnInit() {
    this.deviceId = this.routerinfo.snapshot.params.deviceId;
    this.getDevice();
    this.getCurrentProperty();

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
    this.router.navigate([para, { deviceId: this.deviceId, dataKey: dataKey}]);
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
}
