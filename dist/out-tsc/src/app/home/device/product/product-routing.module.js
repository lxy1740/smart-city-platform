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
var product_component_1 = require("./product.component");
var product_home_component_1 = require("./product-home/product-home.component");
var function_definition_component_1 = require("./function-definition/function-definition.component");
// import { DataDefinitionComponent } from './function-definition/data-definition/data-definition.component';
// import { ServiceDescriptionComponent } from './function-definition/service-description/service-description.component';
var routes = [
    {
        path: '',
        component: product_component_1.ProductComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: '',
                children: [
                    { path: '', redirectTo: 'product-home', pathMatch: 'full' },
                    { path: 'product-home', component: product_home_component_1.ProductHomeComponent },
                    { path: 'function-definition', component: function_definition_component_1.FunctionDefinitionComponent },
                ]
            }
        ]
    }
];
var ProductRoutingModule = /** @class */ (function () {
    function ProductRoutingModule() {
    }
    ProductRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes), common_1.CommonModule],
            exports: [router_1.RouterModule],
            declarations: []
        })
    ], ProductRoutingModule);
    return ProductRoutingModule;
}());
exports.ProductRoutingModule = ProductRoutingModule;
//# sourceMappingURL=product-routing.module.js.map