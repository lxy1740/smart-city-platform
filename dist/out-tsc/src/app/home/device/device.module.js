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
var ng2_file_upload_1 = require("ng2-file-upload");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var shared_module_1 = require("../../shared/shared.module");
var forms_1 = require("@angular/forms");
var device_routing_module_1 = require("./device-routing.module");
var device_component_1 = require("./device.component");
var position_component_1 = require("./position/position.component");
var road_component_1 = require("./road/road.component");
var install_component_1 = require("./install/install.component");
var DeviceModule = /** @class */ (function () {
    function DeviceModule() {
    }
    DeviceModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule,
                device_routing_module_1.DevicerRoutingModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                ng2_file_upload_1.FileUploadModule
            ],
            declarations: [
                device_component_1.DeviceComponent,
                position_component_1.PositionComponent,
                road_component_1.RoadComponent,
                install_component_1.InstallComponent,
            ],
            schemas: [
                core_2.CUSTOM_ELEMENTS_SCHEMA,
                core_2.NO_ERRORS_SCHEMA
            ]
        })
    ], DeviceModule);
    return DeviceModule;
}());
exports.DeviceModule = DeviceModule;
//# sourceMappingURL=device.module.js.map