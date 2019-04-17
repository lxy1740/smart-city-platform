"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var ngx_cookie_1 = require("ngx-cookie");
var http_1 = require("@angular/common/http"); // HTTP_INTERCEPTORS,
var ng2_file_upload_1 = require("ng2-file-upload");
var angular_jwt_1 = require("@auth0/angular-jwt");
var index_1 = require("./interceptor/index");
var service_module_1 = require("./service/service.module");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var auth_guard_service_1 = require("./guard/auth-guard.service");
var auth_service_1 = require("./guard/auth.service");
var not_found_component_1 = require("./not-found.component");
var pipes_module_1 = require("./pipes/pipes.module");
function tokenGetter() {
    return localStorage.getItem('token');
}
exports.tokenGetter = tokenGetter;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                not_found_component_1.PageNotFoundComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                ngx_cookie_1.CookieModule.forRoot(),
                app_routing_module_1.AppRoutingModule,
                service_module_1.ServiceModule,
                http_1.HttpClientModule,
                ng2_file_upload_1.FileUploadModule,
                angular_jwt_1.JwtModule.forRoot({
                    config: {
                        tokenGetter: tokenGetter
                    }
                }),
                pipes_module_1.PipesModule
            ],
            exports: [],
            providers: [
                auth_guard_service_1.AuthGuard, auth_service_1.AuthService,
                index_1.httpInterceptorProviders,
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: app.module.ts
@time: 2018 / 7 / 2 17: 18

*/
//# sourceMappingURL=app.module.js.map