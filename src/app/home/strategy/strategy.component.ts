import { Component, OnInit } from '@angular/core';

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
  index = 0;

  constructor() { }

  ngOnInit() {
  }

  changeNav(index) {
    this.index = index;
  }

}
