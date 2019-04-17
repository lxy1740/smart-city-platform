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
var application_routing_module_1 = require("./application-routing.module");
var application_component_1 = require("./application.component");
var cover_component_1 = require("./cover/cover.component");
var calamity_component_1 = require("./calamity/calamity.component");
var traffic_component_1 = require("./traffic/traffic.component");
var water_component_1 = require("./water/water.component");
var electrical_component_1 = require("./electrical/electrical.component");
var led_module_1 = require("./led/led.module");
var light_module_1 = require("./light/light.module");
var ApplicationModule = /** @class */ (function () {
    function ApplicationModule() {
    }
    ApplicationModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, ng_bootstrap_1.NgbModule, application_routing_module_1.ApplicationRoutingModule,
                material_1.MatButtonModule, material_1.MatCheckboxModule, material_1.MatSliderModule, material_1.MatSlideToggleModule,
                led_module_1.LedModule, light_module_1.LightModule
            ],
            declarations: [
                application_component_1.ApplicationComponent,
                cover_component_1.CoverComponent, calamity_component_1.CalamityComponent,
                traffic_component_1.TrafficComponent, water_component_1.WaterComponent,
                electrical_component_1.ElectricalComponent,
            ],
            schemas: [
                core_2.CUSTOM_ELEMENTS_SCHEMA,
                core_2.NO_ERRORS_SCHEMA
            ]
        })
    ], ApplicationModule);
    return ApplicationModule;
}());
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=application.module.js.map