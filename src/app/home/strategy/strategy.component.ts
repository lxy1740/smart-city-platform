import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare let echarts;
@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})

export class StrategyComponent implements OnInit {

  navs = [{
    id : 0,
    name: '策略时间'
    },
    {
      id: 1,
      name: '策略范围'
    }
  ];
  sub_navs = [{
    id: 0,
    name: '节假日时间'
  },
  {
    id: 1,
    name: '工作日时间'
  }
  ];
  nav_index = 0; // 菜单索引
  sub_nav_index = 0; // 菜单索引
  strategyList = [];

  // 弹框
  closeResult: string;
  strategy_index: number; // 策略索引

// , public activeModal: NgbActiveModal
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    setTimeout(() => {
      this.chartMapChana1();
      this.chartMapChana2();
    }, 2);

  }


  chartMapChana1() {

    const option = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          radius: '100%',
          startAngle: 90,
          endAngle: -269,
          clockwise: true,
          min: 0,
          max: 12,
          splitNumber: 12,
          detail: false,
          // axisLabel: false,
          // detail: { formatter: '{value}%' },
          data: [{ value: 50, name: '' }]
        }
      ]
    };

    const bmapChart = echarts.init(document.getElementById('map_container1'));
    bmapChart.setOption(option);
  }

  chartMapChana2() {

    const option = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          radius: '100%',
          startAngle: 90,
          endAngle: -269,
          clockwise: true,
          min: 0,
          max: 24,
          splitNumber: 24,
          detail: false,
          // detail: { formatter: '{value}%' },
          data: [{ value: 50, name: '' }]
        }
      ]
    };

    // setInterval(function () {
    //   option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
    //   myChart.setOption(option, true);
    // }, 2000);

    const bmapChart = echarts.init(document.getElementById('map_container2'));
    bmapChart.setOption(option);
  }

  // 弹框操作
  open(content, index) {

    const that = this;
    this.strategy_index = index;
    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      that.removeStrategy();

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }
  close() {

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


  changeNav(index) {
    this.nav_index = index;
    if (index === 0) {
      setTimeout(() => {
        this.chartMapChana1();
        this.chartMapChana2();
      }, 2);
    }
  }

  changeSubNav(index) {
    this.sub_nav_index = index;
  }
  addStrategy() {
    this.strategyList.push({date: new Date()});
  }
  removeStrategy() {
    const index = this.strategy_index;
    this.strategyList.splice(index, 1);
  }

}
