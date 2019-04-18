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
var FullScreenService = /** @class */ (function () {
    function FullScreenService() {
    }
    // 进入全屏
    FullScreenService.prototype.enterFullScreen = function () {
        var de;
        de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
            console.log('1');
        }
        else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
            console.log('2');
        }
        else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
            console.log('3');
        }
    };
    // 退出全屏
    FullScreenService.prototype.exitFullScreen = function () {
        var de;
        de = document.documentElement;
        if (de.exitFullscreen) {
            de.exitFullscreen();
            console.log('12');
        }
        else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
            console.log('13');
        }
        else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
            console.log('14');
        }
        console.log('15');
    };
    // 全屏
    FullScreenService.prototype.fullScreen = function () {
        var el;
        el = document.documentElement;
        var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if (typeof rfs !== 'undefined' && rfs) {
            rfs.call(el);
        }
        return;
    };
    FullScreenService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], FullScreenService);
    return FullScreenService;
}());
exports.FullScreenService = FullScreenService;
//# sourceMappingURL=full-screen.service.js.map