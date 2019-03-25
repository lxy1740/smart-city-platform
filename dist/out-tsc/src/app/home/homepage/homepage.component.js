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
var router_1 = require("@angular/router");
var angular_jwt_1 = require("@auth0/angular-jwt");
var HomepageComponent = /** @class */ (function () {
    function HomepageComponent(router, elementRef, jwtHelper) {
        this.router = router;
        this.elementRef = elementRef;
        this.jwtHelper = jwtHelper;
        this.flag = true;
        var token = localStorage.getItem('token');
        this.customerId = this.jwtHelper.decodeToken(token) && this.jwtHelper.decodeToken(token).customerid;
    }
    HomepageComponent.prototype.ngOnInit = function () {
    };
    HomepageComponent.prototype.goToZheRoute = function (para) {
        this.router.navigate([para]);
    };
    HomepageComponent.prototype.goToChange = function () {
        // this.setChange();
        if (this.flag === true) {
            this.flag = false;
        }
        else {
            this.flag = true;
        }
    };
    // 判断数组中是否存在值
    HomepageComponent.prototype.getture = function (str) {
        var res = false;
        var Authorities = JSON.parse(localStorage.getItem('Authorities'));
        var Auth = Authorities ? Authorities.Authorities : [];
        res = false;
        if (str === 'HP-000') {
            res = true;
            return res;
        }
        if (this.customerId && str === 'DM-007') {
            res = false;
            return res;
        }
        Auth.map(function (item) {
            if (item === str) {
                res = true;
                return res;
            }
        });
        return res;
    };
    HomepageComponent = __decorate([
        core_1.Component({
            selector: 'app-homepage',
            templateUrl: './homepage.component.html',
            styleUrls: ['./homepage.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router, core_1.ElementRef,
            angular_jwt_1.JwtHelperService])
    ], HomepageComponent);
    return HomepageComponent;
}());
exports.HomepageComponent = HomepageComponent;
//# sourceMappingURL=homepage.component.js.map