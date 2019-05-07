"use strict";
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: login.component.ts
@time: 2018 / 7 / 2 17: 18

*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("../guard/auth.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.model = {};
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        var video1 = this.video1.nativeElement;
        var video2 = this.video2.nativeElement;
        video1.style.display = "block";
        video2.style.display = "none";
        video1.addEventListener("ended", function () {
            video1.style.display = "none";
            video2.style.display = "block";
        });
    };
    LoginComponent.prototype.onKeydown = function (event) {
        if (event.keyCode !== 13) {
            this.error = '';
        }
    };
    LoginComponent.prototype.focusPlay = function (event) {
        var video1 = this.video1.nativeElement;
        var video2 = this.video2.nativeElement;
        if (!video1.paused) {
            video1.pause();
        }
        if (!video2.paused) {
            video2.pause();
        }
    };
    LoginComponent.prototype.blurPlay = function (event) {
        var video1 = this.video1.nativeElement;
        var video2 = this.video2.nativeElement;
        setTimeout(function () {
            if (video1.paused) {
                video1.play();
            }
            if (video2.paused) {
                video2.play();
            }
        }, 10);
    };
    LoginComponent.prototype.login = function () {
        var that = this;
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
                    var redirect = that.authService.redirectUrl ? that.authService.redirectUrl : '/home';
                    console.log(redirect);
                    // Set our navigation extras object
                    // that passes on our global query params and fragment
                    var navigationExtras = {
                        queryParamsHandling: 'preserve',
                        preserveFragment: true
                    };
                    // Redirect the user
                    // this.router.navigate([redirect], navigationExtras);
                    that.router.navigate([redirect]);
                }
                else {
                    that.error = '登录失败!';
                    that.loading = false;
                }
            },
            complete: function () {
                var token = localStorage.getItem('token');
                that.authService.getAuthorities(token);
            },
            error: function (error) {
                console.log(error);
                var errormes = JSON.parse(error.error);
                that.error = errormes.errors[0].defaultMessage;
                that.loading = false;
            }
        });
    };
    // 初始login页面
    LoginComponent.prototype.logout = function () {
        this.authService.logout();
    };
    __decorate([
        core_1.ViewChild("video1"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "video1", void 0);
    __decorate([
        core_1.ViewChild("video2"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "video2", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map