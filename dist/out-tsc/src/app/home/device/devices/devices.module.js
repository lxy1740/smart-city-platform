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
var devices_routing_module_1 = require("./devices-routing.module");
var core_2 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var shared_module_1 = require("../../../shared/shared.module");
var forms_1 = require("@angular/forms");
var devices_component_1 = require("./devices.component");
var install_log_component_1 = require("./install-log/install-log.component");
var line_log_component_1 = require("./line-log/line-log.component");
var device_home_component_1 = require("./device-home/device-home.component");
var history_data_component_1 = require("./device-detail/history-data/history-data.component");
var device_detail_component_1 = require("./device-detail/device-detail.component");
var ng2_file_upload_1 = require("ng2-file-upload"); // Should import HERE
var DevicesModule = /** @class */ (function () {
    function DevicesModule() {
    }
    DevicesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                devices_routing_module_1.DevicesRoutingModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule,
                ng2_file_upload_1.FileUploadModule,
                ng_bootstrap_1.NgbModule.forRoot(),
            ],
            declarations: [
                devices_component_1.DevicesComponent,
                install_log_component_1.InstallLogComponent,
                line_log_component_1.LineLogComponent,
                device_home_component_1.DeviceHomeComponent,
                history_data_component_1.HistoryDataComponent,
                device_detail_component_1.DeviceDetailComponent
            ],
            schemas: [
                core_2.CUSTOM_ELEMENTS_SCHEMA,
                core_2.NO_ERRORS_SCHEMA
            ]
        })
    ], DevicesModule);
    return DevicesModule;
}());
exports.DevicesModule = DevicesModule;
//# sourceMappingURL=devices.module.js.map