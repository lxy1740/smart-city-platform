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
var SqModalComponent = /** @class */ (function () {
    function SqModalComponent() {
        this.output = new core_1.EventEmitter();
    }
    SqModalComponent.prototype.click = function (mes) {
        this.output.emit(mes);
    };
    SqModalComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input() // 父组件传递值
        ,
        __metadata("design:type", Object)
    ], SqModalComponent.prototype, "input", void 0);
    __decorate([
        core_1.Output() // 事件传播 子-> 父
        ,
        __metadata("design:type", core_1.EventEmitter)
    ], SqModalComponent.prototype, "output", void 0);
    SqModalComponent = __decorate([
        core_1.Component({
            selector: 'app-sq-modal',
            templateUrl: './sq-modal.component.html',
            styleUrls: ['./sq-modal.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], SqModalComponent);
    return SqModalComponent;
}());
exports.SqModalComponent = SqModalComponent;
//# sourceMappingURL=sq-modal.component.js.map