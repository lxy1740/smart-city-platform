import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  model: any = {};
  closeResult: string;
  productList: any;
  productListItems = [];
  total: number; // 分页
  page: number;
  pagesize = 10;
  type = 0;
  deviceList = []; // 设备列表
  deviceTypes = []; // 设备列表
  currentType: any; // 当前搜索设备类别

  constructor(private modalService: NgbModal,  private productService: ProductService) { 
    this.page = 1;
  }

  ngOnInit() {
    this.getDevice();
    this.getModel(0, this.page, this.pagesize);
  }

    // 获取设备型号
  getModel(type: number, page: number, pagesize: number) {
    const that = this;
    this.productService.getModel(type, page, pagesize).subscribe({
      next: function (val) {
        that.productList = val;
        that.total = val.total;
        that.productListItems = val.items;

      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  // fenye
  pageChange() {
    this.getModel(this.currentType.id, this.page, this.pagesize);
  }
  // 获取设备列表
  getDevice() {
    const that = this;
    this.productService.getDevice().subscribe({
      next: function (val) {
        that.deviceList = val;
        that.model.device = val[0];
        that.deviceTypes = val.map((item) => Object.assign({}, item));
        that.deviceTypes.unshift({ id: 0, name: '不限' }); // 所有项
        that.currentType = that.deviceTypes[0];
      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
      }
    });
  }


  deviceTypeChange() {
    this.getModel(this.currentType.id, this.page, this.pagesize);
  }
  changeName(modelId) {
    let modelName;
    this.deviceTypes.map((item, i) => {
      if (item.id === modelId) {
        modelName = item.name;
      }
    });
    return modelName;
  }
  openNewProduct(content) {
    const that = this;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }
  openAddParams(content) {
    const that = this;
    this.modalService.open(content, { windowClass: 'md-modal' }).result.then((result) => {
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
}
