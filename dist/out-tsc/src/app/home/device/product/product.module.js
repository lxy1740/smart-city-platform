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
var pipes_module_1 = require("../../../pipes/pipes.module");
var forms_1 = require("@angular/forms");
var product_routing_module_1 = require("./product-routing.module");
var product_component_1 = require("./product.component");
var product_home_component_1 = require("./product-home/product-home.component");
var function_definition_component_1 = require("./function-definition/function-definition.component");
var ProductModule = /** @class */ (function () {
    function ProductModule() {
    }
    ProductModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                product_routing_module_1.ProductRoutingModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule,
                pipes_module_1.PipesModule,
                ng_bootstrap_1.NgbModule.forRoot(),
            ],
            declarations: [
                product_component_1.ProductComponent,
                product_home_component_1.ProductHomeComponent,
                function_definition_component_1.FunctionDefinitionComponent,
            ],
            schemas: [
                core_2.CUSTOM_ELEMENTS_SCHEMA,
                core_2.NO_ERRORS_SCHEMA
            ]
        })
    ], ProductModule);
    return ProductModule;
}());
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map