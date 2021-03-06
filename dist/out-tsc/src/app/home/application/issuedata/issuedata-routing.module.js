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
var auth_guard_service_1 = require("../../../guard/auth-guard.service");
var issuedata_component_1 = require("./issuedata.component");
var routes = [
    {
        path: '',
        component: issuedata_component_1.IssuedataComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
    }
];
var IssuedataRoutingModule = /** @class */ (function () {
    function IssuedataRoutingModule() {
    }
    IssuedataRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], IssuedataRoutingModule);
    return IssuedataRoutingModule;
}());
exports.IssuedataRoutingModule = IssuedataRoutingModule;
//# sourceMappingURL=issuedata-routing.module.js.map