"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var CameraService = /** @class */ (function () {
    function CameraService(http) {
        this.http = http;
    }
    // 获取指定坐标范围内的摄像头信息
    CameraService.prototype.getCameras = function (ne, sw) {
        return this.http.post('/api/camera/inbounds', {
            'ne': ne,
            'sw': sw
        })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CameraService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CameraService);
    return CameraService;
}());
exports.CameraService = CameraService;
//# sourceMappingURL=camera.service.js.map