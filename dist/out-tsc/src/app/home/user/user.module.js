"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var common_1 = require("@angular/common");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("../../shared/shared.module");
var user_routing_module_1 = require("./user-routing.module");
var user_component_1 = require("./user.component");
var admin_component_1 = require("./admin/admin.component");
var right_component_1 = require("./right/right.component");
var customer_component_1 = require("./customer/customer.component");
var administration_component_1 = require("./administration/administration.component");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule,
                user_routing_module_1.UserRoutingModule,
                ng_bootstrap_1.NgbModule.forRoot(),
            ],
            declarations: [user_component_1.UserComponent, admin_component_1.AdminComponent, right_component_1.RightComponent, customer_component_1.CustomerComponent, administration_component_1.AdministrationComponent],
            schemas: [
                core_2.CUSTOM_ELEMENTS_SCHEMA,
                core_2.NO_ERRORS_SCHEMA
            ]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map