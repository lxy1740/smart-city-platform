import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute} from '@angular/router';
import { TYPEDATA} from '../../../../data/type-data';
import { UNITDATA} from '../../../../data/unit-data';

@Component({
  selector: 'app-function-definition',
  templateUrl: './function-definition.component.html',
  styleUrls: ['./function-definition.component.scss']
})
export class FunctionDefinitionComponent implements OnInit {
  public mr: NgbModalRef; // 当前弹框
  closeResult: string;
  dataModel: any = {};
  functionModel: any = {};
  deviceParams: any = {};
  TYPEDATA1 = TYPEDATA;
  UNITDATA1 = UNITDATA;
  dataListItems = [];
  functionListItems = [];
  total = 1;
  page = 1;
  modelData = {
    title: '删除',
  };

  navs = [
    {
      id: 0,
      name: '数据定义'
    },
    {
      id: 1,
      name: '服务定义'
    }
  ];
  nav_index = 0; // 菜单索引
  @Input()
  public alerts: Array<IAlert> = [];
  public alertsModal: Array<IAlert> = [];

  private backup: Array<IAlert>;
  constructor(private modalService: NgbModal,
    public router: Router,
    private routerinfo: ActivatedRoute
  ) {
    this.dataModel.read = 0;
    this.dataModel.type = this.TYPEDATA1[0];
    this.dataModel.unit = this.UNITDATA1[0];
    this.functionModel.synchronism = '异步';
    this.dataListItems.push({
      describe: 'tyty',
      identifier: 'LightError',
      name: '路灯故障',
      read: 0,
      stepSize: '1',
      min: 0,
      max: 10,
      type: { Name: 'float (单精度浮点型)', Value: 'FLOAT' },
      unit: { Symbol: 'GB', Name: '吉字节' }
    });
  this.functionListItems.push({
    describe: 'ggg',
    identifier: 'AdjustLightLevel',
    name: '调光',
    synchronism: '异步',
  });
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  public closeAlertModal(alert: IAlert) {
    const index: number = this.alertsModal.indexOf(alert);
    this.alertsModal.splice(index, 1);
  }

  public reset() {
    this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
  }

  ngOnInit() {
    this.deviceParams = JSON.parse(this.routerinfo.snapshot.params.param);
    console.log(this.deviceParams);
  }
  changeNav(i) {
    this.nav_index = i;
  }
  // 属性页面
  goToZheRoute(para, item) {
    if (item) {
      this.router.navigate([para, { param: item }]);
    } else {
      this.router.navigate([para]);
    }

  }

  openUpdataModal() {

  }

  // 删除设备型号弹框
  openDelModal(content, item) {
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;

  }

  // 新建数据定义
  openNewModal(content) {

    const modal = this.modalService.open(content, { windowClass: 'myCustomModalClass' });
    this.mr = modal;

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  // 新建数据定义
  openParameterModal(content) {

    const modal = this.modalService.open(content, { windowClass: 'md-modal' } );
    this.mr = modal;

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  //  // 新建数据定义 -ok
  addData() {
    console.log(this.dataModel);
    this.mr.close();
  }
  //  // 新建数据定义 -ok
  addFuntion() {
    console.log(this.functionModel);
    this.mr.close();
  }



  // 删除设备型号
  closeModal($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delModal();
    }
    this.mr.close();
  }

  // 删除设备型号-接口处
  delModal() {}

  pageChange() {}



}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}

