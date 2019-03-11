import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute} from '@angular/router';
import { TYPEDATA, TYPEDATA1} from '../../../../data/type-data';
import { UNITDATA} from '../../../../data/unit-data';
import { FunctionDefinitionService} from '../../../../service/function-definition';


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
  TYPEDATA2 = TYPEDATA1; // 数据类型
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
  AddParamModel: any = {}; // 新增参数窗口数据
  AddParam = []; // 新增参数窗口
  messageIssue: any = {};
  addorupdate = '添加数据定义';
  delDataItemId: any;

  @Input()
  public alerts: Array<IAlert> = []; // 信息弹框
  public alertsModal: Array<IAlert> = []; // 信息弹框
  private backup: Array<IAlert>;  // 信息弹框
  constructor(
    private modalService: NgbModal,
    public router: Router,
    private routerinfo: ActivatedRoute,
    private functionDefinitionService: FunctionDefinitionService,
  ) {

    // 1 数据定义弹框
    this.dataModel.readOnly = false; // 读写
    this.dataModel.dataType = this.TYPEDATA1[0]; // 数据类型

    this.dataModel.unit = this.UNITDATA1[0]; // int参数


    // this.dataModel.ARRAY = { // ARRAY参数
    //   value: 0
    // };


    // this.dataModel.ENUM = []; // 枚举参数
    // this.dataModel.ENUM.push({ // 枚举参数
    //   value: '',
    //   describe: ''
    // });

    this.dataModel.BOOL = {
      no: '',
      yes: ''
    }; // BOOL参数

    this.dataModel.dataLength = 1024; // TEXT参数

    this.dataModel.STRUCT = []; // STRUCT参数


    // 2、添加参数弹框

    this.AddParamModel.type = this.TYPEDATA2[0]; // 新增参数窗口数据类型
    this.AddParamModel.unit = this.UNITDATA1[0]; // 单位{  // int参数


    // this.AddParamModel.ARRAY = { // ARRAY参数
    //   value: 0
    // };

    // this.AddParamModel.ENUM = []; // 枚举参数
    // this.AddParamModel.ENUM.push({ // 枚举参数
    //   value: '',
    //   describe: ''
    // });

    this.AddParamModel.BOOL = {  // BOOL参数
      no: '',
      yes: ''
    };

    this.AddParamModel.dataLength = 1024; // TEXT参数


   // 3.服务定义弹框
    this.functionModel.synchronism = '异步'; // 异步同步 调用方式



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
    this.getProperty();
    this.getService();
  }

  // 获取数据定义
  getProperty() {
    const that = this;
    const id = this.deviceParams.id;
    this.functionDefinitionService.getProperty(id).subscribe({
      next: function(val) {
        console.log(val);
        that.dataListItems = val;
      },
      error: function (error) {
        console.log(error);
        // const message = error.error.errors[0].defaultMessage;
        that.messageIssue = error.error.errors[0];
        // that.alerts.push({
        //   id: 1,
        //   type: 'danger',
        //   message: `${message}！`,
        // });
      }
    });
  }

    // 删除数据定义
    delProperty() {
      const that = this;
      const id = this.delDataItemId;
      this.functionDefinitionService.delProperty(id).subscribe({
        next: function(val) {
          that.alerts.push({
            id: 1,
            type: 'success',
            message: `删除成功！`,
          });
        },
        complete: function() {
          that.getProperty();
        },
        error: function (error) {
          console.log(error);
          const message = error.error.errors[0].defaultMessage;
          that.alerts.push({
            id: 1,
            type: 'danger',
            message: `删除失败：${message}！`,
          });
        }
      });
    }

  // 获取服务定义
  getService() {
    const that = this;
    const id = this.deviceParams.id;
    this.functionDefinitionService.getService(id).subscribe({
      next: function (val) {
        console.log(val);
        that.functionListItems = val;
      },
      complete: function() {
      },
      error: function (error) {
        console.log(error);
        // const message = error.error.errors[0].defaultMessage;
        that.messageIssue = error.error.errors[0];
        // that.alerts.push({
        //   id: 1,
        //   type: 'danger',
        //   message: `${message}！`,
        // });
      }
    });
  }

  //    // 添加数据定义
  addProperty() {
    const that = this;
    let body;
    switch (this.dataModel.dataType.Value) {
      case 'INT':
      case 'Float':
      case 'double':
      body = {
        // 'dataLength': this.dataModel.dataLength,
        'dataMax': this.dataModel.dataMax,
        'dataMin': this.dataModel.dataMin,
        'unit': this.dataModel.unit.Symbol,
        'dataType': this.dataModel.dataType.Value,
        // 'id': 0,
        'key': this.dataModel.key,
        'modelId': this.deviceParams.id,
        'name': this.dataModel.name,
        'readOnly': this.dataModel.readOnly,
        'resolution': this.dataModel.resolution,
        'describe': this.dataModel.describe,
      };
      break;
      case 'DATE':
      body = {
        // 'dataLength': this.dataModel.dataLength,
        // 'dataMax': this.dataModel.dataMax,
        // 'dataMin': this.dataModel.dataMin,
        // 'unit': this.dataModel.unit.Symbol,
        'dataType': this.dataModel.dataType.Value,
        // 'id': 0,
        'key': this.dataModel.key,
        'modelId': this.deviceParams.id,
        'name': this.dataModel.name,
        'readOnly': this.dataModel.readOnly,
        // 'resolution': this.dataModel.resolution,
        'describe': this.dataModel.describe,
      };
      break;
      case 'TEXT':
      body = {
        'dataLength': this.dataModel.dataLength,
        // 'dataMax': this.dataModel.dataMax,
        // 'dataMin': this.dataModel.dataMin,
        // 'unit': this.dataModel.unit.Symbol,
        'dataType': this.dataModel.dataType.Value,
        // 'id': 0,
        'key': this.dataModel.key,
        'modelId': this.deviceParams.id,
        'name': this.dataModel.name,
        'readOnly': this.dataModel.readOnly,
        // 'resolution': this.dataModel.resolution,
        'describe': this.dataModel.describe,
      };
       break;
      case 'BOOL':
      body = {
        // 'dataLength': this.dataModel.dataLength,
        // 'dataMax': this.dataModel.dataMax,
        // 'dataMin': this.dataModel.dataMin,
        // 'unit': this.dataModel.unit.Symbol,
        'dataType': this.dataModel.dataType.Value,
        // 'id': 0,
        'key': this.dataModel.key,
        'modelId': this.deviceParams.id,
        'name': this.dataModel.name,
        'readOnly': this.dataModel.readOnly,
        // 'resolution': this.dataModel.resolution,
        'describe': this.dataModel.describe,
      };
      break;
      default:
      break;
    }


    this.functionDefinitionService.addProperty(body).subscribe({
      next: function (val) {
        console.log(val);
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '添加成功！',
        });
        that.mr.close();
      },
      complete: function() {
        that.getProperty();
      },
      error: function (error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alerts.push({
          id: 1,
          type: 'danger',
          message: `${message}！`,
        });
      }
    });
  }

  //    // 修改数据定义
  updateProperty() {
    const that = this;
    let body;
    switch (this.dataModel.dataType.Value) {
      case 'INT':
      case 'Float':
      case 'double':
        body = {
          'dataMax': this.dataModel.dataMax,
          'dataMin': this.dataModel.dataMin,
          'unit': this.dataModel.unit.Symbol,
          'dataType': this.dataModel.dataType.Value,
          'id': this.dataModel.updateId,
          'key': this.dataModel.key,
          'modelId': this.deviceParams.id,
          'name': this.dataModel.name,
          'readOnly': this.dataModel.readOnly,
          'resolution': this.dataModel.resolution,
          'describe': this.dataModel.describe,
        };
        break;
      case 'DATE':
        body = {

          'dataType': this.dataModel.dataType.Value,
          'id': this.dataModel.updateId,
          'key': this.dataModel.key,
          'modelId': this.deviceParams.id,
          'name': this.dataModel.name,
          'readOnly': this.dataModel.readOnly,
          'describe': this.dataModel.describe,
        };
        break;
      case 'TEXT':
        body = {
          'dataLength': this.dataModel.dataLength,
          'dataType': this.dataModel.dataType.Value,
          'id': this.dataModel.updateId,
          'key': this.dataModel.key,
          'modelId': this.deviceParams.id,
          'name': this.dataModel.name,
          'readOnly': this.dataModel.readOnly,
          'describe': this.dataModel.describe,
        };
        break;
      case 'BOOL':
        body = {
          'dataType': this.dataModel.dataType.Value,
          'id': this.dataModel.updateId,
          'key': this.dataModel.key,
          'modelId': this.deviceParams.id,
          'name': this.dataModel.name,
          'readOnly': this.dataModel.readOnly,
          'describe': this.dataModel.describe,
        };
        break;
      default:
        break;
    }


    this.functionDefinitionService.updateProperty(body).subscribe({
      next: function (val) {
        console.log(val);
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '添加成功！',
        });
        that.mr.close();
      },
      complete: function () {
        that.getProperty();
      },
      error: function (error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alerts.push({
          id: 1,
          type: 'danger',
          message: `${message}！`,
        });
      }
    });
  }
  addService() {
    const that = this;
    const body = {
      'description': this.functionModel.description,
      'identifier': this.functionModel.identifier,
      'modelId': this.deviceParams.id,
      'name': this.functionModel.name,
      'param': [
        // {
        //   'dataKey': 'string',
        //   'dataLength': 0,
        //   'dataMax': 0,
        //   'dataMin': 0,
        //   'dataOrder': 0,
        //   'dataType': 'string',
        //   'dataUnit': 'string',
        //   'id': 0,
        //   'isOutput': 0,
        //   'modelServeId': 0,
        //   'name': 'string'
        // }
      ],
      'synchrony': this.functionModel.synchrony
    };
    this.functionDefinitionService.addService(body).subscribe({
      next: function (val) {
        console.log(val);
          that.alerts.push({
            id: 1,
            type: 'success',
            message: '添加成功！',
          });
          that.mr.close();
      },
      error: function (error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alerts.push({
          id: 1,
          type: 'danger',
          message: `${message}！`,
        });
      }
    });
  }
  // 添加枚举项
  addEnum() {
    this.dataModel.ENUM.push({
      Value: '',
      describe: ''
    });
  }

  addorupdateProperty() {
    if (this.addorupdate === '添加数据定义') {
      this.addProperty();
    } else {
      this.updateProperty();
    }
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
  goToZheRoute(para, ...item) {
    if (item) {
      this.router.navigate([para, { param: item }]);
    } else {
      this.router.navigate([para]);
    }

  }
  findTYPEDATA(Value) {
    if (!Value) {
      return this.TYPEDATA1[0];
    }
    return this.TYPEDATA1.find((n) => n.Value === Value);
  }

  findTUNITDATA(Value) {
    if (!Value) {
      return this.UNITDATA1[0];
    }
    return this.UNITDATA1.find((n) => n.Symbol === Value);
  }

    // 修改数据定义弹框
  openUpdataModal(content, item) {
    this.addorupdate = '修改数据定义';
    this.dataModel.name = item.name;
    this.dataModel.updateId = item.id;

    this.dataModel.key = item.key;
    this.dataModel.dataMin = item.dataMin;
    this.dataModel.dataMax = item.dataMax;
    this.dataModel.resolution = item.resolution;
    this.dataModel.readOnly = item.readOnly;
    this.dataModel.describe = item.describe;

    this.dataModel.dataType = this.findTYPEDATA(item.dataType);
    this.dataModel.unit = this.findTUNITDATA(item.unit);

    const modal = this.modalService.open(content, { windowClass: 'myCustomModalClass' });
    this.mr = modal;

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  // 删除设备型号弹框
  openDelModal(content, item) {
    this.delDataItemId = item.id;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;

  }

  // 新建数据定义弹框
  openNewModal(content) {
    this.addorupdate = '添加数据定义';
    this.dataModel.name = '';
    this.dataModel.key = '';
    this.dataModel.dataMin = null;
    this.dataModel.dataMax = null;
    this.dataModel.resolution = null;
    this.dataModel.readOnly = false;
    this.dataModel.describe = '';

    this.dataModel.dataType = this.TYPEDATA1[0];
    this.dataModel.unit = this.UNITDATA1[0];

    const modal = this.modalService.open(content, { windowClass: 'myCustomModalClass' });
    this.mr = modal;

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  // 添加参数弹框
  openParameterModal(content) {

    const modal = this.modalService.open(content );
    this.mr = modal;

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  //  // 新建数据定义 -ok
  // addData() {
  //   console.log(this.dataModel);


  // }
  //  // 新建数据定义 -ok
  addFuntion() {
    console.log(this.functionModel);
    this.mr.close();
  }



  // 删除设备型号
  closeModal($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delProperty();
    }
    this.mr.close();
  }



  // 分页
  pageChange() {}



}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}

