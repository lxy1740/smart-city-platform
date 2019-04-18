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
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var material_1 = require("@angular/material");
var led_component_1 = require("./led.component");
var led_routing_module_1 = require("./led-routing.module");
var LedModule = /** @class */ (function () {
    function LedModule() {
    }
    LedModule = __decorate([
        core_2.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, led_routing_module_1.LedRoutingModule,
                material_1.MatSliderModule, material_1.MatSlideToggleModule,
                ng_bootstrap_1.NgbModule.forRoot(),
            ],
            declarations: [
                led_component_1.LedComponent,
            ],
            schemas: [
                core_1.CUSTOM_ELEMENTS_SCHEMA,
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], LedModule);
    return LedModule;
}());
exports.LedModule = LedModule;
//# sourceMappingURL=led.module.js.map