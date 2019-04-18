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
var core_2 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var shared_module_1 = require("../../../shared/shared.module");
var forms_1 = require("@angular/forms");
var air_routing_module_1 = require("./air-routing.module");
var air_component_1 = require("./air.component");
var air_home_component_1 = require("./air-home/air-home.component");
var theairreport_component_1 = require("./theairreport/theairreport.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var AirModule = /** @class */ (function () {
    function AirModule() {
    }
    AirModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule,
                air_routing_module_1.AirRoutingModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule,
                ng_bootstrap_1.NgbModule.forRoot(),
            ],
            declarations: [
                air_component_1.AirComponent,
                air_home_component_1.AirHomeComponent,
                theairreport_component_1.TheairreportComponent,
                dashboard_component_1.DashboardComponent
            ],
            schemas: [
                core_2.CUSTOM_ELEMENTS_SCHEMA,
                core_2.NO_ERRORS_SCHEMA
            ]
        })
    ], AirModule);
    return AirModule;
}());
exports.AirModule = AirModule;
//# sourceMappingURL=air.module.js.map