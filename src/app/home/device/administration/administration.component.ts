import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  administration: any = {}; // 存储数据

  constructor() { }

  ngOnInit() {
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
}
