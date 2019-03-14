import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceHistoryService } from '../../../../service/device-history.service';
import { IAlert } from '../../customer/customer.component';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})

export class DeviceDetailComponent implements OnInit {
  mr: NgbModalRef;
  closeResult: string;
  deviceId: string; // 设备id
  modelId: string; // 设备id
  deviceName: string; // 设备id
  deviceInfo: any = {}; // 设备信息
  CurrentPropertyList = []; // 数据列表
  functionList = []; // 服务列表
  serviceList = []; // 服务调用列表
  page = 1; // 分页
  pageSize = 10; // 分页
  total = 0; // 分页
  page1 = 1; // 分页
  pageSize1 = 10; // 分页
  total1 = 0; // 分页
  identifier: string; //
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
  nav_index = 1; // 默认菜单

  public alertsModal: Array<IAlert> = [];
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;

  constructor(public router: Router,
    private modalService: NgbModal,
    private deviceHistoryService: DeviceHistoryService,
    private routerinfo: ActivatedRoute
  ) {}

   public closeAlert(alert: IAlert) {  // 信息弹框
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public closeAlertModal(alert: IAlert) {  // 信息弹框
    const index: number = this.alertsModal.indexOf(alert);
    this.alertsModal.splice(index, 1);
  }

  ngOnInit() {
    this.deviceId = this.routerinfo.snapshot.params.deviceId;
    this.modelId = this.routerinfo.snapshot.params.modelId;
    this.deviceName = this.routerinfo.snapshot.params.deviceName;
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
    this.deviceHistoryService.getDeviceService(this.modelId)
      .subscribe({
        next: function (val) {
          that.functionList = val;
        }
      });

  }

  // 获取服务调用所需的参数
  getServeParam(serviceId) {
    const that = this;
    this.deviceHistoryService.getServeParam(serviceId)
      .subscribe({
        next: function (val) {
          that.serviceList = val;
        }
      });

  }

  // 弹出服务调用框
  openServiceModel(serviceCall, service) {
    this.identifier = service.identifier;
    this.serviceList = [];
    if (service.param.length === 0) {
      this.addInvokeService();
      return;
    }
    this.getServeParam(service.id);
    const modal = this.mr = this.modalService.open(serviceCall, { windowClass: 'myCustomModalClass' });
    // const modal = this.modalService.open(serviceCall, { size: 'lg' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  // 添加服务调用
  addInvokeService() {
    const that = this;
    let body;
    const param = {};
    for (const item of this.serviceList) {
      if (item.value === undefined || item.value.trim() === '') { // 输入框无内容时，禁止提交
        that.alertsModal.push({
          id: 1,
          type: 'danger',
          message: `${item.dataKey}的值不能为空！`,
        });
        return;
      }
      param[item.dataKey] = item.value;
    }
    body = {
      'args': param,
      'deviceId': this.deviceId,
      'deviceName': this.deviceName,
      'identifier': this.identifier
    };
      this.deviceHistoryService.addInvokeService(body)
      .subscribe({
        next: function (val) {
          that.alerts.push({
            id: 1,
            type: 'success',
            message: '服务调用成功！',
          });
          if (that.serviceList.length !== 0) { // 有模态框弹出，才需要关闭
            that.mr.close();
          }
        },
        complete: function() {
          that.getDeviceService();
        },
        error: function(error) {
          console.log(error);
          const message = error.error.errors[0].defaultMessage;
          if (that.serviceList.length === 0) {
            that.alerts.push({
              id: 1,
              type: 'danger',
              message: `${message}！`,
            });
          } else {
            that.alertsModal.push({
              id: 1,
              type: 'danger',
              message: `${message}！`,
            });
          }

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
