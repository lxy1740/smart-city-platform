import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-function-definition',
  templateUrl: './function-definition.component.html',
  styleUrls: ['./function-definition.component.scss']
})
export class FunctionDefinitionComponent implements OnInit {
  public mr: NgbModalRef; // 当前弹框

  productListItems = [];
  total = 0;
  page = 1;
  modelData = {
    title: '删除',
  };

  @Input()
  public alerts: Array<IAlert> = [];
  public alertsModal: Array<IAlert> = [];

  private backup: Array<IAlert>;
  constructor(private modalService: NgbModal,
    public router: Router,
  ) { }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  public closeAlertModal(alert: IAlert) {
    const index: number = this.alertsModal.indexOf(alert);
    this.alertsModal.splice(index, 1);
  }

  public reset() {
    this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
  }

  ngOnInit() {
  }

  // 属性页面
  goToZheRoute(para, id) {
    if (id) {
      this.router.navigate([para, { deviceId: id }]);
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

  openNewModal() {}



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

  pageChange() {}



}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}

