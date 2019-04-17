"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./home.component");
var auth_guard_service_1 = require("../guard/auth-guard.service");
var routes = [
    {
        path: '',
        component: home_component_1.HomeComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            { path: '', redirectTo: 'homepage', pathMatch: 'full' },
            { path: 'homepage', loadChildren: './homepage/homepage.module#HomepageModule', data: { preload: true } },
            { path: 'monitor', loadChildren: './device-monitor/device-monitor.module#DeviceMonitorModule' },
            // { path: 'monitor', loadChildren: './monitor/monitor.module#MonitorModule' },
            { path: 'device', loadChildren: './device/device.module#DeviceModule' },
            { path: 'user', loadChildren: './user/user.module#UserModule' },
            { path: 'application', loadChildren: './application/application.module#ApplicationModule' },
        ]
    },
];
var HomeRoutingModule = /** @class */ (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());
exports.HomeRoutingModule = HomeRoutingModule;
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: home.routes.ts
@time: 2018 / 7 / 2 17: 18

*/
//# sourceMappingURL=home-routing.module.js.map