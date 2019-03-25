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
var issuedata_component_1 = require("./issuedata.component");
var issuedata_routing_module_1 = require("./issuedata-routing.module");
var IssuedataModule = /** @class */ (function () {
    function IssuedataModule() {
    }
    IssuedataModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ng_bootstrap_1.NgbModule,
                forms_1.FormsModule, forms_1.ReactiveFormsModule,
                issuedata_routing_module_1.IssuedataRoutingModule
            ],
            declarations: [issuedata_component_1.IssuedataComponent],
            schemas: [
                core_2.CUSTOM_ELEMENTS_SCHEMA,
                core_2.NO_ERRORS_SCHEMA
            ]
        })
    ], IssuedataModule);
    return IssuedataModule;
}());
exports.IssuedataModule = IssuedataModule;
//# sourceMappingURL=issuedata.module.js.map