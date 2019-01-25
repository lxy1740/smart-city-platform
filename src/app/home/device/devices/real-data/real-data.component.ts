import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { DeviceHistoryService } from '../../../../service/device-history.service';


@Component({
  selector: 'app-real-data',
  templateUrl: './real-data.component.html',
  styleUrls: ['./real-data.component.scss']
})
export class RealDataComponent implements OnInit {
  params: any;
  CurrentPropertyList = [];

  constructor(public router: Router,
    private deviceHistoryService: DeviceHistoryService,
    private routerinfo: ActivatedRoute
    ) { }

  ngOnInit() {
    this.params = this.routerinfo.snapshot.params.deviceId;
    console.log(this.params);
    this.getCurrentProperty(this.params);
  }
  // 进入数据监控页面
  jumpHandle() {
    this.router.navigate([`home/device/devices/history-data`]);
  }

  // 获取实时数据
  getCurrentProperty(id) {
    const that = this;
    this.deviceHistoryService.getCurrentProperty(id)
    .subscribe({
      next: function (val) {
        that.CurrentPropertyList = val.items;
      }
    });

  }
}
