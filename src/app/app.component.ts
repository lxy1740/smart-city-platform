import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(public router: Router) {

  }

  ngOnInit() {
  // 切换路由时滚动条回到顶部
    this.router.events
      .subscribe((event) => {
        $(window).scrollTop(0);

      });

  }
}
