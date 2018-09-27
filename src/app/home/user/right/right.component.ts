import { Input, Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GUIZTREENODE } from '../../../data/gui-z-tree';
import { RightService } from '../../../service/right.service';

declare var $: any;
@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {

  zTreeObj: any;

  setting = {}; // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）

  // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
  zNodes = GUIZTREENODE;

  role: any = {}; // 存储数据
  public mr: NgbModalRef; // 当前弹框
  modelData = {
    title: '删除',
    body: 'hh',
  };
  // 弹框
  closeResult: string;
  roleList = []; // 角色表
  queryStr = '';
  page: any;
  pageSize = 10;
  total: any;
  @Input()
  public alerts: Array<IAlert> = [];

  constructor(private modalService: NgbModal, private rightService: RightService) {

    this.page = 1;

  }

  ngOnInit() {
    this.getRoleList();
  }
  // 获取所有角色
  getRoleList() {
    const that = this;
    this.rightService.getAllRole(this.queryStr, this.page, this.pageSize).subscribe({
      next: function(val) {
        that.roleList = val.items;
        console.log(that.roleList);
        that.total = val.total;
      },
      complete: function() {},
      error: function(error) {
        console.log(error);
      }
    });
  }
  // 弹框操作
  open(content) {
    const that = this;
    const modal = this.modalService.open(content, { size: 'lg' });
    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
    const that1 = this;
    this.zTreeObj = $.fn.zTree.init($('#guitree'), this.setting, this.zNodes);
    this.zTreeObj = $.fn.zTree.init($('#guitree'), this.setting, this.zNodes);
  }
  openUpdateRole(content, item) {

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
    console.log($event);
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

  pageChange() {}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
