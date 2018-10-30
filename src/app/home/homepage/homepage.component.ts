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

  constructor(public router: Router,  private elementRef: ElementRef) { }



  setChange() {
    const styApp = this.elementRef.nativeElement.querySelector('.app');
    const sty = this.elementRef.nativeElement.querySelector('.btn1');
    if (styApp) {
      sty.style.background = 'url(../../../assets/imgs/user-profile.png) no-repeat center';
      this.elementRef.nativeElement.querySelector('.pp').remove();
    } else {
      sty.style.background = '#45939D';
      const d1 = this.elementRef.nativeElement.querySelector('.btn1');
      d1.insertAdjacentHTML('beforeend', '<div class="col-md-12 content pp"><p><span><i class="fa  nav-icon"></i></span></p><p class="app">APP下载</p></div>');
    }

   }
   openSideBar() {
    let html = `<div class="col-md-12 content pp">`;
    html = html + `<p><span><i class="fa  nav-icon"></i></span></p>`;
    html = html + `<p class="app">APP下载</p>`;
    html = html + `</div>`;
    this.elementRef.nativeElement.querySelector('.app').append(html);
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
