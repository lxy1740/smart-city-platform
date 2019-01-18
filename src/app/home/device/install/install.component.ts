import { Input, Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InstallZoneService } from '../../../service/install-zone.service';
import { GEOREGION } from '../../../data/Geo-region';
declare var $: any;

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.scss']
})
export class InstallComponent implements OnInit {

  // 行政区树
  zTreeObj: any;
  zNodes = GEOREGION;
  install: any = {}; // 存储数据
  // 弹框
  closeResult: string;
  // 新增/修改标识
  AddorUpdate: any;

  public mr: NgbModalRef; // 当前弹框
  InstallData = {
    title: '删除',
    body: 'hh',
  };
  // 关于树
  public zTreeOnClick: (event, treeId, treeNode) => void;
  public zTreeOnCheck: (event, treeId, treeNode) => void; // 触发勾选树的事件

  // 安装区域列表
  installList = [];

  queryStr = ''; // 检索字符串
  page: any;
  pageSize = 10;
  total: any;
  @Input()
  public alerts: Array<IAlert> = [];
  public alertsModal: Array<IAlert> = [];

  constructor(private modalService: NgbModal, private installzoneService: InstallZoneService) {
    // 树的操作
    // 点击
    const that = this;
    this.zTreeOnCheck = (event, treeId, treeNode) => { // 勾选
      this.install.geoRegion = {}; // 重新赋值前先清空
      // 获取树的节点
      const treeObj = $.fn.zTree.getZTreeObj('treeDemo');
      const nodes = treeObj.getCheckedNodes(true);
     // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值
      nodes.map((item, i) => {
      that.install.geoRegion[item.id] = item.name;

      });
    };
  }

  ngOnInit() {
    this.getInstallzone(); // 获取安装区域列表
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // 打开新增窗口
  openNewInstallZone(content) {
    const that = this;
    this.AddorUpdate = '新增安装区域';

    this.install.geoRegionChecked = []; // 新建用户时各角色的选中状态（check）
    this.install.geoRegion = {};
    // 此处添加树
    this.zNodes.map((item, i) => {
      that.install.geoRegionChecked.push({check: true}); // 对应树结构
    });

    // 关于弹框
    const modal = this.modalService.open(content, { windowClass: 'md' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    // 树状图
    this.setZtreeNode([]);
  }

  setZtreeNode(georegion) { // 修改：传入当前用户角色名数组；新建：传入空数组
    const that = this;
    // 树结构，树设置
    this.getZoneTree();
    // treeDemo界面中加载ztree的div
    const treeObj = $.fn.zTree.getZTreeObj('treeDemo');
    if ( !georegion) {
      return;
    }
    georegion.map((item, i) => {
      const node = treeObj.getNodeByParam('id', item, null); // 传入id
      if (node) {
        treeObj.checkNode(node, true, false ); // 此处是用户勾选
        // this.findParent(node.getParentNode());
      }
    });
  }
  getZoneTree() {
    const that = this;
    const setting = {// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
      view: {
        selectedMulti: true,
        dblClickExpand: false,
        showLine: true,
      },
      check: {
        enable: true,
        chkStyle: 'radio',
        radioType: 'all', // 对所有树实现单选
        chkboxType: { 'Y': 'ps', 'N': 'ps' }
      },
      callback: {
        onClick: this.zTreeOnClick, // 点击事件
        onCheck: this.zTreeOnCheck // 勾选事件
      }
    };

    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, this.zNodes);
  }

  // 搜索-
  execQuery() {

  }

  // 打开 修改 弹框
  openUpdataInstall(contentUpdate, item) {
    const that = this;
    this.AddorUpdate = '修改角色';
    // 所修改的区域
    this.install.culInstall = item;
    console.log(item);
    // this.install.name = item.name;
    // this.install.region_id = item.region_id;
    this.install.geoRegionChecked = []; // 新建及修改用户时各角色的选中状态（check）
    const modal = this.modalService.open(contentUpdate, { windowClass: 'md' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.setZtreeNode([]);
  }



  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  public closeAlertModal(alert: IAlert) {
    const index: number = this.alertsModal.indexOf(alert);
    this.alertsModal.splice(index, 1);
  }

  // 获取安装区域列表 --ok
  getInstallzone() {
    const that = this;

    this.installzoneService.getZone().subscribe({
      next: function (val) {
        console.log('安装区域列表');
        console.log(val);
        that.installList = val;
      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 新增/修改角色 - 模态框 确认点击事件
  addorUpdt() {
    const that = this;
    if (this.AddorUpdate === '新增安装区域') {
      // that.addInstall();
      console.log('新增');
    } else  {
      // that.updateInstall();
      console.log('修改');
    }
  }

  // 删除安装区域 弹框
  openDelInstall(content, item) {
    const that = this;
    that.install.itemDelId = item.id;
    const modal = that.modalService.open(content, { size: 'sm' });
    that.mr = modal;
  }
  // 删除规则
  closeInstall($event) {
    if ($event === 'ok') {
      this.delInstall();
    }
    this.mr.close();
  }
  // 删除接口处
  delInstall() {
    const that = this;
    const id = this.install.itemDelId;
    console.log(id);
    // let flag = false;
    // const pages = (this.total + this.pageSize - 1) / this.pageSize;
    // if (this.page >= pages && this.installList.length === 1) {
    //   flag = true;
    // }
    this.installzoneService.deleteInstall(id).subscribe({
      next: function (val) {
        console.log(val);
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '删除成功！',
        });
      },
      complete: function () {
        // if (flag) {
        //   that.page  = that.page - 1;
        //   that.getInstallzone();
        // } else {
        //   that.getInstallzone();
        // }
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
