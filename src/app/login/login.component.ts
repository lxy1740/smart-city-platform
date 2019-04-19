/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: login.component.ts
@time: 2018 / 7 / 2 17: 18

*/

import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements AfterViewInit {
  message: string;
  model: any = {};
  error: any;
  loading = false;

  @ViewChild("video1") video1: ElementRef;
  @ViewChild("video2") video2: ElementRef;

  constructor(public authService: AuthService, public router: Router) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const video1 = this.video1.nativeElement;
    const video2 = this.video2.nativeElement;
    video1.style.display = "block";
    video2.style.display = "none";
    video1.addEventListener("ended", function () {
      video1.style.display = "none";
      video2.style.display = "block";
    });
  }

  onKeydown(event: any) {
    if (event.keyCode !== 13) {
      this.error = '';
    }
  }

  focusPlay(event: any) {
    const video1: HTMLVideoElement = this.video1.nativeElement;
    const video2: HTMLVideoElement = this.video2.nativeElement;
    if (!video1.paused) {
      video1.pause()
    }
    if (!video2.paused) {
      video2.pause()
    }
  }
  blurPlay(event: any) {
    const video1: HTMLVideoElement = this.video1.nativeElement;
    const video2: HTMLVideoElement = this.video2.nativeElement;
    setTimeout(function () {
      if (video1.paused) {
        video1.play()
      }
      if (video2.paused) {
        video2.play()
      }
    }, 10);
  }

  login() {
    const that = this;
    this.loading = true;
    // this.authService.login1(this.model.username, this.model.password).subscribe(() => {});
    // 登录进入home页面
    this.authService.login(this.model.username, this.model.password)
      .subscribe({
        next: function (val) {
          console.log(val);
          if (that.authService.isLoggedIn) {
            console.log(that.authService.isLoggedIn);
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            const redirect = that.authService.redirectUrl ? that.authService.redirectUrl : '/home';
            console.log(redirect);
            // Set our navigation extras object
            // that passes on our global query params and fragment
            const navigationExtras: NavigationExtras = {
              queryParamsHandling: 'preserve',
              preserveFragment: true
            };

            // Redirect the user
            // this.router.navigate([redirect], navigationExtras);
            that.router.navigate([redirect]);
          } else {
            that.error = '登录失败!';
            that.loading = false;
          }
        },
        complete: function () {
          const token = localStorage.getItem('token');
          that.authService.getAuthorities(token);


        },
        error: function (error) {
          console.log(error);
          const errormes = JSON.parse(error.error);
          that.error = errormes.errors[0].defaultMessage;
          that.loading = false;
        }
      });
  }

  // 初始login页面
  logout() {
    this.authService.logout();
  }
}
