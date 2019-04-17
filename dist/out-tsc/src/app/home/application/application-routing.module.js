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
var auth_guard_service_1 = require("../../guard/auth-guard.service");
var cover_component_1 = require("./cover/cover.component");
var calamity_component_1 = require("./calamity/calamity.component");
var application_component_1 = require("./application.component");
// import { LightComponent } from './light/light.component';
// import { SecurityComponent } from './security/security.component';
var traffic_component_1 = require("./traffic/traffic.component");
var water_component_1 = require("./water/water.component");
// import { AirComponent } from './air/air.component';
var electrical_component_1 = require("./electrical/electrical.component");
var led_component_1 = require("./led/led.component");
var routes = [
    {
        path: '',
        component: application_component_1.ApplicationComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: '',
                // canActivateChild: [AuthGuard],
                children: [
                    { path: '', redirectTo: 'cover', pathMatch: 'full' },
                    { path: 'air', loadChildren: './air/air.module#AirModule' },
                    { path: 'light', loadChildren: './light/light.module#LightModule' },
                    { path: 'issuedata', loadChildren: './issuedata/issuedata.module#IssuedataModule' },
                    { path: 'cover', component: cover_component_1.CoverComponent },
                    { path: 'calamity', component: calamity_component_1.CalamityComponent },
                    // { path: 'security', component: SecurityComponent },
                    { path: 'traffic', component: traffic_component_1.TrafficComponent },
                    { path: 'water', component: water_component_1.WaterComponent },
                    { path: 'electrical', component: electrical_component_1.ElectricalComponent },
                    { path: 'led', component: led_component_1.LedComponent }
                ]
            }
        ]
    }
];
var ApplicationRoutingModule = /** @class */ (function () {
    function ApplicationRoutingModule() {
    }
    ApplicationRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ApplicationRoutingModule);
    return ApplicationRoutingModule;
}());
exports.ApplicationRoutingModule = ApplicationRoutingModule;
//# sourceMappingURL=application-routing.module.js.map