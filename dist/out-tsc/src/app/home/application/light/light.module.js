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
var light_routing_module_1 = require("./light-routing.module");
var core_2 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var shared_module_1 = require("../../../shared/shared.module");
var light_component_1 = require("./light.component");
var light_home_component_1 = require("./light-home/light-home.component");
var thestrategy_component_1 = require("./thestrategy/thestrategy.component");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var LightModule = /** @class */ (function () {
    function LightModule() {
    }
    LightModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                light_routing_module_1.LightRoutingModule,
                forms_1.FormsModule, forms_1.ReactiveFormsModule,
                material_1.MatStepperModule, material_1.MatButtonModule, material_1.MatInputModule, material_1.MatCardModule,
                material_1.MatSliderModule, material_1.MatSlideToggleModule,
                shared_module_1.SharedModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [
                light_component_1.LightComponent,
                light_home_component_1.LightHomeComponent,
                thestrategy_component_1.ThestrategyComponent
            ],
            schemas: [
                core_2.CUSTOM_ELEMENTS_SCHEMA,
                core_2.NO_ERRORS_SCHEMA
            ]
        })
    ], LightModule);
    return LightModule;
}());
exports.LightModule = LightModule;
//# sourceMappingURL=light.module.js.map