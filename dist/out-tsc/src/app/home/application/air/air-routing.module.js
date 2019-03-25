"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var auth_guard_service_1 = require("../../../guard/auth-guard.service");
var air_component_1 = require("./air.component");
var air_home_component_1 = require("./air-home/air-home.component");
var theairreport_component_1 = require("./theairreport/theairreport.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var routes = [
    {
        path: '',
        component: air_component_1.AirComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: '',
                children: [
                    { path: '', redirectTo: 'air-home', pathMatch: 'full' },
                    { path: 'air-home', component: air_home_component_1.AirHomeComponent },
                    { path: 'theairreport', component: theairreport_component_1.TheairreportComponent },
                    { path: 'dashboard', component: dashboard_component_1.DashboardComponent }
                ]
            }
        ]
    }
];
var AirRoutingModule = /** @class */ (function () {
    function AirRoutingModule() {
    }
    AirRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes), common_1.CommonModule],
            exports: [router_1.RouterModule],
            declarations: []
        })
    ], AirRoutingModule);
    return AirRoutingModule;
}());
exports.AirRoutingModule = AirRoutingModule;
//# sourceMappingURL=air-routing.module.js.map