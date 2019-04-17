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
var devices_component_1 = require("./devices.component");
var install_log_component_1 = require("./install-log/install-log.component");
var line_log_component_1 = require("./line-log/line-log.component");
var device_detail_component_1 = require("./device-detail/device-detail.component");
var device_home_component_1 = require("./device-home/device-home.component");
var history_data_component_1 = require("./device-detail/history-data/history-data.component");
var routes = [
    {
        path: '',
        component: devices_component_1.DevicesComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: '',
                children: [
                    { path: '', redirectTo: 'devices-home', pathMatch: 'full' },
                    { path: 'devices-home', component: device_home_component_1.DeviceHomeComponent },
                    { path: 'install-log', component: install_log_component_1.InstallLogComponent },
                    { path: 'line-log', component: line_log_component_1.LineLogComponent },
                    { path: 'devices-detail', component: device_detail_component_1.DeviceDetailComponent },
                    { path: 'history-data', component: history_data_component_1.HistoryDataComponent }
                ]
            }
        ]
    }
];
var DevicesRoutingModule = /** @class */ (function () {
    function DevicesRoutingModule() {
    }
    DevicesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes), common_1.CommonModule],
            exports: [router_1.RouterModule],
            declarations: []
        })
    ], DevicesRoutingModule);
    return DevicesRoutingModule;
}());
exports.DevicesRoutingModule = DevicesRoutingModule;
//# sourceMappingURL=devices-routing.module.js.map