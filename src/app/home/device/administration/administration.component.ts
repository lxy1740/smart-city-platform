import { Component, OnInit } from '@angular/core';
import { GEOREGION } from '../../../data/Geo-region';
declare var $: any;

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  // 行政区树
  zTreeObj: any;
  zNodes = GEOREGION;
  administration: any = {}; // 存储数据

  // 关于树
  public zTreeOnClick: (event, treeId, treeNode) => void;
  public zTreeOnCheck: (event, treeId, treeNode) => void; // 触发勾选树的事件

  constructor() {
    // 树的操作
    // 点击
    const that = this;
    this.zTreeOnClick = (event, treeId, treeNode) => { // 点击
      this.administration.geoRegion = {}; // 重新赋值前先清空
      // 获取树的节点
      const treeObj = $.fn.zTree.getZTreeObj('treeDemo');
      const nodes = treeObj.getCheckedNodes(true);
      // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值
      nodes.map((item, i) => {
      that.administration.geoRegion[item.id] = item.name;
        console.log(item.region_id + item.name);
      });
    };
  }

  ngOnInit() {
    // 树结构
    this.setZtreeNode([]);
  }

  // 点击搜索
  execQuery() {

  }

  // 点击“修改”
  openUpdataAdministration() {

  }

  // 点击“删除”
  openDelAdministration() {

  }

  // 新增区域
  openNewAdministrationZone(content) {

  }

  // 选框选中
  check() {

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
        treeObj.clickNode(node, true, false ); // 此处是用户勾选
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
      // check: {
      //   enable: true,
      //   chkStyle: 'radio',
      //   radioType: 'all', // 对所有树实现单选
      //   chkboxType: { 'Y': 'ps', 'N': 'ps' }
      // },
      callback: {
        onClick: this.zTreeOnClick, // 点击事件
        onCheck: this.zTreeOnCheck // 勾选事件
      },
      key : {
        region_id : 'region_id',
        name : 'name',
    }
    };

    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, this.zNodes);
  }

}
