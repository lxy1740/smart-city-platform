
import { Component, OnInit , Input} from '@angular/core';
import { RoadService } from '../../../service/road.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: 'app-road',
  templateUrl: './road.component.html',
  styleUrls: ['./road.component.scss']
})
export class RoadComponent implements OnInit {
  // 行政区树
  zTreeObj: any;
  roadList = [];
  regionsList = [];
  queryStr = '';
  page = 1;
  pageSize = 10;
  total = 0;
  addOrUpdate = '新建道路'; // 新建/修改标识
  ROADMODEL: any = {};


  public mr: NgbModalRef; // 当前弹框
  modelData = { // 弹框
    title: '删除',
  };

  // 关于树
  public zTreeOnClick: (event, treeId, treeNode) => void;
  public zTreeOnCheck: (event, treeId, treeNode) => void; // 触发勾选树的事件
  @Input()
  public alerts: Array<IAlert> = []; // 信息弹框
  public alertsModal: Array<IAlert> = []; // 信息弹框
  private backup: Array<IAlert>;  // 信息弹框


  constructor(
    private roadService: RoadService,
    private modalService: NgbModal,
  ) {
    const that = this;
    // 树的操作
    // 点击
    this.zTreeOnCheck = (event, treeId, treeNode) => { // 勾选
      // 获取树的节点
      const treeObj = $.fn.zTree.getZTreeObj('treeDemo');
      const nodes = treeObj.getCheckedNodes(true);
      console.log(nodes);
      that.ROADMODEL.regions = [];
      nodes.map(item => {
        that.ROADMODEL.regions.push({
          center : item.center,
          full_name : item.full_name,
          id : item.id,
          name : item.name,
          level : item.level,
        });
      });
      console.log(that.ROADMODEL.regions);
    };
    this.ROADMODEL.regions = [];
    this.regionsList = window.localStorage.regionsList ? JSON.parse(window.localStorage.regionsList) : [];

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
    this.getRegions();
    this.getlogs();
  }
// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
  getZoneTree() {
    const that = this;
    const setting = {
      view: {
        selectedMulti: true,
        dblClickExpand: false,
        showLine: true,
      },
      check: {
        enable: true,
        chkStyle: 'checkbox', // 勾选框类型(checkbox 或 radio）
        radioType: 'all', // 对所有树实现单选
        chkboxType: { 'Y': 's', 'N': 'ps' }
      },
      callback: {
        onClick: this.zTreeOnClick, // 点击事件
        onCheck: this.zTreeOnCheck // 勾选事件
      }
    };

    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, this.regionsList);
  }

   // 获取行政区域
  getRegions() {
    const that = this;

    this.roadService.getRegions()
      .subscribe({
        next: function (val) {
          that.regionsList = val;
          window.localStorage.regionsList = JSON.stringify(val);
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  // 分页获取道路
  getlogs() {
    const that = this;

    this.roadService.getRoads( this.page, this.pageSize, this.queryStr)
      .subscribe({
        next: function (val) {
          that.roadList = val.items;
          that.total = val.total;
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  // 添加道路
  addRoads() {
    const that = this;

    this.roadService.addRoads(this.ROADMODEL)
      .subscribe({
        next: function (val) {
          that.mr.close();
        },
        complete: function() {
          that.getlogs();
        },
        error: function (error) {
          console.log(error);

        }
      });
  }
// 删除道路
  delroad() {
    const that = this;
    const body = {};
    this.roadService.delRoads(body)
      .subscribe({
        next: function (val) {
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  // 修改道路

  updetaRoads() {
    const that = this;

    this.roadService.updetaRoads(this.ROADMODEL)
      .subscribe({
        next: function (val) {
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  // 返回
  goback() {
    window.history.back();
  }
  // 新建道路弹框
  openNew(content) {
    const that = this;
    const modal = this.modalService.open(content);
    this.mr = modal;
    modal.result.then((result) => {
      // this.showPosiTable = false;
    }, (reason) => {
      // this.showPosiTable = false;
    });
    // 树结构，树设置
    this.getZoneTree();
  }
  // 修改弹框
  openUpdata(content) {
    const that = this;
    const modal = this.modalService.open(content);
    this.mr = modal;
    modal.result.then((result) => {
      // this.showPosiTable = false;
    }, (reason) => {
      // this.showPosiTable = false;
    });
  }

  // 新建道路 or 修改
  addorUpdate() {
    this.addRoads();
  }

  // 删除弹框
  openDel(content) {}

  // 删除设备弹框
  openDelDevice(content, item) {
    // this.device.itemDelId = item.id;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
  }
  // 删除设备规则
  closeDevice($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delroads();
    }
    this.mr.close();
  }


  // 分页获取数据
  pageChange() {
    this.getlogs();
  }

  // 搜索
  dataSearch() {
    this.page = 1;
    this.getlogs();
  }

}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
