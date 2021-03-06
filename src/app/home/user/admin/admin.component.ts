import { Input, Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../../service/admin.service';
import { CustomerService } from '../../../service/customer.service';
import { JwtHelperService } from '@auth0/angular-jwt';


declare var $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  zTreeObj: any;
  // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
  zTreeObj1: any; // 树
  zNodes1: any; // 树结构

  setting = {}; // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）


  public mr: NgbModalRef; // 当前弹框
  modelData = {
    title: '删除',
    body: 'hh',
  };


  user: any = {}; // 存储数据
  closeResult: string;
  userList = []; // 用户表
  roleList = []; // 角色表
  roleList1 = []; // 不含“不限”项
  queryStr = ''; // 检索字符串
  page = 1;
  pageSize = 10;
  total: number;
  total2 = 0; // 分页
  page2 = 1; // 分页
  pageSize2 = 10; // 分页

  curRole: any; // 当前角色
  addOrUpdate: any; // 新建或修改标识
  currentCustomer: any = {}; // 当前客户
  CustomerList  = [];
  customerId: null; // 平台客户
  Customershow = false;

  currentTreeNodeId: any; // 当前选中的区域
  public zTreeOnClick: (event, treeId, treeNode) => void;
  public zTreeOnCheck: (event, treeId, treeNode) => void;

  @Input()
  public alerts: Array<IAlert> = [];
  public alertsModal: Array<IAlert> = [];

  constructor(private modalService: NgbModal,
    private adminService: AdminService,
    private customerService: CustomerService,
    public jwtHelper: JwtHelperService,
    ) {

    const token = localStorage.getItem('token');
    this.customerId = this.jwtHelper.decodeToken(token) && this.jwtHelper.decodeToken(token).customerid;
    // 树的操作
    // 点击
    const that = this;
    // this.zTreeOnClick = (event, treeId, treeNode) => {    // 点击
    //   treeNode.checked = true;
    //   console.log(treeNode);
    // };
    this.zTreeOnCheck = (event, treeId, treeNode) => { // 勾选
      this.user.roleIds = []; // 重新赋值前先清空
      const treeObj = $.fn.zTree.getZTreeObj('treeDemo1');
      const nodes = treeObj.getCheckedNodes(true);
      nodes.map((item, i) => {
        that.user.roleIds[i] = item.id;
      });
    };
  }

  ngOnInit() {
    // this.zTreeObj = $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), this.setting);
    this.getUserList();
    this.getRoleList();
    this.getCustomer();
    // console.log(this.zNodes);
  }
  // 选择客户
  selecteCustomer(item) {
    this.currentCustomer = item;
    this.Customershow = false;
  }

  // 分页获取客户
  getCustomer() {
    const that = this;

    this.customerService.getCustomer(this.page2, this.pageSize2, '')
      .subscribe({
        next: function (val) {
          that.CustomerList = val.items;
          that.total2 = val.tota2;
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  // 分页
  pageChange2() {
    this.getCustomer();
  }
  // 显示客户
  showCustomer() {
    this.Customershow = true;
  }

  // 离开客户
  CustomerlistMouseleave() {
    this.Customershow = false;
  }

  // 获取用户列表
  getUserList() {
    const that = this;
    this.adminService.getAllUser(this.queryStr, this.page, this.pageSize).subscribe({
      next: function(val) {
        console.log('user', val);
        that.userList = val.items;
        that.total = val.total;
      },
      complete: function() {},
      error: function(error) {
        // console.log('errorOnAdminpage');
        console.log(error);
      }
    });
  }
  // 获取角色列表
  getRoleList() {
    const that = this;
    this.adminService.getAllRole().subscribe({
      next: function(val) {
        // console.log('role', val);
        that.roleList1 = val;
        // console.log(that.roleList1);
        that.roleList = val.map((item) => Object.assign({}, item));
        // console.log(that.roleList);
        that.roleList.unshift({ id: 0, name: '不限' }); // 所有项
        that.curRole = that.roleList[0];
        // console.log(that.curRole);
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
  // 打开新增用户 框体
  openAddUser(content) {
    const that = this;
    this.addOrUpdate = '新建用户';
    this.user.userName = '';
    this.user.password = '';
    this.user.email = '';
    this.user.mobile = '';
    this.user.fullName = '';
    this.user.nickName = '';
    this.user.gender = '0';
    this.user.avatar = '';
    this.currentCustomer = {};

    this.user.roleListCheck = []; // 新建用户时各角色的选中状态（check）
    this.user.roleIds = [];
    this.roleList1.map((item, i) => {
      that.user.roleListCheck.push({check: false}); // 一一对应角色表roleList1
    });

    const modal = this.modalService.open(content, { windowClass: 'ex-lg-modal' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
    // 树状图里面内容为空号
    this.setZtreeNode([]);
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
  // 新增用户点击事件
  addUser() {
    const that = this;
    const body = {
      'userName': this.user.userName,
      'password': this.user.password,
      'gender': this.user.gender,
      'avatarurl': this.user.avatar,
      'email': this.user.email,
      'mobile': this.user.mobile,
      'fullName': this.user.fullName,
      'nickName': this.user.nickName,
      'roles': this.user.roleIds,
      'customerId': this.currentCustomer.id || this.customerId,
    };
    this.adminService.addNewUser(body).subscribe({
      next: function(val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '新增成功！',
        });
      },
      complete: function() {
        that.mr.close();
        that.getUserList();
      },
      error: function(error) {
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
  // 打开修改用户信息框
  openUpdateUser(content, item) {
    const that = this;
    this.addOrUpdate = '修改用户';
    this.user.curUser = item; // 所修改的用户
    this.user.userName = item.userName;
    this.user.password = item.password;
    this.user.email = item.email;
    this.user.mobile = item.mobile;
    this.user.fullName = item.fullName;
    this.user.nickName = item.nickName;
    this.currentCustomer.id = item.customerId;
    this.currentCustomer.name = item.customerName;
    this.user.gender = String(item.gender);
    console.log(item);
    console.log(item.gender);

    this.user.avatar = item.avatarurl;

    this.user.roleListCheck = []; // 新建及修改用户时各角色的选中状态（check）
    this.user.roleIds = [];
    const userRoles = item.roles ? item.roles : []; // 为空时避免因undefined报错
    // this.roleList1.find((name) => name === userRoles[0]);
    this.roleList1.map((item1, i) => { // 根据当前用户角色数组，设置修改框中对应的check值
      let sign = true; // 标记是否已checked
      for (let index = 0; index < userRoles.length; index++) {
        if (userRoles[index] === item1.name) {
          sign = false;
          that.user.roleListCheck.push({check: true}); // 一一对应角色表roleList1
          break;
        }
      }
      if (sign) {
        that.user.roleListCheck.push({check: false});
      }
    });

    const modal = this.modalService.open(content, { windowClass: 'ex-lg-modal' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });

    this.setZtreeNode(userRoles);
  }
  // 修改用户点击事件
  updataUser() {
    const that = this;
    const body = {
      'id': this.user.curUser.id,
      'userName': this.user.userName,
      'password': this.user.password,
      'gender': this.user.gender,
      'avatarurl': this.user.avatar,
      'email': this.user.email,
      'mobile': this.user.mobile,
      'fullName': this.user.fullName,
      'nickName': this.user.nickName,
      'roles': this.user.roleIds,
      'customerId': this.currentCustomer.id || this.customerId,
    };
    this.adminService.updateUser(body).subscribe({
      next: function(val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '修改成功！',
        });
      },
      complete: function() {
        that.mr.close();
        that.getUserList();
      },
      error: function(error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alertsModal.push({
          id: 1,
          type: 'danger',
          message: `修改失败：${message}！`,
        });
      }
    });
  }
  // 新建/修改用户点击事件
  addorUpdt() {
    if (this.addOrUpdate === '新建用户') {
      this.addUser();
    } else {
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
  // 为新建用户选定角色，多选按键点击事件
  addRoleToUser() {
    const that = this;
    this.user.roleIds = [];
    this.user.roleListCheck.map((item, i) => {
      if (item.check === true) {
        const item1 = that.roleList1[i].id;
        if (item1) {
          that.user.roleIds.push(item1);
        }
      }
    });
    console.log(this.user.roleIds);
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
        selectedMulti: true
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
    const zNodes = this.roleList1;
    this.zTreeObj1 = $.fn.zTree.init($('#treeDemo1'), setting, zNodes);

    const treeObj = $.fn.zTree.getZTreeObj('treeDemo1');
    userRoles.map((item, i) => {
      const node = treeObj.getNodeByParam('name', item, null);
      if (node) {
        treeObj.checkNode(node, true, true);
        that.user.roleIds[i] = that.roleList1.find(t => t.name === item).id;
      }
    });
    console.log(that.user.roleIds);

  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
