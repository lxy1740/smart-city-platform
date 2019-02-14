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
  dataModel: any = {}; // 数据定义数据
  functionModel: any = {}; // 服务定义数据
  deviceParams: any = {}; // 设备信息
  TYPEDATA1 = TYPEDATA; // 数据类型
  UNITDATA1 = UNITDATA; // 单位
  dataListItems = []; // 数据定义数据列表
  functionListItems = []; // 服务定义数据列表
  total = 1; // 分页
  page = 1; // 分页
  modelData = { // 删除弹框
    title: '删除',
  };

  navs = [ // 菜单
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
  public alerts: Array<IAlert> = []; // 信息弹框
  public alertsModal: Array<IAlert> = []; // 信息弹框
  private backup: Array<IAlert>;  // 信息弹框
  constructor(private modalService: NgbModal,
    public router: Router,
    private routerinfo: ActivatedRoute
  ) {
    this.dataModel.read = 0; // 读写
    this.dataModel.type = this.TYPEDATA1[0]; // 数据类型
    this.dataModel.intParams = {  // int参数
      unit: this.UNITDATA1[0], // 单位
    };

    this.dataModel.ARRAY = {
      value: 0
    }; // ARRAY参数
    this.dataModel.STRUCT = []; // STRUCT参数
    this.dataModel.STRUCT.push({
      identifier: 'LightError',
      name: '路灯故障',
      type: { Name: 'float (单精度浮点型)', Value: 'FLOAT' },
      intParams: {
        unit: { Symbol: 'GB', Name: '吉字节' },
        stepSize: '1',
        min: 0,
        max: 10,
      },
      enumParams: [],
      STRUCT: [],
      BOOL: {},
      TEXT: {},
    });
    this.dataModel.STRUCT.push({
      identifier: 'LightError',
      name: '路灯故障',
      type: { Name: 'float (单精度浮点型)', Value: 'FLOAT' },
      intParams: {
        unit: { Symbol: 'GB', Name: '吉字节' },
        stepSize: '1',
        min: 0,
        max: 10,
      },
      enumParams: [],
      STRUCT: [],
      BOOL: {},
      TEXT: {},
    });
    this.dataModel.ENUM = []; // 枚举参数
    this.dataModel.ENUM.push({ // 枚举参数
      value: '',
      describe: ''
    });

    this.dataModel.BOOL = {
      no: '',
      yes: ''
    }; // BOOL参数

    this.dataModel.TEXT = {
      length: 1024
    }; // TEXT参数

    this.functionModel.synchronism = '异步'; // 异步同步 调用方式
    this.dataListItems.push({
      describe: '路灯故障',
      read: 0,
      identifier: 'LightError',
      name: '路灯故障',
      type: { Name: 'float (单精度浮点型)', Value: 'FLOAT' },
      intParams: {
        unit: { Symbol: 'GB', Name: '吉字节' },
        stepSize: '1',
        min: 0,
        max: 10,
      },
      enumParams: [],
      STRUCT: [],
      BOOL: {},
      TEXT: {},


    });
    this.dataListItems.push({
      describe: 'pig微笑',
      identifier: 'pig',
      name: 'pig微笑',
      read: 0,
      type: { 'Name': 'enum (枚举型)', 'Value': 'ENUM' },
      intParams: {
        // unit: { Symbol: 'GB', Name: '吉字节' },
        // stepSize: '1',
        // min: 0,
        // max: 10,
      },
      enumParams: [
        {value: '0', describe: '呵呵'},
        {value: '1', describe: '哈哈'},
      ],

    });
    this.functionListItems.push({
      describe: 'ggg',
      identifier: 'AdjustLightLevel',
      name: '调光',
      synchronism: '异步',
    });

  }

  public closeAlert(alert: IAlert) {  // 信息弹框
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  public closeAlertModal(alert: IAlert) {  // 信息弹框
    const index: number = this.alertsModal.indexOf(alert);
    this.alertsModal.splice(index, 1);
  }

  public reset() {  // 信息弹框
    this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
  }

  ngOnInit() {
    this.deviceParams = JSON.parse(this.routerinfo.snapshot.params.param);
    console.log(this.deviceParams);
  }
  // 添加枚举项
  addEnum() {
    this.dataModel.ENUM.push({
      Value: '',
      describe: ''
    });
  }

  // 删除枚举项
  delEnum() {
    if (this.dataModel.ENUM.length > 1) {
      this.dataModel.ENUM.pop();
    }
  }
  // 切换菜单
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

  // 分页
  pageChange() {}



}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}

