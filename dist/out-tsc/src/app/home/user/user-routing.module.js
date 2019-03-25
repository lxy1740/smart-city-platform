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
var admin_component_1 = require("./admin/admin.component");
var right_component_1 = require("./right/right.component");
var user_component_1 = require("./user.component");
var customer_component_1 = require("./customer/customer.component");
var administration_component_1 = require("./administration/administration.component");
var routes = [
    {
        path: '',
        component: user_component_1.UserComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: '',
                // canActivateChild: [AuthGuard],
                children: [
                    { path: '', redirectTo: 'admin', pathMatch: 'full' },
                    { path: 'admin', component: admin_component_1.AdminComponent },
                    { path: 'right', component: right_component_1.RightComponent },
                    { path: 'customer', component: customer_component_1.CustomerComponent },
                    { path: 'administration', component: administration_component_1.AdministrationComponent }
                ]
            }
        ]
    }
];
var UserRoutingModule = /** @class */ (function () {
    function UserRoutingModule() {
    }
    UserRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], UserRoutingModule);
    return UserRoutingModule;
}());
exports.UserRoutingModule = UserRoutingModule;
//# sourceMappingURL=user-routing.module.js.map