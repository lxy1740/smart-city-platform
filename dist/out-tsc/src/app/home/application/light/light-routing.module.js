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
var common_1 = require("@angular/common");
var auth_guard_service_1 = require("../../../guard/auth-guard.service");
var light_component_1 = require("./light.component");
var light_home_component_1 = require("./light-home/light-home.component");
var thestrategy_component_1 = require("./thestrategy/thestrategy.component");
var routes = [
    {
        path: '',
        component: light_component_1.LightComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: '',
                children: [
                    { path: '', redirectTo: 'light-home', pathMatch: 'full' },
                    { path: 'light-home', component: light_home_component_1.LightHomeComponent },
                    { path: 'thestrategy', component: thestrategy_component_1.ThestrategyComponent },
                ]
            }
        ]
    }
];
var LightRoutingModule = /** @class */ (function () {
    function LightRoutingModule() {
    }
    LightRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes), common_1.CommonModule],
            exports: [router_1.RouterModule],
            declarations: []
        })
    ], LightRoutingModule);
    return LightRoutingModule;
}());
exports.LightRoutingModule = LightRoutingModule;
//# sourceMappingURL=light-routing.module.js.map