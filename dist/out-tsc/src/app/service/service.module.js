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
var full_screen_service_1 = require("./full-screen.service");
var dialog_service_1 = require("./dialog.service");
var monitor_service_1 = require("./monitor.service");
var mess_service_1 = require("./mess.service");
var url_service_1 = require("./url.service");
var communicate_service_1 = require("./communicate.service");
var video_service_1 = require("./video.service");
var light_service_1 = require("./light.service");
var cover_service_1 = require("./cover.service");
var camera_service_1 = require("./camera.service");
var airmonitor_service_1 = require("./airmonitor.service");
var strategy_service_1 = require("./strategy.service");
var device_service_1 = require("./device.service");
var position_service_1 = require("./position.service");
var product_service_1 = require("./product.service");
var led_service_1 = require("./led.service");
var admin_service_1 = require("./admin.service");
var right_service_1 = require("./right.service");
var issuedata_service_1 = require("./issuedata.service");
var device_history_service_1 = require("./device-history.service");
var road_service_1 = require("./road.service");
var customer_service_1 = require("./customer.service");
var function_definition_1 = require("./function-definition");
var ServiceModule = /** @class */ (function () {
    function ServiceModule() {
    }
    ServiceModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [],
            providers: [full_screen_service_1.FullScreenService, monitor_service_1.MonitorService,
                light_service_1.LightService, cover_service_1.CoverService, airmonitor_service_1.AirmonitorService, camera_service_1.CameraService, strategy_service_1.StrategyService,
                device_service_1.DeviceService, position_service_1.PositionService, product_service_1.ProductService, led_service_1.LedService, dialog_service_1.DialogService, admin_service_1.AdminService, right_service_1.RightService,
                mess_service_1.MessService, url_service_1.UrlService, communicate_service_1.CommunicateService, video_service_1.VideoService, issuedata_service_1.IssuedataService,
                device_history_service_1.DeviceHistoryService,
                road_service_1.RoadService,
                customer_service_1.CustomerService,
                function_definition_1.FunctionDefinitionService
            ]
        })
    ], ServiceModule);
    return ServiceModule;
}());
exports.ServiceModule = ServiceModule;
//# sourceMappingURL=service.module.js.map