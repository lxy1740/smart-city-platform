import { Input, Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { RightService } from '../../../service/right.service';

declare var $: any;
@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {

  zTreeObj: any;
  zTreeObj1: any; // 树
  setting = {
    data: {
      simpleData: {
        enable: true
      }
    },
    view: {
      showLine: false,
      showIcon: false
    }
  }; // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
  zNodes = [
    {id: ' SC-000 ', pId: 0, name: '--- 智慧城市', open: true, children: [
      {id: ' SC-001 ', pId: 1, name: '+ 灾害报警'},
      {id: ' SC-002 ', pId: 1, name: '+ 水质监测'},
      {id: ' SC-003 ', pId: 1, name: '+ 电气安全'},
      {id: ' SC-004 ', pId: 1, name: '+ 空气质量'},
      {id: ' SC-005 ', pId: 1, name: '+ 智慧照明'},
      {id: ' SC-006 ', pId: 1, name: '+ 窨井管理'},
      {id: ' SC-007 ', pId: 1, name: '+ 智慧交通'},
      {id: ' SC-008 ', pId: 1, name: '+ LED控制'}
    ]},
    {id: ' MN-000 ', pId: 0, name: '--- 设备监控', open: true},
    {id: ' DN-000 ', pId: 0, name: '--- 设备管理', open: true, children: [
      {id: ' DN-001 ', pId: 1, name: '+ 设备'},
      {id: ' DN-002 ', pId: 1, name: '+ 产品'},
      {id: ' DN-003 ', pId: 1, name: '+ 位置'}
    ]},
    {id: ' MM-000 ', pId: 0, name: '--- 系统管理', open: true, children: [
      {id: ' MM-001 ', pId: 1, name: '+ 用户管理'},
      {id: ' MM-002 ', pId: 1, name: '+ 角色管理'}
    ]},
    ];
  // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）


  role: any = {}; // 存储数据
  public mr: NgbModalRef; // 当前弹框
  modelData = {
    title: '删除',
    body: 'hh',
  };
  // 弹框
  closeResult: string;
  roleList = []; // 角色表
  deskList = []; // 自定义菜单内容
  queryStr = ''; // 检索字符串
  page: any;
  pageSize = 10;
  total: any;
  AddorUpdate: any; // 新增/修改标识

  currentTreeNodeId: any; // 当前选中的区域
  public zTreeOnClick: (event, treeId, treeNode) => void;
  public zTreeOnCheck: (event, treeId, treeNode) => void;

  @Input()
  public alerts: Array<IAlert> = [];
  public alertsModal: Array<IAlert> = [];

  constructor(private modalService: NgbModal, private rightService: RightService) {

    this.page = 1;

  }

  ngOnInit() {
    console.log('打印jquery对象');
    console.log($);
    console.log('打印输出zTree对象');
    // this.zTreeObj = $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
    // console.log('zNodes', this.zNodes);
    this.deskList = this.zNodes;
    console.log('deskList', this.deskList);
    this.getRoleList();
  }
  // 获取所有角色
  getRoleList() {
    const that = this;
    this.rightService.getAllRole(this.queryStr, this.page, this.pageSize).subscribe({
      next: function(val) {
        that.roleList = val.items;
        // console.log(that.roleList);
        that.total = val.total;
      },
      complete: function() {},
      error: function(error) {
        console.log(error);
      }
    });
  }
  // 打开新增角色 框
  openAddRole(content) {
    const that = this;
    this.AddorUpdate = '新增角色';
    this.role.name = '';

    this.role.deskListChecked = []; // 新建用户时各角色的选中状态（check）
    this.role.deskListIds = [];
    // 此处添加树
    this.deskList.map((item, i) => {
      that.role.deskListChecked.push({check: false}); // 对应树结构
    });

    const modal = this.modalService.open(content, { windowClass: 'md' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
    // 树状图
    this.setZtreeNode([]);
  }

  // 新增角色
  addRole() {
    const that = this;
    this.rightService.addNewRole(this.role.name).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '新增成功！',
        });
        that.mr.close();
      },
      complete: function () {
        that.getRoleList();
      },
      error: function (error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alertsModal.push({
          id: 1,
          type: 'danger',
          message: `新增失败：${message}！`,
        });
      }
    });
  }
  // 打开修改角色 框
  openUpdateRole(content, item) {
    const that = this;
    this.AddorUpdate = '修改角色';
    this.role.curRole = item;
    this.role.name = item.name;

    this.role.roleListCheck = []; // 新建及修改用户时各角色的选中状态（check）
    this.role.roleIds = [];
    const roleRoles = item.roles ? item.roles : []; // 为空时避免因undefined报错
    this.deskList.map((item1, i) => { // 根据当前用户角色数组，设置修改框中对应的check值
      let sign = true; // 标记是否已checked
      for (let index = 0; index < roleRoles.length; index++) {
        if (roleRoles[index] === item1.name) {
          sign = false;
          that.role.roleListCheck.push({check: true}); // 一一对应角色表roleList1
          break;
        }
      }
      if (sign) {
        that.role.roleListCheck.push({check: false});
      }
    });

    const modal = this.modalService.open(content, { windowClass: 'md' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
    this.setZtreeNode([]);
  }
  // 修改角色
  updateRole() {
    const that = this;
    this.rightService.updateRole(this.role.curRole.id, this.role.name).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '修改成功！',
        });
        that.mr.close();
      },
      complete: function () {
        that.getRoleList();
      },
      error: function (error) {
        console.log(error);
        const message = error.errovr.errors[0].defaultMessage;
        that.alertsModal.push({
          id: 1,
          type: 'danger',
          message: `修改失败：${message}！`,
        });
      }
    });

  }
  // 新增/修改角色 - 模态框 确认点击事件
  addorUpdt() {
    const that = this;
    if (this.AddorUpdate === '新增角色') {
      that.addRole();
    } else {
      that.updateRole();
    }
  }
  // 删除 弹框
  openDelRole(content, item) {
    const that = this;
    this.role.itemDelId = item.id;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
  }

  // 删除设备规则
  closeUser($event) {
    // console.log($event);
    if ($event === 'ok') {
      this.delRole();
    }
    this.mr.close();
  }
  // 删除设备-接口处
  delRole() {
    const that = this;
    const id = this.role.itemDelId;
    let flag = false;
    const pages = (this.total + this.pageSize - 1) / this.pageSize;
    if (this.page >= pages && this.roleList.length === 1) {
      flag = true;
    }
    this.rightService.deleteRole(id).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '删除成功！',
        });
      },
      complete: function () {
        if (flag) {
          that.page  = that.page - 1;
          that.getRoleList();
        } else {
          that.getRoleList();
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  // 分页
  pageChange() {
    this.getRoleList();
  }
  // 检索用户的账户名或姓名
  execQuery() {
    this.getRoleList();
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

  // 为新建用户选定角色，多选按键点击事件
  addRoleToUser() {
    const that = this;
    this.role.deskListIds = [];
    this.role.roleListCheck.map((item, i) => {
      if (item.check === true) {
        const item1 = that.deskList[i].id;
        if (item1) {
          that.role.roleIds.push(item1);
        }
      }
    });
    console.log(this.role.roleIds);
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  public closeAlertModal(alert: IAlert) {
    const index: number = this.alertsModal.indexOf(alert);
    this.alertsModal.splice(index, 1);
  }

  // 搜索Enter事件
  onKeydown(event: any) {
    if (event.keyCode === 13) {
      this.execQuery();
    }
  }

  setZtreeNode(userRoles) { // 修改：传入当前用户角色名数组；新建：传入空数组
    const that = this;
    const setting = {// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
      view: {
        selectedMulti: true,
        dblClickExpand: false,
        showLine: true,
      },
      check: {
        enable: true,
        chkStyle: 'checkbox',
        chkboxType: { 'Y': 'ps', 'N': 'ps' }
      },
      callback: {
        onClick: this.zTreeOnClick, // 点击事件
        onCheck: this.zTreeOnCheck // 勾选事件
      }
    };
    const zNodes = this.deskList;
    this.zTreeObj1 = $.fn.zTree.init($('#treeDemo'), setting, zNodes);

    const treeObj = $.fn.zTree.getZTreeObj('treeDemo');
    userRoles.map((item, i) => {
      const node = treeObj.getNodeByParam('name', item, null);
      if (node) {
        treeObj.checkNode(node, true, true);
        that.role.deskListIds[i] = that.deskList.find(t => t.name === item).id;
      }
    });
    console.log(that.role.roleIds);

  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
