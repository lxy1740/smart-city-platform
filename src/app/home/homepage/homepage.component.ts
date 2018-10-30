import { Component, ElementRef, OnInit } from '@angular/core';
// import { ROUTELIST } from './route-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  // routes = ROUTELIST;

  constructor(public router: Router, private el: ElementRef) { }
  setChange() {
    const sty = this.el.nativeElement.querySelector('.btn1');
    sty.style.background = 'url(../../../assets/imgs/user-profile.png) no-repeat center';
    this.el.nativeElement.querySelector('.pp1').remove();
    this.el.nativeElement.querySelector('.pp2').remove();
   }

  ngOnInit() {
    // this.setHeight();
  }

  goToZheRoute(para) {
    this.router.navigate([para]);
  }

  goToChange() {
    this.setChange();
  }
}
