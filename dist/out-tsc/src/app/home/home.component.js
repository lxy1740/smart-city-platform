"use strict";
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
var auth_service_1 = require("../guard/auth.service");
var router_1 = require("@angular/router");
var ngx_cookie_1 = require("ngx-cookie");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var Authority_tree_route_1 = require("../data/Authority.tree.route");
var mess_service_1 = require("../service/mess.service");
var communicate_service_1 = require("../service/communicate.service");
var angular_jwt_1 = require("@auth0/angular-jwt");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(authService, router, 
    // state: RouterStateSnapshot,
    _cookieService, messService, config, communicateService, jwtHelper) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this._cookieService = _cookieService;
        this.messService = messService;
        this.config = config;
        this.communicateService = communicateService;
        this.jwtHelper = jwtHelper;
        this.isCollapsed = false;
        this.open = false;
        this.visible = true; // 控制可视区域
        this.routeTree = Authority_tree_route_1.AUTHORITYTREECOPYROUTE;
        config.placement = 'top-left';
        var token = localStorage.getItem('token');
        this.customerId = this.jwtHelper.decodeToken(token) && this.jwtHelper.decodeToken(token).customerid;
        // this.visible = urlService.getURLParam('visible') === '' ? true : false;
        // 全屏
        this.communicateService.getMessage().subscribe(function (message) {
            _this.visible = message.mess;
        });
        // console.log(this.customerId);
        // const url: string = state.url;
        // console.log(router);
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.currentUser = this._cookieService.getObject('currentUser');
        var currentUser = JSON.parse(this.currentUser);
        this.loginName = currentUser.loginName;
    };
    // 路由跳转-传递参数-这是在html中绑定的click跳转事件
    HomeComponent.prototype.jumpHandle = function (item) {
        this.queryPoint = item;
        this.messService.StatusMission(this.queryPoint);
        // this.communicateService.sendMessage(this.queryPoint);
        this.router.navigate(["home/monitor"]);
    };
    // 判断数组中是否存在值
    HomeComponent.prototype.getture = function (str) {
        var Authorities = JSON.parse(localStorage.getItem('Authorities'));
        var Auth = Authorities ? Authorities.Authorities : [];
        var res = false;
        if (str === 'HP-000') {
            res = true;
            return res;
        }
        if (this.customerId && str === 'DM-007') {
            res = false;
            return res;
        }
        Auth.map(function (item) {
            if (item === str) {
                res = true;
                return res;
            }
        });
        return res;
    };
    // 退出登录
    HomeComponent.prototype.logout = function () {
        this.authService.logout();
    };
    // 侧边栏开合按钮
    HomeComponent.prototype.switchSidebar = function () {
        this.open = !this.open;
    };
    // 字幕动画
    HomeComponent.prototype.marquee = function () {
        $('.marquee').marquee({
            // duration in milliseconds of the marquee
            duration: 3000,
            // speed: 5000,
            // gap in pixels between the tickers
            gap: 0,
            // time in milliseconds before the marquee will start animating
            delayBeforeStart: 0,
            // 'left' or 'right'
            direction: 'up',
            // true or false - should the marquee be duplicated to show an effect of continues flow
            duplicated: true,
            pauseOnHover: true
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router,
            ngx_cookie_1.CookieService,
            mess_service_1.MessService,
            ng_bootstrap_1.NgbDropdownConfig,
            communicate_service_1.CommunicateService,
            angular_jwt_1.JwtHelperService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: home.component.ts
@time: 2018 / 7 / 2 17: 18

*/
//# sourceMappingURL=home.component.js.map