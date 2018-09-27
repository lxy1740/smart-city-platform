import { Input, Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../../service/admin.service';

declare var $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  zTreeObj: any;

  setting = {}; // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）

      // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
  zNodes = [
    {
      name: '设备概览', open: true, children: [
        { name: 'test1_1' }, { name: 'test1_2' }]
    },
    {
      name: '设备监控', open: true, children: [
        { name: 'test2_1' }, { name: 'test2_2' }]
    },
    {
      name: '设备管理', open: true, children: [
        { name: '新增' }, { name: '添加' }, { name: '报销' }]
    },
    {
      name: '系统管理', open: true, children: [
        {
          name: '用户管理', children: [
            { name: '新增' }, { name: '添加' }, { name: '修改' }
          ]
        },
        {
          name: '权限管理', children: [
            { name: '新增' }, { name: '添加' }, { name: '修改' }
          ]
        }
      ]
    }
  ];

  public mr: NgbModalRef; // 当前弹框
  modelData = {
    title: '删除',
    body: 'hh',
  };

  user: any = {}; // 存储数据
  closeResult: string;
  userList = []; // 用户表
  roleList = []; // 角色表
  queryStr = ''; // 检索字符串
  page: any;
  pageSize = 10;
  total: number;

  curRole: any; // 当前角色
  addOrUpdate: any; // 新建或修改标识
  @Input()
  public alerts: Array<IAlert> = [];

  constructor(private modalService: NgbModal, private adminService: AdminService) {
    this.page = 1;
  }

  ngOnInit() {
    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
    this.getUserList();
    this.getRoleList();
  }
  // 获取用户列表
  getUserList() {
    const that = this;
    console.log('queryStr: ' + this.queryStr);
    this.adminService.getAllUser(this.queryStr, this.page, this.pageSize).subscribe({
      next: function(val) {
        that.userList = val.items;
        that.total = val.total;
      },
      complete: function() {},
      error: function(error) {
        console.log(error);
      }
    });
  }
  // 获取角色列表
  getRoleList() {
    const that = this;
    this.adminService.getAllRole().subscribe({
      next: function(val) {
        that.roleList = val;
        that.roleList.unshift({ id: 0, name: '不限' }); // 所有项
        that.curRole = that.roleList[0];
      },
      complete: function() {},
      error: function(error) {
        console.log(error);
      }
    });
  }
  // 分页
  pageChange() {
    this.getUserList();
  }
  // 按角色筛选
  roleChange() {
    // console.log(this.curRole);
  }
  // 检索用户的账户名或姓名
  execQuery() {
    this.getUserList();
  }
  // 新增用户 框
  open(content) {
    const that = this;
    this.addOrUpdate = '新建用户';
    this.user.userName = '';
    this.user.password = '';
    this.user.email = '';
    this.user.mobile = '';
    this.user.fullName = '';
    this.user.nickName = '';
    this.user.gender = '';
    this.user.avatar = '';

    this.modalService.open(content, { windowClass: 'md' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
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
  // 新增用户
  addUser() {
    const that = this;
    this.adminService.addNewUser(this.user.userName, this.user.password, this.user.gender, this.user.avatar,
      this.user.email, this.user.mobile, this.user.fullName, this.user.nickName, this.user.roleIds).subscribe({
      next: function(val) {
      },
      complete: function() {},
      error: function(error) {
        console.log(error);
      }
    });
  }
  // 修改用户信息 框
  openUpdateUser(content, item) {
    console.log(item);
    const that = this;
    this.addOrUpdate = '修改用户';
    this.user.userName = item.userName;
    this.user.password = item.password;
    this.user.email = item.email;
    this.user.mobile = item.mobile;
    this.user.fullName = item.fullName;
    this.user.nickName = item.nickName;
    this.user.gender = item.gender;
    this.user.avatar = item.avatarurl;
    this.modalService.open(content, { windowClass: 'md' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }
  updataUser() {

  }
  addorUpdate(addOrUpdate) {
    if (addOrUpdate === '新建设备') {
      this.addUser();
    } else {
      // this.user.modelId = this.user.model.id; // 关闭模态框时同步modelId以便更新。device.model为双向绑定的设备类型
      this.updataUser();
    }
  }
  // 删除设备弹框
  openDelUser(content, item) {
    const that = this;
    this.user.itemDelId = item.id;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
  }

  // 删除设备规则
  closeUser($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delUser();
    }
    this.mr.close();
  }
  // 删除设备-接口处
  delUser() {
    const that = this;
    const id = this.user.itemDelId;
    let flag = false;
    const pages = (this.total + this.pageSize - 1) / this.pageSize;
    if (this.page >= pages && this.userList.length === 1) {
      flag = true;
    }
    this.adminService.deleteUser(id).subscribe({
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
          that.getUserList();
        } else {
          that.getUserList();
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
