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
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/common/http");
var AdminService = /** @class */ (function () {
    function AdminService(http) {
        this.http = http;
    }
    // 获取所有用户 - 分页
    AdminService.prototype.getAllUser = function (queryStr, page, pageSize) {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get("/security/user?queryStr=" + queryStr + "&page=" + page + "&pageSize=" + pageSize)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 新增用户
    AdminService.prototype.addNewUser = function (body) {
        return this.http.post('/security/user', body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 修改用户
    AdminService.prototype.updateUser = function (body) {
        return this.http.put('/security/user', body)
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 删除用户
    AdminService.prototype.deleteUser = function (id) {
        return this.http.delete("/security/user?id=" + id)
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 获取所有角色
    AdminService.prototype.getAllRole = function () {
        return this.http.get("/security/role/all")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    AdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map